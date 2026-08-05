import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as reificationTypeEndpointController from "../controllers/reificationTypeEndpoint.controller";

const reificationTypeEndpointRouter = Router();

reificationTypeEndpointRouter.get(
  "/:languageId/reification-types/:reificationTypeId/endpoints",
  isAuthenticated,
  reificationTypeEndpointController.getLanguageReificationTypeEndpoints,
);
reificationTypeEndpointRouter.get(
  "/:languageId/reification-types/:reificationTypeId/endpoints/:uuid",
  isAuthenticated,
  reificationTypeEndpointController.getReificationTypeEndpoint,
);
reificationTypeEndpointRouter.post(
  "/:languageId/reification-types/:reificationTypeId/endpoints",
  isAuthenticated,
  reificationTypeEndpointController.createReificationTypeEndpoint,
);
reificationTypeEndpointRouter.put(
  "/:languageId/reification-types/:reificationTypeId/endpoints/:uuid",
  isAuthenticated,
  reificationTypeEndpointController.updateReificationTypeEndpoint,
);
reificationTypeEndpointRouter.delete(
  "/:languageId/reification-types/:reificationTypeId/endpoints/:uuid",
  isAuthenticated,
  reificationTypeEndpointController.deleteReificationTypeEndpoint,
);

export default reificationTypeEndpointRouter;
