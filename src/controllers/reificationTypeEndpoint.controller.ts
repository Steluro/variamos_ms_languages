import { NextFunction, Request, Response } from "express";
import * as reificationTypeEndpointService from "../services/reificationTypeEndpoint.service";

export async function getLanguageReificationTypeEndpoints(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationTypeEndpoints =
      await reificationTypeEndpointService.getReificationTypeEndpoints(
        req.params.languageId as string,
        req.user,
      );
    return res.json(reificationTypeEndpoints);
  } catch (error) {
    next(error);
  }
}

export async function getReificationTypeEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await reificationTypeEndpointService.getEndpoint(
      req.params.uuid as string,
      req.user,
    );

    if (!relationType) {
      return res.status(404).json({ message: "Endpoint not found" });
    }

    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}

export async function createReificationTypeEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationTypeEndpoint =
      await reificationTypeEndpointService.createEndpoint(req.body, req.user);
    return res.json(reificationTypeEndpoint);
  } catch (error) {
    next(error);
  }
}

export async function updateReificationTypeEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationTypeEndpoint =
      await reificationTypeEndpointService.updateEndpoint(
        req.params.uuid as string,
        req.body,
        req.user,
      );
    return res.json(reificationTypeEndpoint);
  } catch (error) {
    next(error);
  }
}

export async function deleteReificationTypeEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationTypeEndpoint =
      await reificationTypeEndpointService.deleteEndpoint(
        req.params.uuid as string,
        req.user,
      );
    return res.json(reificationTypeEndpoint);
  } catch (error) {
    next(error);
  }
}
