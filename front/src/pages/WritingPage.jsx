import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import DaumPostcodeEmbed from "react-daum-postcode";
import ArrowBack from "../components/ArrowBack";
import styled from "styled-components";
import PlusIcon from "../assets/icons/plus.svg";
import Search from "../assets/icons/search.svg";
import CircularProgress from "@mui/material/CircularProgress";

export default function WritingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  // 장소, 위치
  const [latitudeValue, setLatitudeValue] = useState(
    state.curLocation.latitude
  );
  const [longitudeValue, setLongitudeValue] = useState(
    state.curLocation.longitude
  );
  const [addressValue, setAddressValue] = useState(state.address);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [keywordArray, setKeywordArray] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  const [keyword, setKeyword] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleKeyword = (e) => {
    setKeywordInput(e.target.value);
    console.log(e.target.value);
  };

  const addKeyword = () => {
    if (keywordInput !== "") {
      keywordArray.push(keywordInput);
    }
    setKeywordInput("");
    console.log(keywordArray);
  };

  const deleteKeyword = (i) => {
    console.log("deleteKeyword");
    let tmp = keywordArray.filter((element, idx) => {
      return idx !== i;
    });
    setKeywordArray(tmp);
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/dairy`,
        {
          latitude: latitudeValue,
          longitude: longitudeValue,
          location: title,
          keyword: keywordArray.join(","),
          date: date,
          roadAddress: addressValue,
        },
        {
          "Content-Type": "application/json",
        }
      );
      setIsLoading(false);
      console.log(response.data.data);
      navigate("/variation", { state: response.data.data });
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred while fetching data: ", error);
    }
  };

  console.log(date);

  return (
    <div>
      {isLoading && (
        <LoadingOverlay>
          <CircularProgress color="inherit" />
        </LoadingOverlay>
      )}

      <ArrowBack title="글쓰기" />
      <Wrapper>
        <StyledText>장소</StyledText>

        <StyledInput
          type="text"
          onChange={handleTitle}
          placeholder="성산일출봉"
        />

        <StyledText>주소</StyledText>

        <InputWithIcon>
          <StyledInput type="text" value={addressValue} />
          <Img src={Search} alt="" />
        </InputWithIcon>

        {/* 
        {isModalOpen && (
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            animation={true}
            autoClose={false}
          />
        )} */}

        <StyledText>날짜</StyledText>
        <StyledInput
          type="text"
          onChange={handleDate}
          placeholder="2023.12.01"
        />

        <StyledText>키워드</StyledText>
        <InputWithIcon>
          <StyledInput
            type="text"
            onChange={handleKeyword}
            placeholder="즐거움"
            value={keywordInput}
          />
          <Img src={PlusIcon} alt="" onClick={() => addKeyword()} />
        </InputWithIcon>
        <Tags>
          {keywordArray.map((keyword, idx) => (
            <Tag>
              <div>{keyword}</div>
              <div onClick={() => deleteKeyword(idx)}>x</div>
            </Tag>
          ))}
        </Tags>

        <StyledButton>
          <StyledTypo onClick={() => postNewChallenge()}>변환하기</StyledTypo>
        </StyledButton>
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Img = styled.img`
  position: absolute;
  right: 5px;
`;
const StyledText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  width: 100%; // 필요한 경우 너비 조정
  text-align: center; // 텍스트 중앙 정렬
`;

const StyledTypo = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid #b5b5b5;
  width: 100%; // 너비 조정
  height: 30px;
  ::placeholder {
    color: #999; // 플레이스홀더 텍스트 색상 변경
    font-family: Pretendard;
    font-weight: 700;
    font-size: 16px; // 글꼴 크기 변경
  }
`;

const StyledButton = styled.button`
  border-radius: 4px;
  background: #00d67c;
  border: none;
  width: 100%; // 너비 조정
  height: 30px;
  color: white;
`;

const LoadingOverlay = styled.div`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  z-index: 1000; /* 다른 요소들 위에 표시 */
`;

const Tags = styled.div`
  display: flex;

  gap: 6px;

  margin-top: 6px;
`;

const Tag = styled.div`
  min-width: 65px;
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

  gap: 4px;
  padding: 3px;
  div:nth-child(1) {
    min-width: 45px;

    white-space: nowrap; /* 텍스트가 한 줄로만 나오도록 설정합니다. */
    overflow: hidden; /* 내용이 넘칠 경우 자르고 숨깁니다. */
    text-overflow: ellipsis;
  }

  div:nth-child(2) {
    cursor: pointer;
  }
`;
