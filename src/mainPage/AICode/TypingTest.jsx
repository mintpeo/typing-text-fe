import React, { useState, useEffect, useRef } from "react";

// DỮ LIỆU ĐOẠN VĂN THEO NGÔN NGỮ (TEXT CORES)
const TEXT_DATABASE = {
    vi: [
        "Java là một ngôn ngữ lập trình hướng đối tượng hữu ích. Nó được thiết kế để có ít phụ thuộc vào nền tảng nhất có thể. Định hướng của Java là viết một lần chạy mọi nơi. Lập trình hướng đối tượng giúp code dễ quản lý hơn. Việc tái sử dụng mã nguồn tiết kiệm rất nhiều thời gian. Hãy kiên trì luyện tập mỗi ngày để thành thạo.",
        "Javascript là ngôn ngữ của web. Bạn có thể xây dựng các ứng dụng phía máy chủ, ứng dụng di động và thậm chí cả trò chơi với nó. Hệ sinh thái của nó rất khổng lồ. Nodejs giúp Javascript chạy trên máy chủ. Các thư viện như React làm giao diện Web rất mạnh mẽ. Lập trình web luôn là một xu thế lớn.",
        "Lập trình không phải là về những gì bạn biết. Đó là về những gì bạn có thể tìm ra khi gặp khó khăn. Hãy kiên trì luyện tập mỗi ngày để trở nên thành thạo hơn. Thành công sẽ đến với những người bền bỉ. Đừng bao giờ bỏ cuộc khi gặp lỗi khó. Mỗi lỗi sai là một bài học quý giá."
    ],
    en: [
        "The quick brown fox jumps over the lazy dog. Programming is not about what you know, it is about what you can figure out when you get stuck. Keep practicing every day to become proficient. Success will come to those who persist. Never give up when encountering a difficult bug.",
        "JavaScript is the language of the web. You can build server-side applications, mobile apps, and even games with it. Its ecosystem is absolutely massive. Nodejs helps JavaScript run on servers. Libraries like React make Web interfaces very powerful.",
        "Java is a highly useful object-oriented programming language. It is designed to have as few implementation dependencies as possible. Java's motto is write once run anywhere. Object-oriented programming helps code become much easier to manage."
    ]
};

// DICTIONARY CHUYỂN ĐỔI NGÔN NGỮ GIAO DIỆN (UI LANGUAGES)
const UI_STRINGS = {
    vi: {
        time: "Thời gian",
        infinite: "Vô hạn",
        speed: "Tốc độ (WPM)",
        accuracy: "Độ chính xác",
        placeholder: "Bắt đầu gõ tại đây...",
        refresh: "Làm mới!",
        finish: "Kết quả kiểm tra",
        modalTextTitle: "Tùy chỉnh văn bản luyện gõ",
        modalTextDesc: "Bạn có thể dán bài báo, lời bài hát hoặc code vào đây (Nhấn Ctrl + Enter để lưu nhanh).",
        modalLayoutTitle: "Cài đặt hiển thị",
        modalLayoutDesc: "Xác định số lượng từ trên mỗi dòng hiển thị.",
        modalTimeTitle: "⏱️ Cấu hình thời gian",
        modalTimeDesc: "Nhập số giây bạn muốn tập luyện:",
        cancel: "Hủy",
        save: "Lưu & Luyện",
        apply: "Áp dụng",
        optText: "📝 Thay đổi đoạn văn",
        optLayout: "⚙️ Số từ mỗi dòng",
        optTime: "⏱️ Cấu hình thời gian",
        langUI: "🌐 Ngôn ngữ",
        langText: "🔤 Văn bản",
        grossWpm: "WPM thô",
        netWpm: "WPM ròng",
        backspace: "Xoá lùi",
        wrongWordsTitle: "TỪ GÕ SAI",
        retryBtn: "Thử lại",
        practiceTextBtn: "Luyện lại từ sai",
        rankTitle: "Người mới bắt đầu",
        rankDesc: "Bạn nhanh hơn 1% người chơi",
        saveResult: "Lưu kết quả & theo dõi tiến bộ",
        copyLink: "Sao chép liên kết",
        share: "Chia sẻ",
        speedAnalysis: "PHÂN TÍCH TỐC ĐỘ"
    },
    en: {
        time: "Time",
        infinite: "Infinite",
        speed: "Speed (WPM)",
        accuracy: "Accuracy",
        placeholder: "Start typing here...",
        refresh: "Refresh!",
        finish: "Test Results",
        modalTextTitle: "Custom Typing Text",
        modalTextDesc: "You can paste articles, lyrics, or code here (Press Ctrl + Enter to quick save).",
        modalLayoutTitle: "Display Settings",
        modalLayoutDesc: "Determine the number of words displayed per line.",
        modalTimeTitle: "⏱️ Time Configuration",
        modalTimeDesc: "Enter the number of seconds you want to practice:",
        cancel: "Cancel",
        save: "Save & Practice",
        apply: "Apply",
        optText: "📝 Change Text",
        optLayout: "⚙️ Words Per Line",
        optTime: "⏱️ Configure Time",
        langUI: "🌐 Language",
        langText: "🔤 Text",
        grossWpm: "Gross WPM",
        netWpm: "Net WPM",
        backspace: "Backspace",
        wrongWordsTitle: "WRONG WORDS",
        retryBtn: "Retry",
        practiceTextBtn: "Practice wrong words",
        rankTitle: "Beginner",
        rankDesc: "You are faster than 1% of players",
        saveResult: "Save results & track progress",
        copyLink: "Copy link",
        share: "Share",
        speedAnalysis: "SPEED ANALYSIS"
    },
    ko: {
        time: "시간",
        infinite: "무한",
        speed: "타자 속도 (WPM)",
        accuracy: "정확도",
        placeholder: "여기에 타이핑을 시작하세요...",
        refresh: "새로고침!",
        finish: "테스트 결과",
        modalTextTitle: "사용자 지정 텍스트",
        modalTextDesc: "기사, 가사 또는 코드를 여기에 붙여넣을 수 있습니다 (Ctrl + Enter를 눌러 빠른 저장).",
        modalLayoutTitle: "디스플레이 설정",
        modalLayoutDesc: "한 줄에 표시할 단어 수를 결정합니다.",
        modalTimeTitle: "⏱️ 시간 설정",
        modalTimeDesc: "연습하고 싶은 초 수를 입력하세요:",
        cancel: "취소",
        save: "저장 및 연습",
        apply: "적용",
        optText: "📝 텍스트 변경",
        optLayout: "⚙️ 한 줄당 단어 수",
        optTime: "⏱️ 시간 구성",
        langUI: "🌐 언어",
        langText: "🔤 본문",
        grossWpm: "총 WPM",
        netWpm: "순 WPM",
        backspace: "백스페이스",
        wrongWordsTitle: "틀린 단어",
        retryBtn: "다시 시도",
        practiceTextBtn: "틀린 단어 연습",
        rankTitle: "초보자",
        rankDesc: "당신은 플레이어의 1%보다 빠릅니다",
        saveResult: "결과 저장 및 진행 상황 추적",
        copyLink: "링크 복사",
        share: "공유",
        speedAnalysis: "속도 분석"
    }
};

export default function TypingTest() {
    const [uiLang, setUiLang] = useState("vi");
    const [textLang, setTextLang] = useState("vi");
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isTextLangDropdownOpen, setIsTextLangDropdownOpen] = useState(false);

    const [customTexts, setCustomTexts] = useState([]);
    const [wordsPerLine, setWordsPerLine] = useState(8);

    const [maxTime, setMaxTime] = useState(60);
    const [isInfinite, setIsInfinite] = useState(false);

    const [lines, setLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentWordIndexInLine, setCurrentWordIndexInLine] = useState(0);

    const [typedChars, setTypedChars] = useState("");
    const [charStatuses, setCharStatuses] = useState({});

    const [timeLeft, setTimeLeft] = useState(60);
    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);

    const [wpm, setWpm] = useState(0);
    const [grossWpm, setGrossWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    const [historyCorrectChars, setHistoryCorrectChars] = useState(0);
    const [historyTypedCount, setHistoryTypedCount] = useState(0);
    const [infiniteTimeElapsed, setInfiniteTimeElapsed] = useState(0);
    const [backspaceCount, setBackspaceCount] = useState(0);
    const [wrongWords, setWrongWords] = useState([]);

    const allWordsRef = useRef([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

    const [textInputValue, setTextInputValue] = useState("");
    const [layoutInputValue, setLayoutInputValue] = useState(8);

    const [timeInputValue, setTimeInputValue] = useState(60);
    const [tempIsInfinite, setTempIsInfinite] = useState(false);

    const inputRef = useRef(null);
    const timerRef = useRef(null);

    const leaveTimeoutRef = useRef(null);
    const langLeaveTimeoutRef = useRef(null);
    const textLangLeaveTimeoutRef = useRef(null);

    const ui = UI_STRINGS[uiLang];

    const setupNewTest = (specificText = null) => {
        let text = specificText;
        if (!text) {
            const pool = customTexts.length > 0 ? customTexts : TEXT_DATABASE[textLang];
            const randomIndex = Math.floor(Math.random() * pool.length);
            text = pool[randomIndex];
        }

        const cleanWords = text.split(/\s+/).filter(Boolean);
        allWordsRef.current = cleanWords;

        const initialLines = [];
        let lineWords = [];
        let lineCounter = 0;

        for (let i = 0; i < Math.max(cleanWords.length, wordsPerLine * 5); i++) {
            const word = cleanWords[i % cleanWords.length];
            lineWords.push(word);

            if (lineWords.length === wordsPerLine) {
                initialLines.push({ lineIdx: lineCounter, words: lineWords });
                lineWords = [];
                lineCounter++;
            }
        }
        if (lineWords.length > 0) {
            initialLines.push({ lineIdx: lineCounter, words: lineWords });
        }

        setLines(initialLines);
        setCurrentLineIndex(0);
        setCurrentWordIndexInLine(0);
        setTypedChars("");
        setCharStatuses({});

        setTimeLeft(isInfinite ? 999999 : maxTime);
        setInfiniteTimeElapsed(0);
        setIsTestActive(false);
        setIsTestFinished(false);
        setWpm(0);
        setGrossWpm(0);
        setAccuracy(100);
        setHistoryCorrectChars(0);
        setHistoryTypedCount(0);
        setBackspaceCount(0);
        setWrongWords([]);

        if (inputRef.current) inputRef.current.value = "";
        clearInterval(timerRef.current);
        setTimeout(() => focusInput(), 50);
    };

    const appendNextLine = () => {
        setLines((prevLines) => {
            const nextLineIdx = prevLines.length;
            const cleanWords = allWordsRef.current;
            const nextWords = [];

            let totalWordsGenerated = prevLines.reduce((sum, l) => sum + l.words.length, 0);

            for (let i = 0; i < wordsPerLine; i++) {
                const targetIdx = (totalWordsGenerated + i) % cleanWords.length;
                nextWords.push(cleanWords[targetIdx]);
            }

            return [...prevLines, { lineIdx: nextLineIdx, words: nextWords }];
        });
    };

    useEffect(() => {
        setupNewTest();
        return () => {
            clearInterval(timerRef.current);
            if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
            if (langLeaveTimeoutRef.current) clearTimeout(langLeaveTimeoutRef.current);
            if (textLangLeaveTimeoutRef.current) clearTimeout(textLangLeaveTimeoutRef.current);
        };
    }, [customTexts, wordsPerLine, maxTime, isInfinite, textLang]);

    useEffect(() => {
        if (isTestActive) {
            timerRef.current = setInterval(() => {
                if (isInfinite) {
                    setInfiniteTimeElapsed((prev) => prev + 1);
                } else {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            clearInterval(timerRef.current);
                            setIsTestActive(false);
                            setIsTestFinished(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [isTestActive, isInfinite]);

    useEffect(() => {
        if (!isTestActive && historyTypedCount === 0) return;

        let currentCorrectChars = 0;
        if (lines[currentLineIndex] && lines[currentLineIndex].words[currentWordIndexInLine]) {
            const targetWord = lines[currentLineIndex].words[currentWordIndexInLine];
            typedChars.split("").forEach((char, i) => {
                if (i < targetWord.length && char === targetWord[i]) {
                    currentCorrectChars++;
                }
            });
        }

        const totalCorrect = historyCorrectChars + currentCorrectChars;
        const totalTyped = historyTypedCount + typedChars.length;

        if (totalTyped > 0) {
            const timeElapsed = isInfinite ? (infiniteTimeElapsed / 60) : ((maxTime - timeLeft) / 60);
            const calculatedWpm = timeElapsed > 0 ? Math.round((totalCorrect / 5) / timeElapsed) : 0;
            const calculatedGrossWpm = timeElapsed > 0 ? Math.round((totalTyped / 5) / timeElapsed) : 0;
            const calculatedAcc = Math.round((totalCorrect / totalTyped) * 100);

            setWpm(calculatedWpm);
            setGrossWpm(calculatedGrossWpm);
            setAccuracy(calculatedAcc);
        }
    }, [typedChars, timeLeft, infiniteTimeElapsed, historyCorrectChars, historyTypedCount, isTestActive, isInfinite, maxTime]);

    const handleWordSubmit = (currentRawValue) => {
        const currentLine = lines[currentLineIndex];
        if (!currentLine) return;

        const targetWord = currentLine.words[currentWordIndexInLine];

        if (!isTestActive) {
            setIsTestActive(true);
        }

        let correctInWord = 0;
        let isWordError = false;
        const newStatuses = { ...charStatuses };

        targetWord.split("").forEach((char, charIdx) => {
            const statusKey = `${currentLineIndex}-${currentWordIndexInLine}-${charIdx}`;

            if (charIdx < currentRawValue.length) {
                const isCharCorrect = currentRawValue[charIdx] === char;
                newStatuses[statusKey] = isCharCorrect ? "correct" : "wrong";
                if (isCharCorrect) {
                    correctInWord++;
                } else {
                    isWordError = true;
                }
            } else {
                newStatuses[statusKey] = "wrong";
                isWordError = true;
            }
        });

        if (currentRawValue.length !== targetWord.length) {
            isWordError = true;
        }

        if (isWordError) {
            setWrongWords((prev) => {
                if (!prev.includes(targetWord)) return [...prev, targetWord];
                return prev;
            });
        }

        const typedLength = Math.max(currentRawValue.length, targetWord.length);

        setHistoryCorrectChars((prev) => prev + correctInWord);
        setHistoryTypedCount((prev) => prev + typedLength);
        setCharStatuses(newStatuses);

        if (currentWordIndexInLine + 1 < currentLine.words.length) {
            setCurrentWordIndexInLine((prev) => prev + 1);
            setTypedChars("");
            if (inputRef.current) inputRef.current.value = "";
        } else {
            appendNextLine();
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentWordIndexInLine(0);
            setTypedChars("");
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleKeyDown = (e) => {
        if (isTestFinished || lines.length === 0) return;

        if (e.key === "Backspace") {
            setBackspaceCount((prev) => prev + 1);
        }

        if (e.key === " " || e.keyCode === 32) {
            e.preventDefault();
            const currentRawValue = inputRef.current.value;
            handleWordSubmit(currentRawValue);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (isTestFinished) return;

        if (value.endsWith(" ")) {
            const rawValueWithoutSpace = value.slice(0, -1);
            handleWordSubmit(rawValueWithoutSpace);
            return;
        }

        if (!isTestActive && value.length > 0) {
            setIsTestActive(true);
        }

        setTypedChars(value);
    };

    const focusInput = () => {
        if (inputRef.current && !isTestFinished && !isTextModalOpen && !isLayoutModalOpen && !isTimeModalOpen) {
            inputRef.current.focus();
        }
    };

    const handleSaveCustomText = () => {
        if (textInputValue.trim().length === 0) return;
        setCustomTexts([textInputValue.trim()]);
        setIsTextModalOpen(false);
        setTextInputValue("");
    };

    const handleSaveLayout = () => {
        let val = parseInt(layoutInputValue, 10);
        if (isNaN(val)) val = 8;
        val = Math.max(3, Math.min(15, val));

        setWordsPerLine(val);
        setLayoutInputValue(val);
        setIsLayoutModalOpen(false);
    };

    const handleSaveTimeConfig = () => {
        setIsInfinite(tempIsInfinite);
        if (tempIsInfinite) {
            setIsTimeModalOpen(false);
        } else {
            let val = parseInt(timeInputValue, 10);
            if (isNaN(val) || val <= 0) val = 60;
            setMaxTime(val);
            setTimeInputValue(val);
            setIsTimeModalOpen(false);
        }
    };

    const openTimeModal = () => {
        setTempIsInfinite(isInfinite);
        setTimeInputValue(maxTime);
        setIsTimeModalOpen(true);
    };

    const activateHoverStyle = (e) => { e.currentTarget.style.backgroundColor = "#323437"; };
    const deactivateHoverStyle = (e) => { e.currentTarget.style.backgroundColor = "transparent"; };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#323437', color: '#d1d0c5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', padding: '16px', position: 'relative', boxSizing: 'border-box' }}>

            <style>{`
                .typing-box { font-size: 24px; height: 180px; }
                .word-gap { column-gap: 16px; row-gap: 8px; }
                
                /* STYLE CHO KHU VỰC KẾT QUẢ THEO TÔNG MÀU WEB */
                .dashboard-container { display: flex; gap: 24px; width: 100%; max-width: 896px; margin-top: 24px; }
                .left-card { background-color: #2c2e31; color: #d1d0c5; border: 1px solid #444649; border-radius: 20px; padding: 32px; width: 45%; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .right-layout { display: flex; flex-direction: column; gap: 20px; width: 55%; }
                .speed-card { background-color: #2c2e31; color: #d1d0c5; border: 1px solid #444649; border-radius: 16px; padding: 24px; }
                .wrong-words-card { background-color: #2c2e31; color: #d1d0c5; border: 1px solid #444649; border-radius: 16px; padding: 24px; min-height: 180px; }
                .badge-wrong { background-color: rgba(202, 71, 84, 0.15); color: #ca4754; border: 1px solid #ca4754; border-radius: 6px; padding: 6px 12px; font-size: 15px; font-weight: bold; }
                
                @media (max-width: 868px) {
                    .dashboard-container { flex-direction: column; gap: 16px; }
                    .left-card { width: 100%; box-sizing: border-box; }
                    .right-layout { width: 100%; }
                }
                @media (max-width: 768px) {
                    .typing-box { font-size: 18px !important; height: 210px !important; padding: 16px !important; }
                    .word-gap { column-gap: 10px !important; row-gap: 4px !important; }
                    .stat-box { padding: 10px !important; }
                    .stat-text { font-size: 20px !important; }
                }
            `}</style>

            {/* KHU VỰC MENU ĐIỀU KHIỂN PHÍA TRÊN GÓC PHẢI */}
            <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 50, display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => {
                        if (langLeaveTimeoutRef.current) clearTimeout(langLeaveTimeoutRef.current);
                        setIsLangDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                        langLeaveTimeoutRef.current = setTimeout(() => {
                            setIsLangDropdownOpen(false);
                        }, 1000);
                    }}
                >
                    <button
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        style={{ backgroundColor: "#2c2e31", color: "#646669", border: "1px solid #444649", borderRadius: "6px", padding: "8px 12px", cursor: "pointer", fontSize: "14px", fontFamily: "monospace" }}
                    >
                        {ui.langUI}: {uiLang === "vi" ? "Tiếng Việt" : uiLang === "en" ? "English" : "한국어"}
                    </button>
                    {isLangDropdownOpen && (
                        <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#2c2e31", border: "1px solid #444649", borderRadius: "8px", padding: "4px", display: "flex", flexDirection: "column", gap: "2px", width: "max-content", marginTop: "4px", boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}>
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setUiLang("vi"); setIsLangDropdownOpen(false); }} style={{ backgroundColor: "transparent", color: "#d1d0c5", border: "none", padding: "8px 14px", textAlign: "left", cursor: "pointer", fontSize: "14px", fontFamily: "monospace", borderRadius: "4px", transition: "background 0.2s" }}>Tiếng Việt</button>
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setUiLang("en"); setIsLangDropdownOpen(false); }} style={{ backgroundColor: "transparent", color: "#d1d0c5", border: "none", padding: "8px 14px", textAlign: "left", cursor: "pointer", fontSize: "14px", fontFamily: "monospace", borderRadius: "4px", transition: "background 0.2s" }}>English</button>
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setUiLang("ko"); setIsLangDropdownOpen(false); }} style={{ backgroundColor: "transparent", color: "#d1d0c5", border: "none", padding: "8px 14px", textAlign: "left", cursor: "pointer", fontSize: "14px", fontFamily: "monospace", borderRadius: "4px", transition: "background 0.2s" }}>한국어</button>
                        </div>
                    )}
                </div>

                <div
                    onMouseEnter={() => {
                        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                        setIsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                        leaveTimeoutRef.current = setTimeout(() => {
                            setIsDropdownOpen(false);
                        }, 1000);
                    }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ position: "relative" }}
                >
                    <button
                        title={ui.optText}
                        style={{ background: "none", border: "none", cursor: "pointer", color: isDropdownOpen ? "#e2b714" : "#646669", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s, transform 0.3s ease", transform: isDropdownOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#2c2e31', border: '1px solid #444649', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px', width: 'max-content', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)', marginTop: '4px' }}
                        >
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setIsTextModalOpen(true); setIsDropdownOpen(false); }} style={{ backgroundColor: 'transparent', color: '#d1d0c5', border: 'none', padding: '10px 16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '15px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{ui.optText}</button>
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setIsLayoutModalOpen(true); setIsDropdownOpen(false); }} style={{ backgroundColor: 'transparent', color: '#d1d0c5', border: 'none', padding: '10px 16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '15px', fontFamily: 'monospace', whiteSpace: 'nowrap', transition: "background 0.2s" }}>{ui.optLayout}</button>
                            <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { openTimeModal(); setIsDropdownOpen(false); }} style={{ backgroundColor: 'transparent', color: '#d1d0c5', border: 'none', padding: '10px 16px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', fontSize: '15px', fontFamily: 'monospace', whiteSpace: 'nowrap', transition: "background 0.2s" }}>{ui.optTime}</button>
                        </div>
                    )}
                </div>
            </div>

            {/* PHẦN KHUNG KHÔNG GIAN GAMEPLAY LUÔN GIỮ NGUYÊN TRẠNG THÁI HIỂN THỊ */}
            <div style={{ maxWidth: '896px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>

                {/* Chỉ số thông tin */}
                <div className="stat-box" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2c2e31', padding: '16px', borderRadius: '12px', border: '1px solid #444649', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#646669' }}>{ui.time}:</span>
                        <span className="stat-text" style={{ fontSize: '24px', fontWeight: 'bold', color: '#e2b714' }}>
                            {isInfinite ? `∞ (${ui.infinite})` : `${timeLeft}s`}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: "auto" }}>
                        <div
                            style={{ position: "relative" }}
                            onMouseLeave={() => setIsTextLangDropdownOpen(false)}
                        >
                            <button
                                onClick={() => setIsTextLangDropdownOpen(!isTextLangDropdownOpen)}
                                disabled={isTestFinished}
                                style={{ backgroundColor: "#323437", color: "#e2b714", border: "1px solid #444649", borderRadius: "6px", padding: "6px 12px", cursor: isTestFinished ? "not-allowed" : "pointer", fontSize: "14px", fontFamily: "monospace" }}
                            >
                                {ui.langText}: {textLang === "vi" ? "Tiếng Việt" : "English"}
                            </button>
                            {isTextLangDropdownOpen && !isTestFinished && (
                                <div style={{ position: "absolute", bottom: "100%", right: 0, backgroundColor: "#2c2e31", border: "1px solid #444649", borderRadius: "8px", padding: "4px", display: "flex", flexDirection: "column", gap: "2px", width: "max-content", marginBottom: "4px", boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}>
                                    <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setCustomTexts([]); setTextLang("vi"); setIsTextLangDropdownOpen(false); }} style={{ backgroundColor: "transparent", color: "#d1d0c5", border: "none", padding: "8px 14px", textAlign: "left", cursor: "pointer", fontSize: "14px", fontFamily: "monospace", borderRadius: "4px", transition: "background 0.2s" }}>Tiếng Việt</button>
                                    <button onMouseEnter={activateHoverStyle} onMouseLeave={deactivateHoverStyle} onClick={() => { setCustomTexts([]); setTextLang("en"); setIsTextLangDropdownOpen(false); }} style={{ backgroundColor: "transparent", color: "#d1d0c5", border: "none", padding: "8px 14px", textAlign: "left", cursor: "pointer", fontSize: "14px", fontFamily: "monospace", borderRadius: "4px", transition: "background 0.2s" }}>English</button>
                                </div>
                            )}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '13px', color: '#646669', margin: 0 }}>{ui.speed}</p>
                            <p className="stat-text" style={{ fontSize: '26px', fontWeight: 'bold', color: '#e2b714', margin: 0 }}>{wpm}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '13px', color: '#646669', margin: 0 }}>{ui.accuracy}</p>
                            <p className="stat-text" style={{ fontSize: '26px', fontWeight: 'bold', color: '#e2b714', margin: 0 }}>{accuracy}%</p>
                        </div>
                    </div>
                </div>

                {/* KHUNG CHỨA VĂN BẢN */}
                <div
                    onClick={focusInput}
                    className="typing-box"
                    style={{ backgroundColor: '#2c2e31', padding: '24px', borderRadius: '16px', border: '1px solid #444649', cursor: isTestFinished ? 'not-allowed' : 'text', height: '180px', fontSize: '24px', userSelect: 'none', lineHeight: '1.8', overflow: 'hidden', position: 'relative', boxSizing: 'border-box' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {lines.slice(currentLineIndex, currentLineIndex + 3).map((line) => {
                            const lIdx = line.lineIdx;
                            const isCurrentLine = lIdx === currentLineIndex;

                            return (
                                <div
                                    key={lIdx}
                                    className="word-gap"
                                    style={{ display: 'flex', flexWrap: 'wrap', transition: 'opacity 0.2s ease' }}
                                >
                                    {line.words.map((word, wIdx) => {
                                        const isCurrentWord = isCurrentLine && (wIdx === currentWordIndexInLine);
                                        const hasBeenTypedWord = lIdx < currentLineIndex || (isCurrentLine && wIdx < currentWordIndexInLine);

                                        return (
                                            <div key={wIdx} style={{ display: 'flex', borderBottom: isCurrentWord ? '2px solid #e2b714' : '2px solid transparent', paddingBottom: '2px' }}>
                                                {word.split("").map((char, charIdx) => {
                                                    let charColor = '#646669';
                                                    const charKey = `${lIdx}-${wIdx}-${charIdx}`;
                                                    const currentCharStatus = charStatuses[charKey];

                                                    if (isCurrentWord) {
                                                        if (charIdx < typedChars.length) {
                                                            const isCharCorrect = typedChars[charIdx] === char;
                                                            charColor = isCharCorrect ? '#fff' : '#ca4754';
                                                        }
                                                    } else if (hasBeenTypedWord) {
                                                        charColor = currentCharStatus === "correct" ? '#e2b714' : '#ca4754';
                                                    }

                                                    return (
                                                        <span key={charIdx} style={{ color: charColor, transition: 'color 0.1s ease' }}>
                                                            {char}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ô INPUT THẬT */}
                <div style={{ width: '100%' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        disabled={isTestFinished}
                        placeholder={ui.placeholder}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        style={{ width: '100%', backgroundColor: '#2c2e31', color: '#fff', border: '2px solid #444649', borderRadius: '12px', padding: '14px 18px', fontSize: '18px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease' }}
                        onFocus={(e) => e.target.style.borderColor = '#e2b714'}
                        onBlur={(e) => e.target.style.borderColor = '#444649'}
                        autoFocus
                    />
                </div>

                {/* NÚT LÀM MỚI BÀI TẬP */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setupNewTest()} style={{ backgroundColor: '#e2b714', color: '#2c2e31', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                        <span>{ui.refresh}</span>
                    </button>
                </div>

                {/* ============================================================== */
                    /* SỬA ĐỔI CHÍNH: KHU VỰC HIỂN THỊ KẾT QUẢ ĐỒNG BỘ DARK THEM PHÍA DƯỚI */
                    /* ============================================================== */}
                {isTestFinished && (
                    <div className="dashboard-container">

                        {/* CARD TRÁI: THÔNG SỐ TỔNG QUAN */}
                        <div className="left-card">
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "16px" }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#646669", fontWeight: "bold" }}>{ui.speed}</p>
                                    <p style={{ margin: "4px 0 0 0", fontSize: "40px", fontWeight: "900", color: "#e2b714" }}>{wpm}</p>
                                </div>

                                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#444649", color: "#e2b714", border: "1px solid #646669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                                    {wpm >= 80 ? "S" : wpm >= 60 ? "A" : wpm >= 40 ? "B" : wpm >= 20 ? "C" : "D"}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#646669", fontWeight: "bold" }}>{ui.accuracy}</p>
                                    <p style={{ margin: "4px 0 0 0", fontSize: "40px", fontWeight: "900", color: "#e2b714" }}>{accuracy}.0<span style={{ fontSize: "18px" }}>%</span></p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: "rgba(226, 183, 20, 0.15)", color: "#e2b714", border: "1px solid #e2b714", padding: "6px 20px", borderRadius: "20px", fontWeight: "bold", fontSize: "15px", marginBottom: "12px" }}>
                                🏆 {ui.rankTitle}
                            </div>
                            <p style={{ margin: "0 0 24px 0", color: "#646669", fontSize: "13px" }}>{ui.rankDesc}</p>

                            <div style={{ backgroundColor: "#323437", border: "1px solid #444649", borderRadius: "12px", padding: "16px", width: "100%", boxSizing: "border-box", marginBottom: "16px" }}>
                                <p style={{ margin: 0, fontSize: "24px" }}>💪</p>
                                <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#d1d0c5" }}>Tiếp tục luyện tập — bạn đang tiến bộ!</p>
                            </div>

                            <button style={{ backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", width: "100%", padding: "12px", fontWeight: "bold", fontSize: "14px", cursor: "pointer", marginBottom: "12px" }}>
                                💾 {ui.saveResult}
                            </button>

                            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                                <button style={{ flex: 1, backgroundColor: "#1877f2", color: "#fff", border: "none", borderRadius: "20px", padding: "10px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>{ui.share}</button>
                                <button style={{ flex: 1, backgroundColor: "#444649", color: "#d1d0c5", border: "none", borderRadius: "20px", padding: "10px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>{ui.copyLink}</button>
                            </div>
                        </div>

                        {/* CARD PHẢI: CHI TIẾT TỪ SAI */}
                        <div className="right-layout">
                            <div className="speed-card">
                                <h4 style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#646669", letterSpacing: "0.5px" }}>{ui.speedAnalysis}</h4>
                                <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#fff" }}>{grossWpm}</p>
                                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#646669" }}>{ui.grossWpm}</p>
                                    </div>
                                    <div style={{ flex: 1, borderLeft: "1px solid #444649", borderRight: "1px solid #444649" }}>
                                        <p style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#e2b714" }}>{wpm}</p>
                                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#646669" }}>{ui.netWpm}</p>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#ca4754" }}>{backspaceCount}</p>
                                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#646669" }}>{ui.backspace}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="wrong-words-card">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <h4 style={{ margin: 0, fontSize: "13px", color: "#646669", letterSpacing: "0.5px" }}>{ui.wrongWordsTitle}</h4>
                                    {wrongWords.length > 0 && (
                                        <button onClick={() => { setCustomTexts([wrongWords.join(" ")]); }} style={{ backgroundColor: "#e2b714", color: "#2c2e31", border: "none", borderRadius: "14px", padding: "4px 12px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                                            🔂 {ui.practiceTextBtn}
                                        </button>
                                    )}
                                </div>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                    {wrongWords.length > 0 ? (
                                        wrongWords.map((word, index) => (
                                            <span key={index} className="badge-wrong">{word}</span>
                                        ))
                                    ) : (
                                        <p style={{ margin: 0, color: "#646669", fontSize: "14px", fontStyle: "italic" }}>Tuyệt vời! Bạn không gõ sai từ nào.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* MODAL 1: THAY ĐỔI ĐOẠN VĂN BẢN */}
            {isTextModalOpen && (
                <div
                    onClick={() => setIsTextModalOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '12px', boxSizing: 'border-box' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: '#2c2e31', border: '2px solid #444649', borderRadius: '16px', padding: '20px', maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#e2b714' }}>{ui.modalTextTitle}</h3>
                            <button onClick={() => setIsTextModalOpen(false)} style={{ background: 'none', border: 'none', color: '#646669', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#646669', lineHeight: '1.4' }}>{ui.modalTextDesc}</p>
                        <textarea
                            rows="5"
                            value={textInputValue}
                            onChange={(e) => setTextInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    handleSaveCustomText();
                                }
                            }}
                            placeholder={ui.placeholder}
                            style={{ width: '100%', backgroundColor: '#323437', color: '#fff', border: '1px solid #444649', borderRadius: '8px', padding: '12px', fontSize: '15px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setIsTextModalOpen(false)} style={{ backgroundColor: '#323437', color: '#646669', border: '1px solid #444649', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.cancel}</button>
                            <button onClick={handleSaveCustomText} style={{ backgroundColor: '#e2b714', color: '#2c2e31', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.save}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: CẤU HÌNH SỐ TỪ MỖI DÒNG */}
            {isLayoutModalOpen && (
                <div
                    onClick={() => setIsLayoutModalOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '12px', boxSizing: 'border-box' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: '#2c2e31', border: '2px solid #444649', borderRadius: '16px', padding: '20px', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#e2b714' }}>{ui.modalLayoutTitle}</h3>
                            <button onClick={() => setIsLayoutModalOpen(false)} style={{ background: 'none', border: 'none', color: '#646669', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#646669', lineHeight: '1.4' }}>{ui.modalLayoutDesc}</p>
                        <input
                            type="number"
                            min="3"
                            max="15"
                            value={layoutInputValue}
                            onChange={(e) => setLayoutInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSaveLayout();
                                }
                            }}
                            style={{ width: '100%', backgroundColor: '#323437', color: '#fff', border: '1px solid #444649', borderRadius: '8px', padding: '12px', fontSize: '15px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setIsLayoutModalOpen(false)} style={{ backgroundColor: '#323437', color: '#646669', border: '1px solid #444649', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.cancel}</button>
                            <button onClick={handleSaveLayout} style={{ backgroundColor: '#e2b714', color: '#2c2e31', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.apply}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: CẤU HÌNH THỜI GIAN LUYỆN GÕ */}
            {isTimeModalOpen && (
                <div
                    onClick={() => setIsTimeModalOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '12px', boxSizing: 'border-box' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: '#2c2e31', border: '2px solid #444649', borderRadius: '16px', padding: '24px', maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', color: '#e2b714' }}>{ui.modalTimeTitle}</h3>
                            <button onClick={() => setIsTimeModalOpen(false)} style={{ background: 'none', border: 'none', color: '#646669', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                        </div>

                        <div style={{ display: 'flex', backgroundColor: '#323437', padding: '4px', borderRadius: '8px', border: '1px solid #444649' }}>
                            <button
                                onClick={() => setTempIsInfinite(true)}
                                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '14px', backgroundColor: tempIsInfinite ? '#e2b714' : 'transparent', color: tempIsInfinite ? '#2c2e31' : '#646669', transition: 'all 0.2s' }}
                            >
                                ∞ {ui.infinite}
                            </button>
                            <button
                                onClick={() => setTempIsInfinite(false)}
                                style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '14px', backgroundColor: !tempIsInfinite ? '#e2b714' : 'transparent', color: !tempIsInfinite ? '#2c2e31' : '#646669', transition: 'all 0.2s' }}
                            >
                                ⏱️ {ui.time}
                            </button>
                        </div>

                        {!tempIsInfinite && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <span style={{ fontSize: '13px', color: '#646669' }}>{ui.modalTimeDesc}</span>
                                <input
                                    type="number"
                                    min="5"
                                    max="3600"
                                    value={timeInputValue}
                                    onChange={(e) => setTimeInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSaveTimeConfig();
                                        }
                                    }}
                                    style={{ width: '100%', backgroundColor: '#323437', color: '#fff', border: '1px solid #444649', borderRadius: '8px', padding: '12px', fontSize: '16px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '4px' }}>
                            <button onClick={() => setIsTimeModalOpen(false)} style={{ backgroundColor: '#323437', color: '#646669', border: '1px solid #444649', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.cancel}</button>
                            <button onClick={handleSaveTimeConfig} style={{ backgroundColor: '#e2b714', color: '#2c2e31', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>{ui.apply}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}