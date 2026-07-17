import { SessionUser } from "@variamosple/variamos-security";
import * as languageRepository from "../repositories/language.repository";
import { LanguageQuery } from "../utils/language.query";

export async function getLanguages(query: LanguageQuery, user: SessionUser) {
    return languageRepository.findAll(query);
}

export async function getLanguage(uuid: string, user: SessionUser) {
    return languageRepository.findById(uuid);
}

export async function createLanguage(data: any, user: SessionUser) {
    return languageRepository.create(data);
}

export async function updateLanguage(uuid: string, data: any, user: SessionUser) {
    return languageRepository.update(uuid, data);
}

export async function deleteLanguage(uuid: string, user: SessionUser) {
    return languageRepository.remove(uuid);
}