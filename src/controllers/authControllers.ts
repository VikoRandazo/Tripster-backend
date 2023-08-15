import { Request, Response, NextFunction } from "express";
import { execute } from "../../database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { LoginSchema, RegisterSchema } from "../validation/AuthValidation";

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params;
  const getUserByEmailQuery = `SELECT * FROM users WHERE email = ?`;
  try {
    const selectUserExecute = await execute(getUserByEmailQuery, [email]);
    if (selectUserExecute.length > 0) {
      res.status(200).json(selectUserExecute[0]);
    }
    next();
  } catch (error) {
    res.status(500).json({ Error: `user not found` });
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await RegisterSchema.validate(req.body).then(async () => {
      const { firstName, lastName, email, password } = req.body;
      const token = jwt.sign({ email, firstName, lastName }, config.ACCESS_TOKEN_SECRET as string, {
        expiresIn: `7d`,
      });
      const hashedPassword = await bcrypt.hash(password, 10);
      // salt is taken care of bcrypt library and already included in hash function so its not necessary to use it
      const checkForDuplication = `SELECT email FROM users WHERE email = ?`;
      const emailIsExist = await execute(checkForDuplication, [email]);

      if (emailIsExist.length > 0) {
        res.status(409).json({ message: `This email is already in use` });
      } else {
        const insertUserQuery = `INSERT INTO users (firstName, lastName, email, password) VALUES(? , ? , ? , ?)`;
        const selectUserQuery = `SELECT * FROM users Where email = ?`;

        const insertUser = await execute(insertUserQuery, [
          firstName,
          lastName,
          email,
          hashedPassword,
        ]);
        const selectUser: any = await execute(selectUserQuery, [email]);
        res.status(201).json({ selectUser: selectUser[0], token });
      }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    await LoginSchema.validate(req.body).then(async () => {
      const getUserByEmailSQL = `SELECT * FROM users WHERE email = ?`;
      const userResult: any = await execute(getUserByEmailSQL, [email]);

      if (userResult.length === 0) {
        return res.status(401).json({ error: "Invalid E-mail or password" });
      }

      const user = userResult[0];
      const { user_id, firstName, lastName, isAdmin, password: hashedPassword } = user;

      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result) {
          const token = jwt.sign(
            { user_id, email, firstName, lastName, isAdmin },
            config.ACCESS_TOKEN_SECRET as string,
            { expiresIn: `7d` }
          );
          const userWithoutPassword = { user_id, email, firstName, lastName, isAdmin };
          res.status(200).json({ token, user: userWithoutPassword });
          next();
        } else {
          res.status(401).json({ error: "Invalid E-mail or password" });
        }
      });
    });
  } catch (error: any) {
    console.log(error);
    return res.status(401).json(error);
  }
};

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader; 
  try {
    const verified = jwt.verify(token, config.ACCESS_TOKEN_SECRET as string);
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};
