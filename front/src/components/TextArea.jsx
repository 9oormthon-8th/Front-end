import React from "react";

const TextArea = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <textarea value={value} onChange={onChange} />
    </div>
  );
};

export default TextArea;
