import React from "react";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import { useNavigate } from "react-router-dom";

export default function WritingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button>뒤로 가기</button>
      <dib>글 쓰기</dib>
      <div>장소</div>
      <TextInput />
      <div>날짜</div>
      <TextInput />
      <div>키워드</div>
      <TextArea />
      <button onClick={() => navigate("/variation")}>변환 하기</button>
    </div>
  );
}
