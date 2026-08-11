import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as reificationTypeController from "../controllers/reificationType.controller";

const reificationTypeRouter = Router();

reificationTypeRouter.get(
  "/:languageId/reification-types",
  isAuthenticated,
  reificationTypeController.getLanguageReificationTypes,
);
reificationTypeRouter.get(
  "/:languageId/reification-types/:uuid",
  isAuthenticated,
  reificationTypeController.getReificationType,
);
reificationTypeRouter.post(
  "/:languageId/reification-types",
  isAuthenticated,
  reificationTypeController.createReificationType,
);
reificationTypeRouter.put(
  "/:languageId/reification-types/:uuid",
  isAuthenticated,
  reificationTypeController.updateReificationType,
);
reificationTypeRouter.delete(
  "/:languageId/reification-types/:uuid",
  isAuthenticated,
  reificationTypeController.deleteReificationType,
);

export default reificationTypeRouter;
