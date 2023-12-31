import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SquareCard = ({ props, title, date }) => {
  const navigate = useNavigate();
  return (
    <StyledCard onClick={() => navigate("/detail")}>
      <Img src={props}></Img>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{date}</StyledContent>
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
