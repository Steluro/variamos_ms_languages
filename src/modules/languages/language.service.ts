import { LanguageFilters } from "./language.filters";
import * as languageRepository from "./language.repository";


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