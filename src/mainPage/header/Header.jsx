import './Header.css';
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {AVAILABLE_LANGUAGES} from "../../constants/language/language.js";
import {STORAGE_KEYS} from "../../constants/storageKeys.js";

// import Icons
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";

export default function Header() {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const [uiLang, setUiLang] = useState("");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const langLeaveTimeoutRef = useRef(null);

    // After Reload Web => Set Language
    useEffect(() => {
        const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "vi"; // vi; en;...
        const savedLang = AVAILABLE_LANGUAGES.find(lng => lng.code === lang)?.label;
        setUiLang(savedLang);
    }, []);

    const handleLangMouseEnter = () => {
        if (langLeaveTimeoutRef.current) clearTimeout(langLeaveTimeoutRef.current);
        setIsLangDropdownOpen(true);
    };

    const handleLangMouseLeave = () => {
        langLeaveTimeoutRef.current = setTimeout(() => {
            setIsLangDropdownOpen(false);
        }, 500);
    };

    // Switch language
    const switchLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <div id="header">
            <div className="side-left"
            onClick={() => navigate("/")}>
                {/* Logo Web */}
                <img className="logo-main" src="src/assets/hero.png" alt=""/>
                <div className="logo-title">TQM</div>
            </div>

            <div className="side-right">
                {/* Support */}
                <div className="support btn" title={t("header:support")}><p>{t("header:support")}</p></div>

                {/* Notification */}
                <i className="icon btn" title={t("header:noti")}><MdOutlineNotifications /></i>

                {/* Border */}
                <div className="borderRi"> </div>

                {/* Change Language */}
                <div onMouseEnter={handleLangMouseEnter}
                    onMouseLeave={handleLangMouseLeave}>
                    <button className="choose-lang-btn" title={t("header:langUI")} onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}>
                        🌐 {t("header:langUI")}: {uiLang}

                        {/* Modal Change Language */}
                        {isLangDropdownOpen && (
                            <div className="lang-drop-down">
                                {AVAILABLE_LANGUAGES.map((item) => (
                                    <button
                                        className="lang-btn"
                                        onClick={() => {
                                            setUiLang(`${item.label}`);
                                            setIsLangDropdownOpen(false);
                                            switchLanguage(`${item.code}`);
                                        }}
                                    >{item.label}</button>
                                ))}
                            </div>
                        )}
                    </button>
                </div>

                {/* Login */}
                <button className="login-btn" title={t("auth:authBtn")} onClick={() => navigate('/auth')}>
                    {t("auth:authBtn")}
                </button>
            </div>
        </div>
    )
}