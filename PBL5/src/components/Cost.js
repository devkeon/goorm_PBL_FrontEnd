import React from "react";

const Cost = React.memo(({ costValue, setCostValue }) => {
  const handleCost = (e) => {
    setCostValue(e.target.value);
  };
  return (
    <div className="w-1/2">
      <div className="text-blue-400">비용</div>
      <input
        type="number"
        className="flex flex-col border-b-2 w-11/12"
        value={costValue}
        onChange={handleCost}
      ></input>
    </div>
  );
});

export default Cost;
