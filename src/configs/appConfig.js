import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import passport from '../middlewares/passport.js';

const configApp = (app) => {
  dotenv.config();

  app.use(express.static(path.join("./src", "assets")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "SECRET",
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 15 * 60 * 1000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );
  app.use(morgan("dev"));

  //limit json req
  app.use(bodyParser.json({ limit: "5mb", extended: true }));
  app.use(
    bodyParser.urlencoded({
      limit: "5mb",
      extended: true,
      parameterLimit: 1000000,
    })
  );
};

export default configApp;
