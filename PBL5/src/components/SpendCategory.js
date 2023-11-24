import React from "react";

const SpendCategory = React.memo(({ categoryValue, setCategoryValue }) => {
  const handleCategory = (e) => {
    setCategoryValue(e.target.value);
  };

  return (
    <div className="w-1/2">
      <div className="text-blue-400">지출 항목</div>
      <input
        type="text"
        value={categoryValue}
        className="border-b-2 w-11/12"
        placeholder="예) AWS"
        onChange={handleCategory}
      ></input>
    </div>
  );
});

export default SpendCategory;
