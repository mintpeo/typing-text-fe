import React, { useState, useEffect, useRef } from "react";

const DEFAULT_TEXTS = [
    "Java là một ngôn ngữ lập trình hướng đối tượng hữu ích. Nó được thiết kế để có ít phụ thuộc vào nền tảng nhất có thể. Định hướng của Java là viết một lần chạy mọi nơi. Lập trình hướng đối tượng giúp code dễ quản lý hơn. Việc tái sử dụng mã nguồn tiết kiệm rất nhiều thời gian. Hãy kiên trì luyện tập mỗi ngày để thành thạo.",
    "Javascript là ngôn ngữ của web. Bạn có thể xây dựng các ứng dụng phía máy chủ, ứng dụng di động và thậm chí cả trò chơi với nó. Hệ sinh thái của nó rất khổng lồ. Nodejs giúp Javascript chạy trên máy chủ. Các thư viện như React làm giao diện Web rất mạnh mẽ. Lập trình web luôn là một xu thế lớn.",
    "Lập trình không phải là về những gì bạn biết. Đó là về những gì bạn có thể tìm ra khi gặp khó khăn. Hãy kiên trì luyện tập mỗi ngày để trở nên thành thạo hơn. Thành công sẽ đến với những người bền bỉ. Đừng bao giờ bỏ cuộc khi gặp lỗi khó. Mỗi lỗi sai là một bài học quý giá."
];

export default function TypingTest() {
    const [customTexts, setCustomTexts] = useState(DEFAULT_TEXTS);
    const [wordsPerLine, setWordsPerLine] = useState(8);

    const [lines, setLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentWordIndexInLine, setCurrentWordIndexInLine] = useState(0);

    const [typedChars, setTypedChars] = useState("");
    const [charStatuses, setCharStatuses] = useState({});

    const [timeLeft, setTimeLeft] = useState(60);
    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);

    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    const [historyCorrectChars, setHistoryCorrectChars] = useState(0);
    const [historyTypedCount, setHistoryTypedCount] = useState(0);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);

    const [textInputValue, setTextInputValue] = useState("");
    const [layoutInputValue, setLayoutInputValue] = useState(8);

    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const leaveTimeoutRef = useRef(null); // Quản lý thời gian chờ đóng 2s của bánh răng

    const setupNewTest = (specificText = null) => {
        let text = specificText;
        if (!text) {
            const randomIndex = Math.floor(Math.random() * customTexts.length);
            text = customTexts[randomIndex];
        }

        const allWords = text.split(/\s+/).filter(Boolean);
        const formattedLines = [];
        let currentLineWords = [];
        let lineCounter = 0;

        allWords.forEach((word, index) => {
            currentLineWords.push(word);
            if (currentLineWords.length === wordsPerLine || index === allWords.length - 1) {
                formattedLines.push({
                    lineIdx: lineCounter,
                    words: currentLineWords
                });
                currentLineWords = [];
                lineCounter++;
            }
        });

        setLines(formattedLines);
        setCurrentLineIndex(0);
        setCurrentWordIndexInLine(0);
        setTypedChars("");
        setCharStatuses({});

        setTimeLeft(60);
        setIsTestActive(false);
        setIsTestFinished(false);
        setWpm(0);
        setAccuracy(100);
        setHistoryCorrectChars(0);
        setHistoryTypedCount(0);

        if (inputRef.current) inputRef.current.value = "";
        clearInterval(timerRef.current);
        setTimeout(() => focusInput(), 50);
    };

    useEffect(() => {
        setupNewTest();
        return () => {
            clearInterval(timerRef.current);
            if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        };
    }, [customTexts, wordsPerLine]);

    useEffect(() => {
        if (isTestActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setIsTestActive(false);
                        setIsTestFinished(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [isTestActive, timeLeft]);

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
            const timeElapsed = (60 - timeLeft) / 60;
            const calculatedWpm = timeElapsed > 0 ? Math.round((totalCorrect / 5) / timeElapsed) : 0;
            const calculatedAcc = Math.round((totalCorrect / totalTyped) * 100);

            setWpm(calculatedWpm);
            setAccuracy(calculatedAcc);
        }
    }, [typedChars, timeLeft, historyCorrectChars, historyTypedCount, isTestActive]);

    const handleKeyDown = (e) => {
        if (isTestFinished || lines.length === 0) return;

        if (e.key === " " || e.keyCode === 32) {
            e.preventDefault();

            const currentLine = lines[currentLineIndex];
            const targetWord = currentLine.words[currentWordIndexInLine];
            const currentRawValue = inputRef.current.value;

            // Đã xóa bỏ điều kiện chặn độ dài ô nhập để Space luôn kích hoạt nhảy từ

            if (!isTestActive) {
                setIsTestActive(true);
            }

            let correctInWord = 0;
            const newStatuses = { ...charStatuses };

            targetWord.split("").forEach((char, charIdx) => {
                const statusKey = `${currentLineIndex}-${currentWordIndexInLine}-${charIdx}`;

                if (charIdx < currentRawValue.length) {
                    const isCharCorrect = currentRawValue[charIdx] === char;
                    newStatuses[statusKey] = isCharCorrect ? "correct" : "wrong";
                    if (isCharCorrect) correctInWord++;
                } else {
                    newStatuses[statusKey] = "wrong";
                }
            });

            const typedLength = Math.max(currentRawValue.length, targetWord.length);

            setHistoryCorrectChars((prev) => prev + correctInWord);
            setHistoryTypedCount((prev) => prev + typedLength);
            setCharStatuses(newStatuses);

            if (currentWordIndexInLine + 1 < currentLine.words.length) {
                setCurrentWordIndexInLine((prev) => prev + 1);
                setTypedChars("");
                inputRef.current.value = "";
            } else {
                if (currentLineIndex + 1 < lines.length) {
                    setCurrentLineIndex((prev) => prev + 1);
                    setCurrentWordIndexInLine(0);
                    setTypedChars("");
                    inputRef.current.value = "";
                } else {
                    clearInterval(timerRef.current);
                    setIsTestActive(false);
                    setIsTestFinished(true);
                    setTypedChars("");
                    inputRef.current.value = "";
                }
            }
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (isTestFinished) return;

        if (!isTestActive && value.length > 0) {
            setIsTestActive(true);
        }

        setTypedChars(value);
    };

    const focusInput = () => {
        if (inputRef.current && !isTestFinished && !isTextModalOpen && !isLayoutModalOpen) {
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

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#323437', color: '#d1d0c5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', padding: '24px', position: 'relative' }}>

            {/* KHU VỰC CÀI ĐẶT (GÓC PHẢI TRÊN CÙNG) */}
            <div
                style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 50 }}
                onMouseEnter={() => {
                    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                    setIsDropdownOpen(true);
                }}
                onMouseLeave={() => {
                    leaveTimeoutRef.current = setTimeout(() => {
                        setIsDropdownOpen(false);
                    }, 2000);
                }}
            >
                {/* NÚT BÁNH RĂNG */}
                <button
                    title="Cài đặt luyện gõ"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDropdownOpen ? '#e2b714' : '#646669', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s, transform 0.3s ease', transform: isDropdownOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>

                {/* MENU DROPDOWN CHỨA 2 TÙY CHỌN */}
                {isDropdownOpen && (
                    <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#2c2e31', border: '1px solid #444649', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)', marginTop: '4px' }}>
                        <button
                            onClick={() => { setIsTextModalOpen(true); setIsDropdownOpen(false); }}
                            style={{ backgroundColor: 'transparent', color: '#d1d0c5', border: 'none', padding: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.2s', fontSize: '16px', fontFamily: 'monospace' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#323437'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            📝 Thay đổi đoạn văn
                        </button>
                        <button
                            onClick={() => { setIsLayoutModalOpen(true); setIsDropdownOpen(false); }}
                            style={{ backgroundColor: 'transparent', color: '#d1d0c5', border: 'none', padding: '12px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', transition: 'background 0.2s', fontSize: '16px', fontFamily: 'monospace' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#323437'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            ⚙️ Số từ mỗi dòng
                        </button>
                    </div>
                )}
            </div>

            <div style={{ maxWidth: '896px', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Chỉ số thông tin */}
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2c2e31', padding: '16px', borderRadius: '12px', border: '1px solid #444649', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#646669' }}>Thời gian:</span>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e2b714' }}>{timeLeft}s</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#646669', margin: 0 }}>Tốc độ (WPM)</p>
                            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#e2b714', margin: 0 }}>{wpm}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', color: '#646669', margin: 0 }}>Độ chính xác</p>
                            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#e2b714', margin: 0 }}>{accuracy}%</p>
                        </div>
                    </div>
                </div>

                {/* KHUNG CHỨA VĂN BẢN */}
                <div
                    onClick={focusInput}
                    style={{ backgroundColor: '#2c2e31', padding: '32px', borderRadius: '16px', border: '1px solid #444649', cursor: 'text', height: '170px', fontSize: '24px', userSelect: 'none', lineHeight: '1.8', overflow: 'hidden', position: 'relative', boxSizing: 'border-box' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            transform: `translateY(-${currentLineIndex * 49.2}px)`,
                            transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                    >
                        {lines.map((line) => {
                            const lIdx = line.lineIdx;
                            const isCurrentLine = lIdx === currentLineIndex;
                            const hasBeenTypedLine = lIdx < currentLineIndex;

                            return (
                                <div
                                    key={lIdx}
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        rowGap: '4px',
                                        columnGap: '16px',
                                        height: '33.2px',
                                        opacity: hasBeenTypedLine ? 0 : 1,
                                        transition: 'opacity 0.3s ease'
                                    }}
                                >
                                    {line.words.map((word, wIdx) => {
                                        const isCurrentWord = isCurrentLine && (wIdx === currentWordIndexInLine);
                                        const hasBeenTypedWord = hasBeenTypedLine || (isCurrentLine && wIdx < currentWordIndexInLine);

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
                        placeholder="Bắt đầu gõ tại đây..."
                        style={{ width: '100%', backgroundColor: '#2c2e31', color: '#fff', border: '2px solid #444649', borderRadius: '12px', padding: '16px 20px', fontSize: '20px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease' }}
                        onFocus={(e) => e.target.style.borderColor = '#e2b714'}
                        onBlur={(e) => e.target.style.borderColor = '#444649'}
                        autoFocus
                    />
                </div>

                {/* Nút Làm mới */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setupNewTest()} style={{ backgroundColor: '#e2b714', color: '#2c2e31', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                        <span>Làm mới bài tập</span>
                    </button>
                </div>

                {/* Màn hình kết quả */}
                {isTestFinished && (
                    <div style={{ backgroundColor: '#e2b714', color: '#2c2e31', padding: '24px', borderRadius: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>🎉 Hoàn thành kiểm tra!</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold' }}>
                            <p style={{ margin: 0 }}>Tốc độ: {wpm} WPM</p>
                            <p style={{ margin: 0 }}>Độ chính xác: {accuracy}%</p>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL 1: THAY ĐỔI ĐOẠN VĂN BẢN */}
            {isTextModalOpen && (
                <div
                    onClick={() => setIsTextModalOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: '#2c2e31', border: '2px solid #444649', borderRadius: '16px', padding: '24px', maxWidth: '600px', width: '90%', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '20px', color: '#e2b714' }}>Tùy chỉnh văn bản luyện gõ</h3>
                            <button onClick={() => setIsTextModalOpen(false)} style={{ background: 'none', border: 'none', color: '#646669', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#646669', lineHeight: '1.4' }}>
                            Bạn có thể dán bài báo, lời bài hát hoặc code vào đây. Hệ thống sẽ tự động bẻ dòng theo số từ bạn đã cấu hình.
                        </p>
                        <textarea
                            rows="6"
                            value={textInputValue}
                            onChange={(e) => setTextInputValue(e.target.value)}
                            placeholder="Nhập đoạn văn bản của bạn tại đây..."
                            style={{ width: '100%', backgroundColor: '#323437', color: '#fff', border: '1px solid #444649', borderRadius: '8px', padding: '12px', fontSize: '16px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setIsTextModalOpen(false)} style={{ backgroundColor: '#323437', color: '#646669', border: '1px solid #444649', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Hủy</button>
                            <button onClick={handleSaveCustomText} style={{ backgroundColor: '#e2b714', color: '#2c2e31', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Lưu & Luyện tập</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: CẤU HÌNH SỐ TỪ MỖI DÒNG */}
            {isLayoutModalOpen && (
                <div
                    onClick={() => setIsLayoutModalOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ backgroundColor: '#2c2e31', border: '2px solid #444649', borderRadius: '16px', padding: '24px', maxWidth: '400px', width: '90%', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '20px', color: '#e2b714' }}>Cài đặt hiển thị</h3>
                            <button onClick={() => setIsLayoutModalOpen(false)} style={{ background: 'none', border: 'none', color: '#646669', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#646669', lineHeight: '1.4' }}>
                            Xác định độ dài của mỗi dòng. Nên đặt từ <strong>5 đến 12 từ</strong> để tránh việc chữ bị tràn ra khỏi màn hình.
                        </p>
                        <input
                            type="number"
                            min="3"
                            max="15"
                            value={layoutInputValue}
                            onChange={(e) => setLayoutInputValue(e.target.value)}
                            style={{ width: '100%', backgroundColor: '#323437', color: '#fff', border: '1px solid #444649', borderRadius: '8px', padding: '12px', fontSize: '16px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setIsLayoutModalOpen(false)} style={{ backgroundColor: '#323437', color: '#646669', border: '1px solid #444649', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Hủy</button>
                            <button onClick={handleSaveLayout} style={{ backgroundColor: '#e2b714', color: '#2c2e31', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Lưu cấu hình</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}