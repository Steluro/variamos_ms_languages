import { NextFunction, Request, Response } from "express";
import { buildLanguageFilters } from "./language.filters";
import * as languageService from "./language.service";

export async function getLanguages(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const filters = buildLanguageFilters(req.query);

        const languages = await languageService.getLanguages(filters);

        return res.json(languages);
    } catch (error) {
        next(error);
    }
}