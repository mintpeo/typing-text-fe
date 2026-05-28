import React, {useEffect, useState} from 'react';
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

const Home = () => {
    const [targetText, setTargetText] = useState("Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích. Java là một ngôn ngữ lập trình hướng đối hữu ích.");
    const [typedText, setTypedText] = useState("");

    // const countedText = countText(targetText);
    const [targetTextSpilt, setTargetTextSpilt] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [checkedText, setCheckedText] = useState("");

    const [correctNumber, setCorrectNumber] = useState(0);
    const [wrongNumber, setWrongNumber] = useState(0);

    const [accuracy, setAccuracy] = useState(100); // ki tu
    const [wpn, setWPN] = useState(0);
    const [time, setTime] = useState(60);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const arr = targetText.split(" ");
        setTargetTextSpilt(arr);
    }, [targetText]);

    // useEffect(() => {
    //     if (currentIndex >= targetTextSpilt.length) alert("OK");
    // }, [currentIndex]);

    // console.log(targetTextSpilt[currentIndex]);
    console.log(targetTextSpilt)

    // Handle wrap
    const handleWrap = (e) => {
        if (e.key === "Enter" || e.key === "Tab") e.preventDefault();
    }

    // Edit text
    const handleSave = () => {
        setTargetText(editText.trim());
        setIsOpenModal(false);

        // Reset text
        setTypedText("");
        setCurrentIndex(0);
        setCorrectNumber(0);
        setWrongNumber(0);
    }

    // char
    const checkTyping = (targetText, typedText) => {
        let status= "none";
        for (let i = 0; i < targetText.length; i++) {
             status = "none";

            if (typedText[i] === targetText[i]) {
                status = "correct";
                // setCorrectNumber(correctNumber + 1);
            } else {
                status = "wrong";
                // setWrongNumber(wrongNumber + 1);
            }
        }
        setCheckedText(status);
    }

    // String
    const checkString = (targetText, typedText) => {
        const typed = typedText.trim();
        if (targetText === typed) setCorrectNumber(correctNumber + 1);
        else {
            setWrongNumber(wrongNumber + 1);
            // setAccuracy()
        }
    }

    const handleText = (e) => {
        const value = e.target.value;
        setTypedText(value);
        if (value.endsWith(" ") || e.key === "Enter") { // space
            e.preventDefault();
            checkString(targetTextSpilt[currentIndex], value);
            setCurrentIndex(currentIndex + 1);
            return setTypedText("");
        } else {
            // checkTyping(targetTextSpilt[currentIndex], value);
        }
    }

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
                        <i className="setting icon">
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
                                                    className="cancel-btn"
                                                    onClick={() => setIsOpenModal(false)}>Cancel</button>

                                                <button
                                                    className="save-btn"
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
                                    <h3>{time} <span>/ {time}s</span></h3>
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
                    <div className="paragraph">
                        <ul className="list-pars flex">
                            {targetTextSpilt.map((item, index) => (
                                <li className="item-par">
                                    <h2 className={index === currentIndex? "active" : ""}>{item}</h2>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Input Paragraphs */}
                    <div className="input-paragraph">
                        <textarea
                            className="typing-input"
                            value={typedText}
                            onChange={e => handleText(e)}
                            onKeyDown={e => handleText(e)}
                            placeholder="Start typing..."
                        />
                    </div>

                    {/* Key board */}
                    <div className="key-board"></div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <span style={{color: "#fff"}}>
                        {checkedText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;