import { Request, Response, NextFunction } from "express";
import { execute } from "../../database/db";

// export const handleToggleLikeController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { uid } = req.params;
//   const { vacation_id } = req.body;

//   const selectFollowerIdQuery = `SELECT * FROM followers WHERE user_id = ? AND vacation_id = ?`;
//   const deleteFollowerIdQuery = `DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`;
//   const insertFollowerIdQuery = `INSERT INTO followers(user_id, vacation_id) VALUES(?,?)`;

//   try {
//     const executeSelectFollowerId = await execute(selectFollowerIdQuery, [uid, vacation_id]);

//     // if follower exists, delete it
//     if (executeSelectFollowerId.length > 0) {
//       const executeDeleteFollowerId = await execute(deleteFollowerIdQuery, [uid, vacation_id]);
//       res.json({ message: "success", likeRemoved: true });
//     }
//     // if follower doesn't exist, insert it
//     else {
//       const executeInsertFollowerId = await execute(insertFollowerIdQuery, [uid, vacation_id]);
//       res.json({ message: "success", likeAdded: true });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//     next(error);
//   }
// };

export const handleToggleLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.params;
  const { vacation_id } = req.body;

  const selectFollowerIdQuery = `SELECT * FROM followers WHERE user_id = ? AND vacation_id = ?`;
  const deleteFollowerIdQuery = `DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`;
  const insertFollowerIdQuery = `INSERT INTO followers(user_id, vacation_id) VALUES(?,?)`;
  let vacationInfo;
  try {
    const executeSelectFollowerId = await execute(selectFollowerIdQuery, [uid, vacation_id]);

    // if follower exists, delete it
    if (executeSelectFollowerId.length > 0) {
      const executeDeleteFollowerId = await execute(deleteFollowerIdQuery, [uid, vacation_id]);
      res.json({ message: "success", likeRemoved: true, vacation: executeSelectFollowerId[0] });
    }
    // if follower doesn't exist, insert it
    else {
      const executeInsertFollowerId = await execute(insertFollowerIdQuery, [uid, vacation_id]);
      res
        .status(200)
        .json({ message: "success", likeAdded: true, vacation: { vacation_id, user_id: uid } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const getLikesAmount = async (req: Request, res: Response, next: NextFunction) => {
  const { vid } = req.params;

  const selectFollwersQuery = `SELECT * FROM followers WHERE vacation_id = ?`;

  try {
    const executeSelectFollowers = await execute(selectFollwersQuery, [vid]);
    res.status(200).json(executeSelectFollowers);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    next(error);
  }
};

export const getAllLikes = async (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT followers.*, vacations.destination
  FROM followers
  JOIN vacations ON followers.vacation_id = vacations.vacation_id;
  `;
  try {
    const result = await execute(sql, []);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: `No likes found` });
    next(error);
  }
};

export const getUserLikes = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.params.uid;
  console.log(uid);

  const sql = `SELECT * FROM followers WHERE user_id = ?`;

  try {
    const selectLikes = await execute(sql, [uid]);
    if (selectLikes) {
      res.status(200).json(selectLikes);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: `No likes found for user` });
    next(error);
  }
};
