import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as relationTypeController from "../controllers/relationType.controller";

const relationTypeRouter = Router();

relationTypeRouter.get(
  "/:languageId/relation-types",
  isAuthenticated,
  relationTypeController.getLanguageRelationTypes,
);
relationTypeRouter.get(
  "/:languageId/relation-types/:uuid",
  isAuthenticated,
  relationTypeController.getRelationType,
);
relationTypeRouter.post(
  "/:languageId/relation-types",
  isAuthenticated,
  relationTypeController.createRelationType,
);
relationTypeRouter.put(
  "/:languageId/relation-types/:uuid",
  isAuthenticated,
  relationTypeController.updateRelationType,
);
relationTypeRouter.delete(
  "/:languageId/relation-types/:uuid",
  isAuthenticated,
  relationTypeController.deleteRelationType,
);

export default relationTypeRouter;
