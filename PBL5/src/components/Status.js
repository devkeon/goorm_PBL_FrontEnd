import React from "react";

const Status = React.memo(({ status }) => {
  return (
    <div className="absolute top-5 w-3/4 h-8">
      <div
        className={`${
          status.created ? "block" : "hidden"
        } text-center boreder rounded bg-green-200`}
      >
        생성되었습니다.
      </div>{" "}
      <div
        className={`${
          status.deleted ? "block" : "hidden"
        } text-center boreder rounded bg-green-200`}
      >
        삭제되었습니다.
      </div>
      <div
        className={`${
          status.edited ? "block" : "hidden"
        } text-center boreder rounded bg-green-200`}
      >
        수정되었습니다.
      </div>
      <div
        className={`${
          status.deleteAll ? "block" : "hidden"
        } text-center boreder rounded bg-green-200`}
      >
        모두 삭제되었습니다.
      </div>
    </div>
  );
});

export default Status;
