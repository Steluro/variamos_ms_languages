import * as languageRepository from "./language.repository";
import { LanguageFilters } from "./languages.filters";


export async function getLanguages(filters: LanguageFilters) {
    return languageRepository.findAll(filters);
}


export async function getLanguageById(uuid: string) {
    const language = await languageRepository.findById(uuid);

    if (!language) {
        throw new Error("Language not found");
    }

    return language;
}