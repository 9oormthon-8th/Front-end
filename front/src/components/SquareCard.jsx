import React from "react";
import styled from "styled-components";

const SquareCard = () => {
  return (
    <StyledCard>
      <StyledTitle>구름톤</StyledTitle>
      <StyledContent>2023.11.20 - 11.30</StyledContent>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 16px;
  background: #fff;
`;

const StyledTitle = styled.text`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledContent = styled.text`
  color: #b5b5b5;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default SquareCard;
