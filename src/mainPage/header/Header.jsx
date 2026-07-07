import {theme} from "../../utils/theme.js";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {AVAILABLE_LANGUAGES} from "../../utils/language/language.js";
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const [uiLang, setUiLang] = useState("Vietnamese");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    const langLeaveTimeoutRef = useRef(null);
    const handleLangMouseEnter = () => {
        if (langLeaveTimeoutRef.current) {
            clearTimeout(langLeaveTimeoutRef.current);
        }

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
    };

    return (
        <div id="header">

            {/* Side-Right */}
            <div className="side-right">
                <div
                    style={{ position: "relative" }}
                    onMouseEnter={handleLangMouseEnter}
                    onMouseLeave={handleLangMouseLeave}
                >
                    <button className="choose-lang-btn" onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}>
                        {t("home:langUI")}: {uiLang}
                    </button>
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
                </div>

                {/* Login */}
                <button
                    onClick={() => navigate('/auth')}
                    style={{ backgroundColor: theme.accent, color: theme.background, border: "none", borderRadius: "6px", padding: "8px 14px", cursor: "pointer", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}
                >
                    {t("auth:authBtn")}
                </button>
            </div>
        </div>
    )
}