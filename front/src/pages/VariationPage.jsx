import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import TextArea from "../components/TextArea";
import axios from "axios";
import ArrowBack from "../components/ArrowBack";
import ArrowRotate from "../assets/icons/arrow-rotate.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VariationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [dairyDetail, setDairyDetail] = useState({
    location: state.location,
    roadAddress: state.roadAddress,
    date: state.date,
    keyword: state.keyword,
    dairyContent: state.dairyContent,
  });

  const patchDairyDetail = async () => {
    try {
      const response = await axios.patch(
        `https://www.sopt-demo.p-e.kr/dairy/${state.id}`,
        {
          // body
          dairyContent: dairyDetail.dairyContent,
        },
        {
          // header
          "Content-Type": "application/json",
        }
      );
      navigate("/variation/detail", { state: state.id });
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  // const getDairyDetail = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://www.sopt-demo.p-e.kr/dairy/detail/4`,
  //       {
  //         // body
  //       },
  //       {
  //         // header
  //         "Content-Type": "application/json",
  //       }
  //     );
  //     console.log("getDairyDetail", response.data.data);
  //     setDairyDetail({
  //       location: response.data.data.location,
  //       roadAddress: response.data.data.roadAddress,
  //       date: response.data.data.date,
  //       keyword: response.data.data.keyword,
  //       dairyContent: response.data.data.dairyContent,
  //     });
  //   } catch (error) {
  //     console.error("An error occurred while fetching data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   getDairyDetail();
  // }, []);

  const changeContent = (event) => {
    // dairyDetail 복사
    const updatedDairyDetail = { ...dairyDetail };

    // dairyContent만 업데이트
    updatedDairyDetail.dairyContent = event.target.value;

    // setDairyDetail로 업데이트
    setDairyDetail(updatedDairyDetail);
  };

  return (
    <Wrapper>
      <ArrowBack title="글쓰기" />
      <Content>
        <Title>성산</Title>
        <SubTitle>{dairyDetail.location}</SubTitle>
        <Desc>{dairyDetail.roadAddress}</Desc>
        <Weather>날짜</Weather>
        <Calendar>{dairyDetail.date}</Calendar>

        <KeyWord>키워드</KeyWord>
        <Tags>
          {dairyDetail.keyword.split(",").map((tag) => (
            <Tag>{tag}</Tag>
          ))}
          <Plus>추가 +</Plus>
        </Tags>

        <KeyWord>내용</KeyWord>
        <TextArea value={dairyDetail.dairyContent} onChange={changeContent} />

        <BtnGroup>
          <Btn1>
            <ImgR src={ArrowRotate} />
          </Btn1>
          <Btn2 onClick={() => patchDairyDetail()}>등록하기</Btn2>
        </BtnGroup>
      </Content>
    </Wrapper>
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

const Desc = styled.div`
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
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  margin-top: 10px;
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

  margin-top: 6px;
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

const ImgR = styled.img``;
const Btn1 = styled.button`
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background-color: #ffffff;

  width: 54px;
  height: 54px;
`;

const Btn2 = styled.button`
  border-radius: 4px;
  background: #00d67c;

  width: 323px;
  height: 54px;

  border: none;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BtnGroup = styled.div`
  margin-top: 44px;

  display: flex;
  align-items: center;

  gap: 13px;
`;
export default VariationPage;
