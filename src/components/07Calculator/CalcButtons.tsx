import React, { useReducer, useState } from "react";
import calculateOperation from "../07Calculator/utils/utils";
import historyReducer, { initialHistory } from "../../store/store";

interface iCaclButtons {
  classes: string;
  id: string;
  name: string;
  ki: string;
  value?: string;
  currentNumber: string;
  prevResult: string;
  existprevCalc: boolean;
  changedCurrentNumber: boolean;
  setChangedCurrentNumber: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentNumber: React.Dispatch<React.SetStateAction<string>>;
  setPrevCalculation: React.Dispatch<React.SetStateAction<string>>;
  setExistPrevCalc: React.Dispatch<React.SetStateAction<boolean>>;
  setPrevResult: React.Dispatch<React.SetStateAction<string>>;
}
export default function CalcButtons({
  classes,
  id,
  name,
  ki,
  value,
  currentNumber,
  prevResult,
  existprevCalc,
  setPrevResult,
  setCurrentNumber,
  setPrevCalculation,
  setExistPrevCalc,
  changedCurrentNumber,
  setChangedCurrentNumber,
}: iCaclButtons) {
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

  function handleClickFloat(e: React.MouseEvent<HTMLButtonElement>): void {
    !changedCurrentNumber && setChangedCurrentNumber(true);
    if (/[.](\d+)$/.test(currentNumber)) {
      return;
    } else if (/[0-9]/.test(currentNumber[currentNumber.length - 1])) {
      setCurrentNumber((current) => current.concat("."));
    } else if (/([x÷\+\- ])$/.test(currentNumber)) {
      setCurrentNumber((current) => current.concat("0."));
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

  function handleDeleteOne() {
    setCurrentNumber((prev) =>
      prev.length === 1 ? "0" : prev.substring(0, prev.length - 1)
    );
  }

  function handleReset() {
    setCurrentNumber("0");
    setPrevCalculation("");
    setPrevResult("0");
    setExistPrevCalc(false);
    setChangedCurrentNumber(false);
  }

  return (
    <button
      key={ki}
      className={classes}
      id={id}
      name={name}
      value={value}
      onClick={
        name === "equal"
          ? calculate
          : /number/.test(classes)
          ? handleClickNumber
          : name === "float"
          ? handleClickFloat
          : /divide|multiply|plus|minus/.test(classes)
          ? handleClickOperator
          : name === "Ans"
          ? handleClickAns
          : name === "DEL"
          ? handleDeleteOne
          : handleReset
      }
    >
      {/number/.test(classes) ? name : value}
    </button>
  );
}
