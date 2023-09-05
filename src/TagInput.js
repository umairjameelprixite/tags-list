import React, { useState, useEffect, useRef } from "react";

function TagInput({ suggestions }) {
  const [content, setContent] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [showSuggestions]);

  const handleInput = (e) => {
    const suggestionsList = suggestions.filter((sug) =>
      sug.includes(currentText)
    );

    if (e.key === "Backspace" && currentText === "") {
      e.preventDefault();
      setContent((prev) => {
        if (prev.length > 0) {
          const lastItem = prev[prev.length - 1];
          if (lastItem.type === "text") {
            return prev.slice(0, -1);
          } else {
            setCurrentText(lastItem.value);
            return prev.slice(0, -1);
          }
        }
        return prev;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, suggestionsList.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (suggestionsList.includes(currentText)) {
        setContent((prev) => [...prev, { type: "tag", value: currentText }]);
        setCurrentText("");
        setShowSuggestions(false);
      } else if (highlightedIndex >= 0) {
        setContent((prev) => [
          ...prev,
          { type: "tag", value: suggestionsList[highlightedIndex] },
        ]);
        setCurrentText("");
        setShowSuggestions(false);
      } else if (currentText !== "") {
        setContent([...content, { type: "text", value: currentText }]);
        setCurrentText("");
        setShowSuggestions(false);
      }
    }
  };

  const handleChange = (e) => {
    setCurrentText(e.target.value);
    if (e.target.value === "") {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleDelete = (index) => {
    setContent(content.filter((_, idx) => idx !== index));
  };

  const handleSuggestionClick = (suggestion, index) => {
    setCurrentText(suggestion);
    setHighlightedIndex(index);
    setShowSuggestions(false);
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        alignItems: "center",
        position: "relative",
      }}
    >
      {content.map((item, index) =>
        item.type === "tag" ? (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f1f1f1",
              borderRadius: "4px",
              padding: "5px",
              margin: "0 5px",
            }}
          >
            {item.value}
            <button
              style={{
                marginLeft: "5px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0 5px",
                fontSize: "0.8em",
              }}
              onClick={() => handleDelete(index)}
            >
              [x]
            </button>
          </div>
        ) : (
          <span key={index} style={{ margin: "0 5px" }}>
            {item.value}
          </span>
        )
      )}
      <input
        type="text"
        value={currentText}
        onChange={handleChange}
        onKeyDown={handleInput}
        style={{
          border: "none",
          outline: "none",
          padding: "5px",
          fontSize: "1em",
          width: "500px",
        }}
        ref={inputRef}
      />
      {showSuggestions && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {suggestions
            .filter((sug) => sug.includes(currentText))
            .map((suggestion, idx) => (
              <div
                key={idx}
                style={{
                  padding: "5px",
                  backgroundColor:
                    idx === highlightedIndex ? "#e0e0e0" : "#fff",
                }}
                onClick={() => handleSuggestionClick(suggestion, idx)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
