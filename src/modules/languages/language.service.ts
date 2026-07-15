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
export async function getLanguage(uuid: string) {
    return languageRepository.findById(uuid);
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
    return languageRepository.update(uuid, data);
}

/**
 * Deletes a language
 * @param uuid The UUID of the language to delete
 * @returns The deleted language
 */
export async function deleteLanguage(uuid: string) {
    return languageRepository.remove(uuid);
}