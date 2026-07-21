import { NextFunction, Request, Response } from "express";
import * as endpointTypeService from "../services/endpointType.service";

export async function getRelationTypeEndpointTypes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const endpointTypes =
      await endpointTypeService.getRelationTypeEndpointTypes(
        req.params.relationTypeId as string,
        req.user,
      );
    return res.json(endpointTypes);
  } catch (error) {
    next(error);
  }
}

export async function getEndpointType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const endpointType = await endpointTypeService.getEndpointType(
      req.params.uuid as string,
      req.user,
    );
    return res.json(endpointType);
  } catch (error) {
    next(error);
  }
}

export async function createEndpointType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const endpointType = await endpointTypeService.createEndpointType(
      req.body,
      req.user,
    );
    return res.json(endpointType);
  } catch (error) {
    next(error);
  }
}

export async function updateEndpointType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const endpointType = await endpointTypeService.updateEndpointType(
      req.params.uuid as string,
      req.body,
      req.user,
    );
    return res.json(endpointType);
  } catch (error) {
    next(error);
  }
}

export async function deleteEndpointType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await endpointTypeService.deleteEndpointType(
      req.params.uuid as string,
      req.user,
    );
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
