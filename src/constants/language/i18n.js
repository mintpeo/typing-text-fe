import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { STORAGE_KEYS } from "../storageKeys.js";

// Get Language in Local Storage
const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "vi";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: savedLang,
        fallbackLng: "en",
        ns: [
            "home",
            "auth",
            "header"
        ],
        defaultNS: "home",
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        }
    });

export default i18n;