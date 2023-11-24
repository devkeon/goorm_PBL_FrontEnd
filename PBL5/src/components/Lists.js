import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(
  ({ spendData, setSpendData, handleClick, setStatus }) => {
    const handleEnd = (result) => {
      if (!result.destination) return;
      const newSpendData = spendData;
      const [reroderedItem] = newSpendData.splice(result.source.index, 1);
      newSpendData.splice(result.destination.index, 0, reroderedItem);
      setSpendData(newSpendData);
      localStorage.setItem("spendData", JSON.stringify(newSpendData));
    };

    return (
      <div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="spendings">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {spendData.map((data, index) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        cost={data.cost}
                        spendData={spendData}
                        setSpendData={setSpendData}
                        provided={provided}
                        snapshot={snapshot}
                        handleClick={handleClick}
                        setStatus={setStatus}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
);

export default Lists;
