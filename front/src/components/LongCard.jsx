import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function LongCard({ item }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate("/variation/detail", { state: item.id })}>
      <Title>
        <div>성산</div>
        <div>{item.date}</div>
      </Title>
      <Title1>{item.date}</Title1>
      <Desc>{item.dairyContent}</Desc>
      <Tags>
        {item.keyword.split(",").map((i, idx) => (
          <Tag>{i}</Tag>
        ))}
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

  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 3px;
`;
