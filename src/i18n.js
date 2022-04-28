import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "question_of_the_day": "Question of the day",
                    "no_poll": "There is no poll for today"
                }
            },
            es: {
                translation: {
                    "question_of_the_day": "Pregunta del día",
                    "no_poll": "No hay encuesta para hoy"
                }
            }
        },
        lng: "es",
        fallbackLng: ["en", "es"],
        interpolation: {
            escapeValue: false
        }
    });