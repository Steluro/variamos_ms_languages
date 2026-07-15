import { LanguageFilters } from "./language.filters";
import * as languageRepository from "./language.repository";

/**
 * Gets all languages
 * @param filters The filters to apply
 * @returns The languages
 */
export async function getLanguages(filters: LanguageFilters) {
    return languageRepository.findAll(filters);
}

/**
 * Gets a language by UUID
 * @param uuid The UUID of the language to get
 * @returns The language
 */
export async function getLanguageById(uuid: string) {
    const language = await languageRepository.findById(uuid);
    if (!language) {
        throw new Error("Language not found");
    }
    return language;
}

/**
 * Creates a new language
 * @param data The language data
 * @returns The created language
 */
export async function createLanguage(data: any) {
    return languageRepository.create(data);
}

/**
 * Updates an existing language
 * @param uuid The UUID of the language to update
 * @param data The language data to update
 * @returns The updated language
 */
export async function updateLanguage(uuid: string, data: any) {
    const language = await languageRepository.update(uuid, data);
    if (!language) {
        throw new Error("Language not found");
    }
    return language;
}

/**
 * Deletes a language
 * @param uuid The UUID of the language to delete
 * @returns The deleted language
 */
export async function deleteLanguage(uuid: string) {
    const language = await languageRepository.remove(uuid);
    if (!language) {
        throw new Error("Language not found");
    }
    return language;
}