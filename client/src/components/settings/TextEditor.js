import React, { useState } from 'react';
import './texteditor.css';

const TextEditor = ({ value, onChange, maxLength }) => {
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const [isStrike, setStrike] = useState(false);

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    onChange(inputValue);
  };

  const handleBoldClick = () => {
    setBold(!isBold);
  };

  const handleItalicClick = () => {
    setItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setUnderline(!isUnderline);
  };

  const handleStrikeClick = () => {
    setStrike(!isStrike);
  };

  return (
    <div className="text-editor-container">
      <div className="toolbar">
        <button onClick={handleBoldClick} className={isBold ? 'active' : ''}>
          B
        </button>
        <button onClick={handleItalicClick} className={isItalic ? 'active' : ''}>
          I
        </button>
        <button onClick={handleUnderlineClick} className={isUnderline ? 'active' : ''}>
          U
        </button>
        <button onClick={handleStrikeClick} className={isStrike ? 'active' : ''}>
          S
        </button>
      </div>
      <div className="bio-editor">
        <span className="characters-left">{maxLength ? maxLength - value.length : ''} characters left</span>
        <textarea
          className="editor"
          value={value}
          onChange={handleInputChange}
          style={{
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            textDecorationLine: isStrike ? 'line-through' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
