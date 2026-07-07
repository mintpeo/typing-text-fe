import { useState } from "react";
import { theme } from "../../utils/theme.js";
import './Auth.css';

// import Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Auth() {
    const navigate = useNavigate();
    const {t} = useTranslation("auth");

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setPasswordConfirm] = useState("");

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
    };

    return (
        <div
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: theme.cardBackground, border: `2px solid ${theme.border}`, borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)', color: theme.textMain, fontFamily: 'monospace' }}
            >
                {/* Icon mũi tên trái */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: "flex", alignItems: "center", cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(-5px)';
                        e.currentTarget.style.color = '#4285F4';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0px)';
                        e.currentTarget.style.color = theme.textMuted;
                    }}
                >
                    <FaArrowLeft
                        size={18}
                        style={{
                            marginRight: '10px',
                        }}
                    />

                    <p style={{
                        margin: 0,
                        fontSize: '16px',
                        lineHeight: '1' // Đảm bảo chữ không bị dư khoảng trắng phía trên/dưới
                    }}>
                        {t("titleBtn")}
                    </p>
                </div>

                {/* Tiêu đề */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '22px', color: theme.accent }}>
                        {isLogin ? `🔑 ${t("authBtn")}` : `📝 ${t("titleSignUp")}`}
                    </h3>
                </div>

                {/* Form Nhập liệu */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder={`${t("inputPass")}`} required value={password} onChange={(e) => setPassword(e.target.value)} />

                    {!isLogin && (
                        <input className="input" type="password" placeholder={`${t("inputPassAgain")}`} required value={confirmPassword} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    )}

                    <button type="submit"
                            style={{
                                backgroundColor: theme.accent, color: theme.background, border: 'none',
                                padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold',
                                fontSize: '16px', transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}>
                        {isLogin ? `${t("authBtn")}` : `${t("createAccBtn")}`}
                    </button>
                </form>

                {/* --- SIGN UP --- */}
                {isLogin && (
                    <>
                        <div style={{ textAlign: 'center', fontSize: '12px', color: theme.textMuted }}>──────── {t("orWay")} ────────</div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="social-btn">
                                <FcGoogle size={18} /> Google
                            </button>
                            <button className="social-btn">
                                <FaFacebook size={18} color="#4267B2" /> Facebook
                            </button>
                        </div>
                    </>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: theme.textMuted }}>
                            {isLogin ? `${t("haveAcc")} ` : `${t("noHaveAcc")} `}
                        </span>
                        <button
                            onClick={() => { setIsLogin(!isLogin); setEmail(""); setPassword(""); setPasswordConfirm(""); }}
                            style={{ background: 'none', border: 'none', color: theme.accent, cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', textDecoration: 'underline' }}
                        >
                            {isLogin ? `${t("nowSignUp")}` : `${t("nowLogin")}`}
                        </button>
                    </div>

                    {/* --- CHỈ HIỆN QUÊN MẬT KHẨU KHI ĐĂNG NHẬP --- */}
                    {isLogin && (
                        <button
                            onClick={() => alert("Chuyển hướng đến trang khôi phục mật khẩu")}
                            style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }} onMouseEnter={(e) => e.target.style.color = theme.accent} onMouseLeave={(e) => e.target.style.color = theme.textMuted}
                        >
                            {t("forgetPass")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}