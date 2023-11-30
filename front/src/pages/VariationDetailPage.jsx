import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../components/ArrowBack";
import { styled, css } from "styled-components";

const VariationDetailPage = () => {
  const [dairyDetail, setDairyDetail] = useState([]);
  const { state } = useLocation();

  const getDairyDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.sopt-demo.p-e.kr/dairy/detail/${state}`,
        {
          // body
        },
        {
          // header
          "Content-Type": "application/json",
        }
      );
      setDairyDetail({
        location: response.data.data.location,
        roadAddress: response.data.data.roadAddress,
        date: response.data.data.date,
        keyword: response.data.data.keyword,
        dairyContent: response.data.data.dairyContent,
      });
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  useEffect(() => {
    getDairyDetail();
  }, []);

  console.log(dairyDetail.dairyContent);

  return (
    <div>
      <Wrapper>
        <ArrowBack title="" />
        <Content>
          <Title>성산</Title>
          <SubTitle>{dairyDetail.location}</SubTitle>
          <Address>{dairyDetail.roadAddress}</Address>
          <Calendar>{dairyDetail.date}</Calendar>

          <Desc>{dairyDetail.dairyContent}</Desc>
          <Tags>
            {dairyDetail.keyword?.split(",").map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </Tags>
        </Content>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div``;

const Content = styled.div`
  width: 95%;

  margin: 0 auto;
`;

const Title = styled.div`
  color: #000;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 40px;
`;

const SubTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 12px;
`;

const Address = styled.div`
  overflow: hidden;
  color: #979797;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 11px;
`;

const Desc = styled.div`
  color: #6b6b6b;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;

  margin-top: 32px;
`;

const Weather = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 43px;
`;

const Calendar = styled.div`
  color: #b5b5b5;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const KeyWord = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 27px;
`;

const Tags = styled.div`
  display: flex;

  gap: 6px;

  margin-top: 12px;
`;

const Tag = styled.div`
  width: 65px;
  height: 30px;

  border-radius: 16px;
  border: 1px solid #ffdc26;
  background: #fff8b6;

  color: #ffa800;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Plus = styled.button`
  width: 68px;
  height: 30px;

  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background: #f2f2f2;

  color: #979797;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  border: none;
`;

export default VariationDetailPage;
