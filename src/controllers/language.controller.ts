import { NextFunction, Request, Response } from "express";
import * as languageService from "../services/language.service";
import { LanguageQuery } from "../utils/language.query";

export async function getLanguages(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const query: LanguageQuery = req.query;

        const languages = await languageService.getLanguages(query);

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
        const language = await languageService.getLanguage(req.params.uuid as string);

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
        const language = await languageService.createLanguage(req.body);

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
        const language = await languageService.updateLanguage(
            req.params.uuid as string,
            req.body,
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
        const language = await languageService.deleteLanguage(
            req.params.uuid as string,
        );

        if (!language) {
            return res.status(404).json({ message: "Language not found" });
        }

        return res.json(language);
    } catch (error) {
        next(error);
    }
}