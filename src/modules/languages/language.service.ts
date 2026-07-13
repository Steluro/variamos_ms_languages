// language.service.ts

import * as languageRepository from "./language.repository";

type LanguageType = "scope" | "domain" | "application";


export async function getLanguages() {
    return languageRepository.findAll();
}


export async function getLanguageById(uuid: string) {
    const language = await languageRepository.findById(uuid);

    if (!language) {
        throw new Error("Language not found");
    }

    return language;
}


export async function getLanguagesByType(type: LanguageType) {
    return languageRepository.findByType(type);
}