import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="🔍 Search by name, department, course..."
        className="search-input"
      />
      {input && (
        <button
          onClick={() => {
            setInput("");
            onSearch("");
          }}
          className="clear-btn"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
