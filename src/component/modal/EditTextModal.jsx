import { useState } from "react";
import "./EditTextModal.scss";

const EditTextModal = ({isOpen, setIsOpen, targetText, setTargetText, resetTyping}) => {
    const [editText, setEditText] = useState(targetText);

    const handleSave = () => {
        setTargetText(editText);
        resetTyping();
        setIsOpen(false);
    }

    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Edit target text</h2>
                <textarea
                    className="modal-textarea"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <div className="modal-actions">
                    <button
                        className="cancel-btn"
                        onClick={() => setIsOpen(false)}>Cancel</button>

                    <button
                        className="save-btn"
                        onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditTextModal;