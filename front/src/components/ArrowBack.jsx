import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Arrow from "../assets/icons/arrow_back.svg";

const ArrowBack = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <img src={Arrow} alt="arrow" />
      </BackButton>
      <StyledText>{title}</StyledText>
    </Container>
  );
};

const BackButton = styled.div`
  padding-top: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #f2f2f2;
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
