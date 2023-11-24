import React from "react";

const ListDelete = React.memo(({ handleDelete }) => {
  return (
    <button
      onClick={handleDelete}
      className="bg-pink-400 w-2/12 text-xs rounded p-1 my-1 text-white"
    >
      목록 지우기
    </button>
  );
});

export default ListDelete;
