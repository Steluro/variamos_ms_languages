import { NextFunction, Request, Response } from "express";
import * as elementTypeService from "../services/elementType.service";

export async function getLanguageElementTypes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const elementTypes = await elementTypeService.getLanguageElementTypes(
      req.params.languageId as string,
      req.user,
    );
    return res.json(elementTypes);
  } catch (error) {
    next(error);
  }
}

export async function getElementType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const elementType = await elementTypeService.getElementType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.user,
    );

    if (!elementType) {
      return res.status(404).json({ message: "Element type not found" });
    }

    return res.json(elementType);
  } catch (error) {
    next(error);
  }
}

export async function createElementType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const elementType = await elementTypeService.createElementType(
      req.body,
      req.user,
    );
    return res.json(elementType);
  } catch (error) {
    next(error);
  }
}

export async function updateElementType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const elementType = await elementTypeService.updateElementType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.body,
      req.user,
    );
    return res.json(elementType);
  } catch (error) {
    next(error);
  }
}

export async function deleteElementType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const elementType = await elementTypeService.deleteElementType(
      req.params.languageId as string,
      req.params.uuid as string,
      req.user,
    );
    return res.json(elementType);
  } catch (error) {
    next(error);
  }
}
