import {useEffect, useState} from 'react';
import './Home.scss'
// import {checkTyping, countText} from "../../utils/typingUtils.js";

// Icons
import { FaKeyboard } from "react-icons/fa";
import { FiMoon } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { GoCheckCircle } from "react-icons/go";
import { GoXCircle } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { RiResetRightLine } from "react-icons/ri";

const Home = () => {
    const [targetText, setTargetText] = useState("Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích.");
    const [typedText, setTypedText] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctNumber, setCorrectNumber] = useState(0);
    const [wrongNumber, setWrongNumber] = useState(0);

    const [accuracy, setAccuracy] = useState(100); // ki tu
    const [wpn, setWPN] = useState(0);
    const [time, setTime] = useState(60);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editText, setEditText] = useState(targetText);

    const [isStart, setIsStart] = useState(false);

    const [wordStatus, setWordStatus] = useState([]); // Word staus

    // Handle time
    useEffect(() => {
        if (!isStart) return;

        const handleTime = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(handleTime);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);

        return () => clearInterval(handleTime);
    }, [isStart]);

    // Handle wrap
    const handleWrap = (e) => {
        if (e.key === "Enter" || e.key === "Tab") e.preventDefault();
    }

    // Save edit text / Reset
    const handleSave = () => {
        setTargetText(editText.trim());
        setIsOpenModal(false);

        // Reset text
        setTypedText("");
        setCurrentIndex(0);
        setCorrectNumber(0);
        setWrongNumber(0);
        setTime(60);
        setIsStart(false);
        setWordStatus([]);
    }

    // Handle typing
    const handleTyping = (e) => {
        const value = e.target.value;
        const startIndex = currentIndex - typedText.length;
        const newStatus = [...wordStatus];

        // nếu user backspace
        if (value.length < typedText.length) {
            const removeIndex = currentIndex - 1;
            newStatus[removeIndex] = null;

            setTypedText(value);
            setWordStatus(newStatus);
            setCurrentIndex(prev => Math.max(prev - 1, 0));

            return;
        }

        // check lại toàn bộ chữ trong textarea hiện tại
        for (let i = 0; i < value.length; i++) {
            const targetChar = targetText[startIndex + i];
            newStatus[startIndex + i] = value[i] === targetChar; // check char
        }

        setTypedText(value);
        setWordStatus(newStatus);
        setCurrentIndex(startIndex + value.length);

        const correct = newStatus.filter(item => item === true).length;
        const wrong = newStatus.filter(item => item === false).length;

        setCorrectNumber(correct);
        setWrongNumber(wrong);
    };

    // Key down
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault();
            return;
        }

        if (e.key === " ") {
            e.preventDefault();
            const nextSpaceIndex = targetText.indexOf(" ", currentIndex); // tach chu thanh java la, currentIndex la lay vi tri cua chu do: java
            const currentWord = targetText.substring(currentIndex, nextSpaceIndex);

            if (nextSpaceIndex === -1) setCurrentIndex(targetText.length);
            else {
                setCurrentIndex(nextSpaceIndex + 1);
                if (typedText.length < currentWord.length) {
                    setWordStatus(prev => {
                        const copy = [...prev];
                        // chay ki tu de chuyen thanh false
                        for (let i = currentIndex; i < nextSpaceIndex; i++) if (copy[i] == null) copy[i] = false;
                        return copy;
                    })
                }
            }

            setTypedText("");
        }
    };

    return (
        <div id="home">
            <div className="container">
                {/* Header */}
                <div className="header flex">
                    {/* Side left */}
                    <div className="side-left flex">
                        <i className="icon"><FaKeyboard /></i>
                        <div className="text"><p>Luyện gõ phím</p></div>
                    </div>

                    {/* Side right */}
                    <div className="side-right flex">
                        <p>Chủ đề</p>
                        <i className="icon"><FiMoon /></i>
                        <div className="difficult flex">
                            <p>Cấp độ: Dễ</p>
                            <i className="icon"><IoIosArrowDown /></i>
                        </div>
                        <i className="setting">
                            <IoSettingsOutline />

                            <ul className="list-items-setting">
                                <li className="item-setting">
                                    <p onClick={() => setIsOpenModal(true)}>Edit text</p>
                                </li>
                            </ul>

                            {
                                isOpenModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-box">
                                            <h2>Edit target text</h2>
                                            <textarea
                                                className="modal-textarea"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                onKeyDown={(e) => handleWrap(e)}
                                            />
                                            <div className="modal-actions">
                                                <button
                                                    className="cancel-btn btn"
                                                    onClick={() => setIsOpenModal(false)}>Cancel</button>

                                                <button
                                                    className="save-btn btn"
                                                    onClick={handleSave}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </i>
                    </div>
                </div>

                {/* Body */}
                <div className="body">
                    {/* Info parameters */}
                    <div className="info-parameter">
                        <ul className="list-items flex">
                            {/* Time */}
                            <li className="item">
                                <i className="icon-main"><MdAccessTime /></i>
                                <div className="text">
                                    <p>Thời gian</p>
                                    <h3>{time} <span>/ 60s</span></h3>
                                </div>
                            </li>

                            {/* WPM */}
                            <li className="item">
                                <i className="icon-main" style={{color: "green"}}><IoSpeedometerOutline /></i>
                                <div className="text">
                                    <p>Tốc độ (WPM)</p>
                                    <h3>{wpn} <span>từ/phút</span></h3>
                                </div>
                            </li>

                            {/* Accuracy */}
                            <li className="item">
                                <i className="icon-main" style={{color: "blue"}}><TbTargetArrow /></i>
                                <div className="text">
                                    <p>Độ chính xác</p>
                                    <h3>{accuracy}% <span>đúng</span></h3>
                                </div>
                            </li>

                            {/* Correct Char */}
                            <li className="item">
                                <i className="icon-main" style={{color: "#d09827"}}><GoCheckCircle /></i>
                                <div className="text">
                                    <p>Từ đúng</p>
                                    <h3>{correctNumber}</h3>
                                </div>
                            </li>

                            {/* Wrong Char */}
                            <li className="item">
                                <i className="icon-main" style={{color: "#e1555a"}}><GoXCircle /></i>
                                <div className="text">
                                    <p>Từ sai</p>
                                    <h3>{wrongNumber}</h3>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Paragraphs */}
                    {/* Paragraphs */}
                    <div className="paragraph">
                        {(() => {
                            // Tách chuỗi thành các câu dựa vào dấu chấm và giữ lại dấu chấm
                            const sentences = targetText.split(/(?<=\.)/).filter(Boolean);

                            let charCounter = 0; // Biến phụ trợ để tính index tuyệt đối của ký tự

                            // Chỉ lấy tối đa 2 dòng (2 câu đầu tiên)
                            return sentences.slice(0, 2).map((sentence, sentenceIndex) => {
                                return (
                                    <ul key={sentenceIndex} className="list-pars flex" style={{ marginBottom: '10px' }}>
                                        {sentence.split("").map((char) => {
                                            const currentGlobalIndex = charCounter;
                                            charCounter++; // Tăng index lên sau mỗi ký tự

                                            return (
                                                <li key={currentGlobalIndex} className="item-par">
                                                    <h2
                                                        className={`
                                                            ${currentGlobalIndex === currentIndex ? "active" : ""}
                                                            ${wordStatus[currentGlobalIndex] === true ? "correct" :
                                                            wordStatus[currentGlobalIndex] === false ? "wrong" : ""}
                                                        `}
                                                    >
                                                        {char === " " ? "\u00A0" : char}
                                                    </h2>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            });
                        })()}
                    </div>

                    {/* Input Paragraphs */}
                    <div className="input-paragraph flex">
                        <textarea
                            className="typing-input"
                            value={typedText}
                            onChange={e => {handleTyping(e); setIsStart(true)}}
                            onKeyDown={handleKeyDown}
                            placeholder="Start typing..."
                        />

                        <button className="btn-start btn" onClick={handleSave}>
                            <i className="icon"><RiResetRightLine /></i>
                        </button>
                    </div>

                    {/* Key board */}
                    <div className="key-board"></div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <span style={{color: "#fff"}}>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;