import { NextFunction, Request, Response } from "express";
import * as reificationTypeService from "../services/reificationType.service";

export async function getLanguageReificationTypes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationTypes =
      await reificationTypeService.getLanguageReificationTypes(
        req.params.languageId as string,
        req.user,
      );
    return res.json(reificationTypes);
  } catch (error) {
    next(error);
  }
}

export async function getReificationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await reificationTypeService.getReificationType(
      req.params.uuid as string,
      req.user,
    );

    if (!relationType) {
      return res.status(404).json({ message: "Reification type not found" });
    }

    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}

export async function createReificationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationType = await reificationTypeService.createReificationType(
      req.body,
      req.user,
    );
    return res.json(reificationType);
  } catch (error) {
    next(error);
  }
}

export async function updateReificationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationType = await reificationTypeService.updateReificationType(
      req.params.uuid as string,
      req.body,
      req.user,
    );
    return res.json(reificationType);
  } catch (error) {
    next(error);
  }
}

export async function deleteReificationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reificationType = await reificationTypeService.deleteReificationType(
      req.params.uuid as string,
      req.user,
    );
    return res.json(reificationType);
  } catch (error) {
    next(error);
  }
}
