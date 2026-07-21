import { Router } from "express";
import { isAuthenticated } from "../auth";
import * as endpointTypeController from "../controllers/endpointType.controller";

const endpointTypeRouter = Router();

endpointTypeRouter.get(
  "/:languageId/relation-types/:relationTypeId/endpoint-types",
  isAuthenticated,
  endpointTypeController.getRelationTypeEndpointTypes,
);
endpointTypeRouter.get(
  "/:languageId/relation-types/:relationTypeId/endpoint-types/:uuid",
  isAuthenticated,
  endpointTypeController.getEndpointType,
);
endpointTypeRouter.post(
  "/:languageId/relation-types/:relationTypeId/endpoint-types",
  isAuthenticated,
  endpointTypeController.createEndpointType,
);
endpointTypeRouter.put(
  "/:languageId/relation-types/:relationTypeId/endpoint-types/:uuid",
  isAuthenticated,
  endpointTypeController.updateEndpointType,
);
endpointTypeRouter.delete(
  "/:languageId/relation-types/:relationTypeId/endpoint-types/:uuid",
  isAuthenticated,
  endpointTypeController.deleteEndpointType,
);

export default endpointTypeRouter;
