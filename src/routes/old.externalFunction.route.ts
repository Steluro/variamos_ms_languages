import { Router } from "express";
import ExternalFunctionManagement from "../services/old.externalFunction.service";

const externalFunctionRouter = Router();
let _ExternalFunctionManagement = new ExternalFunctionManagement();

externalFunctionRouter.get(
  "/languages/:languageId/externalfunctions",
  _ExternalFunctionManagement.getExternalFuntions,
);

externalFunctionRouter.post(
  "/languages/:languageId/externalfunctions",
  _ExternalFunctionManagement.createExternalFunction,
);

externalFunctionRouter.put(
  "/externalfunctions/:exid",
  _ExternalFunctionManagement.updateExternalFunction,
);

externalFunctionRouter.delete(
  "/externalfunctions/:exid",
  _ExternalFunctionManagement.deleteExternalFunction,
);

export default externalFunctionRouter;
