import { NextFunction, Request, Response } from "express";
import { LanguageQuery } from "../services/language.query";
import * as languageService from "../services/language.service";

export async function getLanguages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query: LanguageQuery = req.query;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const languages = await languageService.getLanguages(query, req.user);
    return res.json(languages);
  } catch (error) {
    next(error);
  }
}

export async function getLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const language = await languageService.getLanguage(
      req.params.uuid as string,
      req.user,
    );

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    return res.json(language);
  } catch (error) {
    next(error);
  }
}

export async function createLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const language = await languageService.createLanguage(req.body, req.user);

    return res.json(language);
  } catch (error) {
    next(error);
  }
}

export async function updateLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const language = await languageService.updateLanguage(
      req.params.uuid as string,
      req.body,
      req.user,
    );

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    return res.json(language);
  } catch (error) {
    next(error);
  }
}

export async function deleteLanguage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const language = await languageService.deleteLanguage(
      req.params.uuid as string,
      req.user,
    );

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    return res.json(language);
  } catch (error) {
    next(error);
  }
}
