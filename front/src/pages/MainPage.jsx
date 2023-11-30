import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>MAP</div>
      <div>FOLDER</div>
      <button onClick={() => navigate("/map")}>MapPage</button>
      <button onClick={() => navigate("/main/detail")}>MainDetialPage</button>
    </div>
  );
};

export default MainPage;
