import { isAuthenticated } from "@variamosple/variamos-security";
import { Router } from "express";
import * as languageController from "../controllers/language.controller";

const languageRouter = Router();

languageRouter.get("/", isAuthenticated, languageController.getLanguages);
languageRouter.post("/", isAuthenticated, languageController.createLanguage);
languageRouter.get("/:uuid", isAuthenticated, languageController.getLanguage);
languageRouter.put("/:uuid", isAuthenticated, languageController.updateLanguage);
languageRouter.delete("/:uuid", isAuthenticated, languageController.deleteLanguage);

export default languageRouter;