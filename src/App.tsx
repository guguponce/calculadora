import React, { useReducer, useEffect, useState, useRef } from "react";
import "./App.scss";
import historyReducer, { initialHistory } from "./store/store";
import calculateOperation from "./components/07Calculator/utils/utils";
import FlipMove from "react-flip-move";
import CalcButtons from "./components/07Calculator/CalcButtons";
import Display from "./components/07Calculator/CalcDisplay";
// import FlipMove from "react-flip-move";

function App() {
  const [currentNumber, setCurrentNumber] = useState<string>("0");
  const [changedCurrentNumber, setChangedCurrentNumber] =
    useState<boolean>(false);
  const [prevResult, setPrevResult] = useState<string>("0");
  const [prevCalculation, setPrevCalculation] = useState<string>("");
  const [existprevCalc, setExistPrevCalc] = useState<boolean>(false);

  const [history, dispatch] = useReducer(historyReducer, initialHistory);
  function calculate(): void {
    let currentOperation = currentNumber
      .replaceAll("Ans", prevResult)
      .replaceAll(/([x÷+-])- -(\d)/g, "$1$2")
      .replaceAll(/([-])- (\d)/g, "+$2");

    for (let index = 0; index < 2; index++) {
      if (!/[0-9]/.test(currentOperation[currentOperation.length - 1])) {
        setCurrentNumber((prev) =>
          currentOperation.substring(0, prev.length - 1)
        );
        currentOperation = currentOperation.substring(
          0,
          currentOperation.length - 1
        );
      }
    }

    const result = calculateOperation(currentOperation);
    setCurrentNumber(result);
    setPrevCalculation(currentOperation);
    setPrevResult(result);
    setChangedCurrentNumber(false);
    !existprevCalc && setExistPrevCalc(true);
    dispatch({
      type: "add",
      payload: {
        operation: currentOperation,
        result,
        id: Math.random().toString(),
      },
    });
  }

  function handleClickNumber(e: React.MouseEvent<HTMLButtonElement>): void {
    const { name } = e.target as HTMLButtonElement;
    let val: string = name;

    if (currentNumber === "0") {
      setCurrentNumber(val);
    } else if (!changedCurrentNumber) {
      setCurrentNumber(val);
    } else if (/ |s/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((prev) => prev.concat(" " + "x " + val));
    } else {
      setCurrentNumber((prev) => prev.concat(val));
    }
    !changedCurrentNumber && setChangedCurrentNumber(true);
  }

  useEffect(() => {}, [currentNumber]);

  function handleClickHistoryD(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const { value } = e.target as HTMLButtonElement;
    setCurrentNumber((prev) => prev.concat(value));

    !changedCurrentNumber && setChangedCurrentNumber(true);
  }

  function resetHistory() {
    dispatch({
      type: "reset",
    });
  }

  function handleRemoveFromHistory(id: string) {
    dispatch({
      type: "remove",
      payload: {
        id: id,
      },
    });
  }

  function handleClickAns(e: React.MouseEvent<HTMLButtonElement>): void {
    if (!changedCurrentNumber) {
      setCurrentNumber("Ans");
      setChangedCurrentNumber(true);
    } else if (/[.]/.test(currentNumber[currentNumber.length - 1])) {
      return;
    } else if (/[0-9]/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((prev) => prev.replace(",", "").concat(" x Ans" + " "));
    } else if (/ |s/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((prev) => prev.concat(" " + "x Ans" + " "));
    } else if (/[x÷+-]/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((prev) => prev.concat(" " + "Ans" + " "));
    }
  }

  function handleClickFloat(e: React.MouseEvent<HTMLButtonElement>): void {
    !changedCurrentNumber && setChangedCurrentNumber(true);
    if (/[.](\d+)$/.test(currentNumber)) {
    } else if (/[0-9]/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((current) => current.concat("."));
    }
  }

  function handleClickOperator(e: React.MouseEvent<HTMLButtonElement>): void {
    const { value } = e.target as HTMLButtonElement;
    const replaceables = ["+", "-", "x", "÷", "."];

    if (value === "-") {
      if (/[.]/.test(currentNumber[currentNumber.length - 1])) {
        //si ultimo . =>reemplazar . por -
        setCurrentNumber((prev) =>
          prev.substring(0, prev.length - 1).concat(value)
        );
      } else if (
        /[x÷+-]/.test(currentNumber[currentNumber.length - 1]) && //si ultimo es operator y penultimo numero => agregar -
        /[0-9 ]/.test(currentNumber[currentNumber.length - 2])
      ) {
        setCurrentNumber((prev) => prev.concat("-"));
      } else if (/ |s/.test(currentNumber[currentNumber.length - 1])) {
        setCurrentNumber((prev) => prev.concat(" " + "-"));
      } else if (/[0-9]/.test(currentNumber[currentNumber.length - 1])) {
        setCurrentNumber((prev) => prev.concat(value));
      } else if (/[-]/.test(currentNumber[currentNumber.length - 1])) {
      }
    } else {
      if (
        //si ultimo es minus y penultimo operador => eliminar el ultimo   x- => press x+÷ => x
        /[-]/.test(currentNumber[currentNumber.length - 1]) &&
        /[x÷+-]/.test(currentNumber[currentNumber.length - 2])
      ) {
        setCurrentNumber((prev) => prev.substring(0, prev.length - 1));
      } else if (
        //si ultimo es ANS  => agregar operador 1+ Ans  => press ÷ => 1+ Ans ÷
        / |s/.test(currentNumber[currentNumber.length - 1])
      ) {
        setCurrentNumber((prev) => prev.concat(" " + value));
      } else if (
        //si ultimo es operador  => reemplaza operador 1x => press ÷+x => 1÷
        replaceables.includes(currentNumber[currentNumber.length - 1])
      ) {
        setCurrentNumber((prev) =>
          prev.substring(0, prev.length - 1).concat(value)
        );
      } else if (
        //si ultimo es numero  => agregar operador 1+1  => press ÷ => 1+1÷
        /[0-9]/.test(currentNumber[currentNumber.length - 1])
      ) {
        setCurrentNumber((prev) => prev.concat(value));
      }
    }
    !changedCurrentNumber && setChangedCurrentNumber(true);
  }

  function handleReset() {
    setCurrentNumber("0");
    setPrevCalculation("");
    setPrevResult("0");
    setExistPrevCalc(false);
    setChangedCurrentNumber(false);
  }

  function handleDeleteOne() {
    setCurrentNumber((prev) =>
      prev.length === 1 ? "0" : prev.substring(0, prev.length - 1)
    );
  }

  function handleClickHistoryData(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    e.stopPropagation();
    const { value } = e.target as HTMLButtonElement;
    setCurrentNumber((prev) => prev.concat(value));

    !changedCurrentNumber && setChangedCurrentNumber(true);
  }

  const buttons = [
    {
      name: "0",
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "zero",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "one",
      name: "1",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "two",
      name: "2",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "three",
      name: "3",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "four",
      name: "4",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "five",
      name: "5",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "six",
      name: "6",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "seven",
      name: "7",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "eight",
      name: "8",
    },
    {
      classes: "btn btn-number",
      onClick: handleClickNumber,
      id: "nine",
      name: "9",
    },
    {
      classes: "btn btn-ac",
      value: "AC",
      id: "AC",
      name: "AC",
      onClick: handleReset,
    },
    {
      classes: "btn btn-del",
      value: "DEL",
      id: "DEL",
      name: "DEL",
      onClick: handleDeleteOne,
    },

    {
      classes: "btn btn-operator",
      id: "plus",
      name: "plus",
      onClick: handleClickOperator,

      value: "+",
    },
    {
      classes: "btn btn-operator",
      id: "minus",
      name: "minus",
      onClick: handleClickOperator,
      value: "-",
    },
    {
      classes: "btn btn-operator",
      id: "multiply",
      name: "multiply",

      onClick: handleClickOperator,
      value: "x",
    },
    {
      classes: "btn btn-operator",
      id: "divide",
      name: "divide",

      value: "÷",
      onClick: handleClickOperator,
    },
    {
      classes: "btn btn-operator",
      id: "percentage",
      name: "percentage",
      value: "%",
      onClick: handleClickOperator,
    },
    {
      classes: "btn btn-operator",
      id: "float",
      name: "float",
      onClick: handleClickFloat,
      value: ".",
    },
    {
      classes: "btn btn-operator",
      id: "ans",
      name: "Ans",
      onClick: handleClickAns,
      value: "Ans",
    },
    {
      classes: "btn btn-operator",
      id: "equal",
      name: "equal",
      onClick: calculate,
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
            {buttons.map((btn) => (
              <CalcButtons
                classes={btn.classes}
                id={btn.id}
                name={btn.name}
                onClick={btn.onClick}
                value={btn.value}
              />
            ))}
          </div>
        </div>
        <div id="operations-history">
          <h3>History</h3>
          <ul id="past-operations-list">
            {!!history.length ? (
              history.map((ope, i) => (
                <div key={ope.id} className="past-operation-container">
                  <button
                    className="remove-operation-btn"
                    onClick={() => {
                      handleRemoveFromHistory(ope.id);
                    }}
                  >
                    x
                  </button>
                  <button
                    className="past-calc past-operation"
                    value={ope.operation}
                    onClick={handleClickHistoryData}
                  >
                    {ope.operation}=
                  </button>
                  <hr />
                  <button
                    className="past-calc past-result"
                    value={ope.result}
                    onClick={handleClickHistoryData}
                  >
                    {Number(ope.result).toLocaleString("en")}
                  </button>
                </div>
              ))
            ) : (
              <div>
                <h4>No calculations made yet.</h4>
              </div>
            )}
          </ul>
          <button id="reset-history-btn" onClick={resetHistory}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
