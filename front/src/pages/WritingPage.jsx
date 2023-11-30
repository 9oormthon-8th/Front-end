import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import DaumPostcodeEmbed from "react-daum-postcode";
import ArrowBack from "../components/ArrowBack";
import styled from "styled-components";
import PlusIcon from "../assets/icons/plus.svg";
import Search from "../assets/icons/search.svg";

export default function WritingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state.address);
  console.log(state.curLocation.latitude);
  console.log(state.curLocation.longitude);

  // 장소, 위치
  const [latitudeValue, setLatitudeValue] = useState(
    state.curLocation.latitude
  );
  const [longitudeValue, setLongitudeValue] = useState(
    state.curLocation.longitude
  );
  const [addressValue, setAddressValue] = useState(state.address);
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  // 주소 검색 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchAddress = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
    setAddressValue(fullAddress);
  };

  // const getNewPosition = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://dapi.kakao.com/v2/local/search/address.${addressValue}`,
  //       {},
  //        headers: {
  //   'Content-Type': 'application/json;charset=utf-8',
  //   Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  // },
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("An error occurred while fetching data: ", error);
  //   }
  // };

  // useEffect (주소가 바뀌면 위경도 갱신)
  useEffect(() => {
    // getNewPosition();
  }, [addressValue]);

  const postNewChallenge = async () => {
    try {
      const response = await axios.post(
        `https://www.sopt-demo.p-e.kr/dairy`,
        {
          latitude: latitudeValue,
          longitude: longitudeValue,
          location: title,
          keyword: "추위, 바람, 즐거움",
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("An error occurred while fetching data: ", error);
    }
  };

  return (
    <div>
      <ArrowBack title="글쓰기" />

      <Wrapper>
        <StyledText>장소</StyledText>

        <StyledInput
          type="text"
          onChange={handleTitle}
          placeholder="성산일출봉"
        />

        <StyledText>주소</StyledText>
        <StyledInput type="text" value={addressValue} />
        <InputWithIcon>
          <img src={Search} alt="" />
        </InputWithIcon>

        {isModalOpen && (
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            animation={true}
            autoClose={false}
          />
        )}

        <StyledText>날짜</StyledText>
        <StyledInput
          type="text"
          onChange={handleDate}
          placeholder="2023.12.01"
        />

        <StyledText>키워드</StyledText>

        <StyledInput type="text" onChange={handleDate} placeholder="즐거움" />
        <InputWithIcon onClick={() => postNewChallenge()}>
          <img src={PlusIcon} alt="" />
        </InputWithIcon>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 10px;
`;

const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  width: 80%; // 필요한 경우 너비 조정
  text-align: center; // 텍스트 중앙 정렬
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid #b5b5b5;
  width: 80%;
  height: 30px;
  display: flex;
  justify-content: center; // 가로축에서 중앙 정렬
`;
