import { NextFunction, Request, Response } from "express";
import * as languageService from "./language.service";

export async function getLanguages(req: Request, res: Response, next: NextFunction) {
    try {
        const languages = await languageService.getLanguages();
        return res.json(languages);
    } catch (error) {
        next(error);
    }
}