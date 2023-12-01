import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function LongCard({ item }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate("/variation/detail", { state: item.id })}>
      <Title1>{item.location}</Title1>
      <Desc>{item.dairyContent}</Desc>
      <Date>{item.date}</Date>
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
  min-height: 169px;

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
  display: flex;
  flex-direction: column;

  width: 337px;

  margin: 0 auto;

  margin-top: 20px;

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

  overflow: hidden;
  color: #979797;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 12px;
`;
const Tags = styled.div`
  width: 337px;

  margin: 0 auto;

  display: flex;
  gap: 10px;

  margin-top: 20px;
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
  padding-top: 7px;
`;
const Date = styled.div`
  width: 337px;

  margin: 0 auto;

  color: #979797;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 3px;
  margin-bottom: 5px;
`;
