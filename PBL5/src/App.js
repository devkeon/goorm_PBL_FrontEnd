import React, { useCallback, useState } from "react";
import "./App.css";
import Cost from "./components/Cost";
import Lists from "./components/Lists";
import SpendCategory from "./components/SpendCategory";
import Status from "./components/Status";
import TotalCost from "./components/TotalCost";
import ListDelete from "./components/ListDelete";

const initialSpendData = localStorage.getItem("spendData")
  ? JSON.parse(localStorage.getItem("spendData"))
  : [];

function App() {
  const [spendData, setSpendData] = useState(initialSpendData);
  const [categoryValue, setCategoryValue] = useState("");
  const [costValue, setCostValue] = useState(0);
  const [status, setStatus] = useState({
    created: false,
    deleted: false,
    deleteAll: false,
    edited: false,
  });

  const handleClick = useCallback(
    (id) => {
      let newSpendData = spendData.filter((data) => data.id !== id);
      setSpendData(newSpendData);
      localStorage.setItem("spendData", JSON.stringify(newSpendData));
      setStatus({ deleted: true });
      setTimeout(() => {
        setStatus({
          deleted: false,
        });
      }, 2000);
    },
    [spendData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let newSpend = {
      id: Date.now(),
      title: categoryValue.length === 0 ? "edit needed" : categoryValue,
      cost: costValue,
    };
    setSpendData((prev) => [...prev, newSpend]);
    localStorage.setItem("spendData", JSON.stringify([...spendData, newSpend]));
    setStatus({ created: true });
    setTimeout(() => {
      setStatus({
        created: false,
      });
    }, 2000);
    setCategoryValue("");
    setCostValue(0);
  };

  const handleDelete = useCallback(() => {
    setSpendData([]);
    localStorage.setItem("spendData", JSON.stringify([]));
    setStatus({ deleteAll: true });
    setTimeout(() => {
      setStatus({
        deleteAll: false,
      });
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-200 w-screen h-screen">
      <Status status={status} />
      <div className="w-3/4 text-black-300 font-bold">예산 계산기</div>
      <div className="w-3/4 p-6 m-4 bg-white rounded">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <SpendCategory
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
            <Cost costValue={costValue} setCostValue={setCostValue} />
          </div>
          <input
            type="submit"
            value="제출"
            className="bg-pink-400 w-1/12 text-xs rounded p-1 my-1 text-white"
          />
          <Lists
            spendData={spendData}
            setSpendData={setSpendData}
            handleClick={handleClick}
            setStatus={setStatus}
          />
        </form>
        <ListDelete handleDelete={handleDelete} />
      </div>
      <TotalCost spendData={spendData} />
    </div>
  );
}

export default App;
