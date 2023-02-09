import React, { useReducer, useEffect, useState, useRef } from "react";
import "./App.scss";
import CalcButtons from "./components/07Calculator/CalcButtons";
import Display from "./components/07Calculator/CalcDisplay";
import OperationsHistory from "./components/07Calculator/OperationsHistory";
// import FlipMove from "react-flip-move";

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>("0");
  const [prevResult, setPrevResult] = useState<string>("0");
  const [prevCalculation, setPrevCalculation] = useState<string>("");
  const [existprevCalc, setExistPrevCalc] = useState<boolean>(false);
  const [changedCurrentNumber, setChangedCurrentNumber] =
    useState<boolean>(false);

  useEffect(() => {}, [currentNumber]);

  const buttons = [
    {
      name: "0",
      key: "0",
      classes: "btn btn-number",
      id: "zero",
    },
    {
      classes: "btn btn-number",
      id: "one",
      name: "1",
      key: "1",
    },
    {
      classes: "btn btn-number",
      id: "two",
      name: "2",
      key: "2",
    },
    {
      classes: "btn btn-number",
      id: "three",
      name: "3",
      key: "3",
    },
    {
      classes: "btn btn-number",
      id: "four",
      name: "4",
      key: "4",
    },
    {
      classes: "btn btn-number",
      id: "five",
      name: "5",
      key: "5",
    },
    {
      classes: "btn btn-number",
      id: "six",
      name: "6",
      key: "6",
    },
    {
      classes: "btn btn-number",
      id: "seven",
      name: "7",
      key: "7",
    },
    {
      classes: "btn btn-number",
      id: "eight",
      name: "8",
      key: "8",
    },
    {
      classes: "btn btn-number",
      id: "nine",
      name: "9",
      key: "9",
    },
    {
      classes: "btn btn-ac",
      value: "AC",
      id: "AC",
      name: "AC",
      key: "AC",
    },
    {
      classes: "btn btn-del",
      value: "DEL",
      id: "DEL",
      name: "DEL",
      key: "DEL",
    },

    {
      classes: "btn btn-operator",
      id: "plus",
      name: "plus",
      key: "plus",

      value: "+",
    },
    {
      classes: "btn btn-operator",
      id: "minus",
      name: "minus",
      key: "minus",
      value: "-",
    },
    {
      classes: "btn btn-operator",
      id: "multiply",
      name: "multiply",
      key: "multiply",

      value: "x",
    },
    {
      classes: "btn btn-operator",
      id: "divide",
      name: "divide",
      key: "divide",

      value: "÷",
    },
    {
      classes: "btn btn-operator",
      id: "percentage",
      name: "percentage",
      key: "percentage",
      value: "%",
    },
    {
      classes: "btn btn-operator",
      id: "float",
      name: "float",
      key: "float",
      value: ".",
    },
    {
      classes: "btn btn-operator",
      id: "ans",
      name: "Ans",
      key: "Ans",
      value: "Ans",
    },
    {
      classes: "btn btn-operator",
      id: "equal",
      name: "equal",
      key: "equal",
      value: "=",
    },
  ];

  return (
    <div className="App">
      <div id="container">
        <div id="calculator">
          <Display
            prevCalculation={prevCalculation}
            prevResult={prevResult}
            currentNumber={currentNumber}
            existPrevCalc={existprevCalc}
          />
          <div id="buttons-container">
            {buttons.map((btn, i) => (
              <CalcButtons
                currentNumber={currentNumber}
                prevResult={prevResult}
                setCurrentNumber={setCurrentNumber}
                ki={btn.key}
                classes={btn.classes}
                id={btn.id}
                name={btn.name}
                value={btn.value}
                setPrevCalculation={setPrevCalculation}
                setExistPrevCalc={setExistPrevCalc}
                setPrevResult={setPrevResult}
                existprevCalc={existprevCalc}
                changedCurrentNumber={changedCurrentNumber}
                setChangedCurrentNumber={setChangedCurrentNumber}
              />
            ))}
          </div>
        </div>
        <OperationsHistory
          setCurrentNumber={setCurrentNumber}
          changedCurrentNumber={changedCurrentNumber}
          setChangedCurrentNumber={setChangedCurrentNumber}
        />
      </div>
    </div>
  );
}

export default App;
