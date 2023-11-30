import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Arrow from "../assets/icons/arrow_back.svg";

const ArrowBack = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <img src={Arrow} />
      </BackButton>
      <StyledText>{title}</StyledText>
    </Container>
  );
};

const BackButton = styled.div`
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText = styled.text`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default ArrowBack;
