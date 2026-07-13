import { Router } from "express";
import * as languageController from "./language.controller";

const languageRouter = Router();

languageRouter.get("/", languageController.getLanguages);

export default languageRouter;