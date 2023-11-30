import React from "react";
import { styled } from "styled-components";

export default function LongCard() {
  return (
    <Card>
      <Title>
        <div>성산</div>
        <div>11:30</div>
      </Title>
      <Title1>성산 일출봉</Title1>
      <Desc>성산일출봉은 추워도, 바람이 세도 아름다운 풍경을 볼 수 있는</Desc>
      <Tags>
        <Tag>추위</Tag>
        <Tag>바람</Tag>
      </Tags>
    </Card>
  );
}

const Card = styled.div`
  width: 390px;
  height: 169px;

  border-radius: 16px;
  background: #fff;
`;

const Title = styled.div`
  width: 337px;
  display: flex;
  justify-content: space-between;

  margin: 0 auto;

  margin-top: 24px;

  div:nth-child(1) {
    color: #000;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  div:nth-child(2) {
    color: #b9b9b9;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Title1 = styled.div`
  width: 337px;

  margin: 0 auto;

  margin-top: 3px;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Desc = styled.div`
  width: 337px;

  margin: 0 auto;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  margin-bottom: 25px;

  overflow: hidden;
  color: #979797;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 6px;
`;
const Tags = styled.div`
  width: 337px;

  margin: 0 auto;

  display: flex;
  gap: 10px;

  margin-bottom: 23px;
`;
const Tag = styled.div`
  width: 63px;
  height: 26px;
  border-radius: 16px;
  border: 1px solid rgba(255, 220, 38, 0.8);
  background: #fff8b6;

  text-align: center;

  color: #ffa800;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;
