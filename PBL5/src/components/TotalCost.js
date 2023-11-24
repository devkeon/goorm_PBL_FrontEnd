import React from "react";

const TotalCost = ({ spendData }) => {
  const costSum = spendData
    .map((data) => data.cost)
    .reduce((prev, curr) => Number(prev) + Number(curr), 0);
  return <div> 총 지출: {costSum}</div>;
};

export default TotalCost;
