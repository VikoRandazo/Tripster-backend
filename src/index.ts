import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/appRoutes";
import path from "path";

const server = express();

const _dirname = path.dirname("");
const buildPath = path.join(__dirname, process.env.DIST_FOLDER as string);
server.use(express.static(buildPath));

server.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, process.env.DIST_FOLDER as string, buildPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/api", routes);
server.listen(5000);
