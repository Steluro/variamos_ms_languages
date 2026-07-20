import { NextFunction, Request, Response } from "express";
import * as relationTypeService from "../services/relationType.service";

export async function getLanguageRelationTypes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationTypes = await relationTypeService.getLanguageRelationTypes(
      req.params.languageId as string,
      req.user,
    );
    return res.json(relationTypes);
  } catch (error) {
    next(error);
  }
}

export async function getRelationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await relationTypeService.getRelationType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.user,
    );

    if (!relationType) {
      return res.status(404).json({ message: "Relation type not found" });
    }

    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}

export async function createRelationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await relationTypeService.createRelationType(
      req.body,
      req.user,
    );
    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}

export async function updateRelationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await relationTypeService.updateRelationType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.body,
      req.user,
    );
    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}

export async function deleteRelationType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const relationType = await relationTypeService.deleteRelationType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.user,
    );
    return res.json(relationType);
  } catch (error) {
    next(error);
  }
}
