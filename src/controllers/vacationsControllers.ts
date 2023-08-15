import { Request, Response, NextFunction } from "express";
import { execute } from "../../database/db";
import { Follow } from "../models/Follow";
import { VacationType } from "../models/VacationType";
import { parse as json2csv } from "json2csv";
import path from "path";
import fs from "fs/promises";
import { oldVacationSchema, vacationSchema } from "../../src/validation/VacationValidation";

export const getAllVacations = async (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT * FROM vacations`;
  try {
    const result: VacationType[] = await execute(sql, []);
    res.json(result);
    return result;
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

export const createNewVacation = async (req: Request, res: Response, next: NextFunction) => {
  const { description, destination, start_date, end_date, image_path, price } = req.body;
  const sql = `INSERT INTO vacations (description, destination, start_date, end_date, image_path, price) VALUES ( ?, ?, ?, ?, ?, ?)`;

  try {
    await vacationSchema.validate(req.body).then(async () => {
      const insertVacation = await execute(sql, [
        description,
        destination,
        start_date,
        end_date,
        image_path,
        price,
      ]);
      res.status(201).json(insertVacation);
    });
  } catch (error) {
    res.status(400).json({ messsage: "Unable to create new vacation" });
    next(error);
  }
};

export const getVacationById = async (req: Request, res: Response, next: NextFunction) => {
  const vid = req.params.vid;
  const sql = `SELECT * FROM vacations WHERE vacation_id = ?`;

  try {
    const result: any = await execute(sql, [vid]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

export const getfollowedByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.params.uid;
  const sql = `SELECT * FROM followers WHERE user_id = ?`;
  try {
    const result = await execute(sql, [uid]);
    const followed = result;
    res.json(followed);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Failed to get likes for user id: ${uid}` });
    next(error);
  }
};

export const addFollow = async (req: Request, res: Response, next: NextFunction) => {
  const { vacation_id, user_id } = req.body;

  const sql = `INSERT INTO followers 
  ( vacation_id, user_id)
  VALUES
  (?,?)`;

  try {
    const result = await execute(sql, [vacation_id, user_id]);
    const newFollow: Follow = result;

    res.json(newFollow);

    return newFollow;
  } catch (error) {
    console.log(error);
  }
};
export const removeVacationById = async (req: Request, res: Response, next: NextFunction) => {
  const vid = req.params.vid;

  const deleteVacationQuery = `DELETE FROM vacations WHERE vacation_id = ?`;
  const deleteVacationAssetsQuery = `DELETE FROM followers WHERE vacation_id = ?`;

  try {
    const deleteAssets = await execute(deleteVacationAssetsQuery, [vid]);
    const deleteResult = await execute(deleteVacationQuery, [vid]);
    const removedVacation = deleteResult;
    res.json({ message: `success`, Follow_removed: removedVacation, results: deleteResult });
  } catch (error) {
    res.status(409).json({ message: `Failed to delete vacation` });
    next(error);
  }
};

export const getImageByVacationId = async (req: Request, res: Response, next: NextFunction) => {
  const vacation_id = req.params.vid;
  const getImageVacationByIdSQL = `SELECT image_path from vacations WHERE vacation_id = ?`;
  try {
    const imageVacationsResult = await execute(getImageVacationByIdSQL, [vacation_id]);
  } catch (error) {
    res.status(400).json({ message: "Failed to get user images" });
    next(error);
  }
};

export const editVacation = async (req: Request, res: Response, next: NextFunction) => {
  const vacation_id = req.params.vid;
  const { destination, start_date, end_date, image_path, description, price } = <VacationType>(
    req.body
  );
  const selectVacationIdQuery = `SELECT * from vacations WHERE vacation_id = ?`;
  const updateQuery = `UPDATE vacations SET`;
  const modifiedObject = {
    ...req.body,
    start_date: start_date.split(`T`)[0],
    end_date: end_date.split(`T`)[0],
  };
  const updatedFields: string[] = [];

  try {
    await oldVacationSchema.validate(req.body).then(async () => {
      const executeSelect = await execute(selectVacationIdQuery, [vacation_id]);

      for (const key in modifiedObject) {
        if (modifiedObject.hasOwnProperty(key) && modifiedObject[key] !== executeSelect[0][key]) {
          updatedFields.push(key);
          const updateQueryWithField = `${updateQuery} ${key} = ? WHERE vacation_id = ?`;
          const values = [modifiedObject[key], vacation_id];
          const executeInsertChange = await execute(updateQueryWithField, values);
        }
      }
      res.status(200).json({ updatedFields });
    });
  } catch (error) {
    res.status(422).json({ message: `Failed to edit vacation` });
    next(error);
  }
};

export const exportCSV = async (req: Request, res: Response, next: NextFunction) => {
  const getVacationsQuery = `SELECT destination, vacation_id FROM vacations`;
  const getFollowedVacations = `SELECT vacation_id FROM followers`;

  try {
    const vacations: VacationType[] = await execute(getVacationsQuery, []);
    const followers = await execute(getFollowedVacations, []);

    if (vacations && followers) {
      const followCount: { [vacation_id: number]: number } = {};

      followers.forEach((follow: { vacation_id: number }) => {
        followCount[follow.vacation_id] = (followCount[follow.vacation_id] || 0) + 1;
      });

      interface csvDataType {
        destination: string;
        followers: number;
      }

      const csvData: csvDataType[] = [];
      const resultArray = vacations.map((vacation: VacationType) => {
        return Object.entries(followCount).map(([key, value]) => {
          if (Number(key) === Number(vacation.vacation_id)) {
            csvData.push({
              destination: vacation.destination,
              followers: value,
            });
          }
        });
      });

      // Convert the result to CSV format
      const fields = ["destination", "followers"];
      const exportCSV = json2csv(csvData, { fields });

      const dateTime = Date.now();
      const dirPath = path.join(__dirname, "..", "..", "exports");
      const filePath = path.join(dirPath, `products-${dateTime}.csv`);

      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(filePath, exportCSV);

      // Send the CSV file as a response to the client
      const date = Date.now();
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=Vacations-${date}.csv`);
      res.sendFile(filePath);
    }
  } catch (error) {
    res.status(500).json({ message: `An unexpected error occurred on the server` });
    next(error);
  }
};
