import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import DaumPostcodeEmbed from "react-daum-postcode";
import ArrowBack from "../components/ArrowBack";

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
      <ArrowBack />
      <dib>글 쓰기</dib>
      <div>장소</div>
      <input type="text" onChange={handleTitle} />
      <div>주소</div>
      <input type="text" value={addressValue} />
      <button onClick={searchAddress}>검색</button>
      {isModalOpen && (
        <DaumPostcodeEmbed
          onComplete={handleComplete}
          animation={true}
          autoClose={false}
        />
      )}
      <div>날짜</div>
      <input type="text" onChange={handleDate} />
      <div>키워드</div>
      <button onClick={() => postNewChallenge()}>변환 하기</button>
    </div>
  );
}
