import React from "react";
import { useLocation } from "react-router-dom";

const VariationDetailPage = () => {
  const { state } = useLocation();
  return (
    <div>
      <div>{state}</div>
    </div>
  );
};

export default VariationDetailPage;
