import { NextFunction, Request, Response } from "express";
import { CollaboratorRole } from "../models/collaborator.model";
import * as contributorService from "../services/contributor.service";

export async function getLanguageCollaboratorss(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const collaborators = await contributorService.getLanguageCollaboratorss(
      req.params.uuid as string,
      req.user,
    );

    if (!collaborators) {
      return res
        .status(404)
        .json({ message: "Language collaborators not found" });
    }

    return res.json(collaborators);
  } catch (error) {
    next(error);
  }
}

export async function addLanguageCollaborators(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const collaborator = await contributorService.addLanguageCollaborators(
      req.params.uuid as string,
      req.body,
      req.user,
    );
    return res.json(collaborator);
  } catch (error) {
    next(error);
  }
}

export async function updateLanguageCollaboratorRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const collaborator =
      await contributorService.updateLanguageCollaboratorRole(
        req.params.uuid as string,
        req.params.userId as string,
        req.body.role as CollaboratorRole,
        req.user,
      );
    return res.json(collaborator);
  } catch (error) {
    next(error);
  }
}

export async function removeLanguageCollaborator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const collaborator = await contributorService.removeLanguageCollaborator(
      req.params.uuid as string,
      req.params.userId as string,
      req.user,
    );
    return res.json(collaborator);
  } catch (error) {
    next(error);
  }
}
