import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    cost,
    spendData,
    setSpendData,
    handleClick,
    provided,
    snapshot,
    setStatus,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedCost, setEditedCost] = useState(cost);

    const handleTitleChange = (event) => {
      setEditedTitle(event.target.value);
    };
    const handleCostChange = (event) => {
      setEditedCost(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      let newSpendData = spendData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
          data.cost = editedCost;
        }
        return data;
      });
      setSpendData(newSpendData);
      setStatus({ edited: true });
      setTimeout(() => {
        setStatus({
          edited: false,
        });
      }, 2000);
      localStorage.setItem("spendData", JSON.stringify(newSpendData));
      setIsEditing(false);
    };
    if (isEditing) {
      return (
        <div
          className={`${snapshot.isDragging ? "bg-gray-50" : "bg-gray-200"}
           px-4 py-1 my-2 border rounded`}
        >
          <div className="flex items-center justify-between">
            <input
              value={editedTitle}
              onChange={handleTitleChange}
              className="bg-gray-100 border rounded"
            ></input>
            <input
              value={editedCost}
              onChange={handleCostChange}
              className="bg-gray-100 border rounded"
            ></input>
            <div>
              <button className="px-4 py-2" onClick={handleSubmit}>
                save
              </button>
              <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
                x
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "bg-gray-50" : "bg-gray-50"}
         w-full px-4 py-1 my-2 bg-gray-50 border rounded`}
        >
          <div className="flex items-center justify-between">
            <span className="w-3/12">{editedTitle}</span>
            <span className="w-3/12">{editedCost}</span>
            <div>
              <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button className="px-4 py-2" onClick={() => handleClick(id)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default List;
