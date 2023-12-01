import React from "react";
import { styled } from "styled-components";

const TextArea = ({ value, onChange }) => {
  return (
    <Wrapper>
      <textarea value={value} onChange={onChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;

  height: 194px;
  margin-top: 15px;

  textarea {
    width: 390px;
    height: 194px;
  }
`;
export default TextArea;
