import { useState } from "react";
import { theme } from "../../constants/theme.js";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import './Auth.css';

// import Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";

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
        <div id="auth">
            <div className="container" onClick={(e) => e.stopPropagation()}>
                {/* Icon mũi tên trái */}
                <div className="back-home" onClick={() => navigate('/')} title={t("titleBtn")}>
                    <i className="icon"><FaArrowLeft /></i>

                    <p style={{margin: 0, fontSize: '16px', lineHeight: '1'}}>
                        {t("titleBtn")}
                    </p>
                </div>

                {/* Tiêu đề */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="icon">
                        {isLogin ? <IoKey /> : <FaUserPen />}
                    </i>

                    <h3 style={{ margin: 0, fontSize: '22px', color: theme.accent }} title={isLogin ? `${t("authBtn")}` : `${t("titleSignUp")}`}>
                        {isLogin ? `${t("authBtn")}` : `${t("titleSignUp")}`}
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