import { isAuthenticated } from "@variamosple/variamos-security";
import { Router } from "express";
import * as languageController from "../controllers/language.controller";

const languageRouter = Router();

languageRouter.get("/", isAuthenticated, languageController.getLanguages);
languageRouter.post("/", isAuthenticated, languageController.createLanguage);
languageRouter.get("/:uuid", isAuthenticated, languageController.getLanguage);
languageRouter.put(
  "/:uuid",
  isAuthenticated,
  languageController.updateLanguage,
);
languageRouter.delete(
  "/:uuid",
  isAuthenticated,
  languageController.deleteLanguage,
);
languageRouter.get(
  "/:uuid/collaborators",
  isAuthenticated,
  languageController.getLanguageCollaboratorss,
);
languageRouter.post(
  "/:uuid/collaborators",
  isAuthenticated,
  languageController.addLanguageCollaborators,
);
languageRouter.put(
  "/:uuid/collaborators/:userId",
  isAuthenticated,
  languageController.updateLanguageCollaboratorRole,
);
languageRouter.delete(
  "/:uuid/collaborators/:userId",
  isAuthenticated,
  languageController.removeLanguageCollaborator,
);

export default languageRouter;
