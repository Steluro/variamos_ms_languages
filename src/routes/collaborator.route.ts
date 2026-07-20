import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as contributorController from "../controllers/collaborator.controller";

const collaboratorRouter = Router();

collaboratorRouter.get(
  "/:uuid/collaborators",
  isAuthenticated,
  contributorController.getLanguageCollaboratorss,
);
collaboratorRouter.post(
  "/:uuid/collaborators",
  isAuthenticated,
  contributorController.addLanguageCollaborators,
);
collaboratorRouter.put(
  "/:uuid/collaborators/:userId",
  isAuthenticated,
  contributorController.updateLanguageCollaboratorRole,
);
collaboratorRouter.delete(
  "/:uuid/collaborators/:userId",
  isAuthenticated,
  contributorController.removeLanguageCollaborator,
);

export default collaboratorRouter;
