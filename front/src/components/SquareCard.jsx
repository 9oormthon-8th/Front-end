import React from "react";
import styled from "styled-components";
import picture from "../assets/picture.svg";

const SquareCard = () => {
  return (
    <StyledCard>
      <Img src={picture}></Img>
      <StyledTitle>구름톤</StyledTitle>
      <StyledContent>2023.11.20 - 11.30</StyledContent>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 16px;
  background: #fff;

  width: 48%;
  height: 190px;

  margin-bottom: 10px; /* 세로 간격 조절 */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Img = styled.img`
  width: 142px;
  height: 98px;
  object-fit: cover;

  margin-top: 20px;
`;

const StyledTitle = styled.text`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  width: 142px;

  margin-top: 3p x;
`;

const StyledContent = styled.text`
  color: #b5b5b5;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  width: 142px;
`;

export default SquareCard;
