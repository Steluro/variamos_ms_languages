import { Router } from "express";
import * as languageController from "./language.controller";

const languageRouter = Router();

languageRouter.get("/", languageController.getLanguages);
languageRouter.post("/", languageController.createLanguage);
languageRouter.get("/:uuid", languageController.getLanguage);
languageRouter.put("/:uuid", languageController.updateLanguage);
languageRouter.delete("/:uuid", languageController.deleteLanguage);

export default languageRouter;