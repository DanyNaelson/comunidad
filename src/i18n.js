import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTranslations from './../public/locales/es/translation.json';
import enTranslations from './../public/locales/en/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                translation: esTranslations
            },
            en: {
                translation: enTranslations
            }
        },
        lng: "es",
        fallbackLng: ["es", "en"],
        interpolation: {
            escapeValue: false
        }
    });