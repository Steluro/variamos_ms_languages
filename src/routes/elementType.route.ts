import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as elementTypeController from "../controllers/elementType.controller";

const elementTypeRouter = Router();

elementTypeRouter.get(
  "/:languageId/element-types",
  isAuthenticated,
  elementTypeController.getLanguageElementTypes,
);
elementTypeRouter.get(
  "/:languageId/element-types/:uuid",
  isAuthenticated,
  elementTypeController.getElementType,
);
elementTypeRouter.post(
  "/:languageId/element-types",
  isAuthenticated,
  elementTypeController.createElementType,
);
elementTypeRouter.put(
  "/:languageId/element-types/:uuid",
  isAuthenticated,
  elementTypeController.updateElementType,
);
elementTypeRouter.delete(
  "/:languageId/element-types/:uuid",
  isAuthenticated,
  elementTypeController.deleteElementType,
);

export default elementTypeRouter;
