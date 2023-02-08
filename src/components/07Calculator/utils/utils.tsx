function findRest(str: string) {
  //returns array elements that should have minus - between them
  let sustractedOperationsArray = [];
  let copyStr = str;

  while (!!copyStr.match(/[0-9]-/)) {
    const i = copyStr.match(/[0-9]-/)!["index"];
    let newOp: string;
    if (i !== undefined) {
      newOp = copyStr.slice(0, i + 1);
      sustractedOperationsArray.push(newOp);

      copyStr = copyStr.slice(i + 2);
    }
  }
  sustractedOperationsArray.push(copyStr);
  return sustractedOperationsArray;
}

export function calculateMulDiv(operation: string[]) {
  //returns the calculation of a single or multiple * / operation
  let mulDivOpeArray = [...operation];
  while (mulDivOpeArray.length > 1) {
    const firstnum = parseFloat(mulDivOpeArray[0]);
    const operator = mulDivOpeArray[1];
    const secnum = parseFloat(mulDivOpeArray[2]);
    let result: number | string = 0;
    if (operator === "÷") {
      result = firstnum / secnum;
    } else if (operator === "x") {
      result = firstnum * secnum;
    }
    result = result.toString();
    mulDivOpeArray = [result, ...mulDivOpeArray.splice(3)];
  }
  return mulDivOpeArray[0];
}

function findMulDiv(str: string) {
  //returns an array that separates numbers and * /  from a string
  let mulDivOperationsBetweenSubsArray = [];
  let copyStr = str;
  while (!!copyStr.match(/[÷x]/)) {
    const operator: string = copyStr.match(/[÷x]/)![0];
    const i = copyStr.match(/[÷x]/)!["index"];
    const newOp = copyStr.slice(0, i);

    mulDivOperationsBetweenSubsArray.push(newOp);
    mulDivOperationsBetweenSubsArray.push(operator);
    if (i !== undefined) {
      copyStr = copyStr.slice(i + 1);
    }
  }
  mulDivOperationsBetweenSubsArray.push(copyStr);
  return mulDivOperationsBetweenSubsArray;
}

export default function calculateOperation(str: string) {
  const separatedByPluses = str.split("+").map((opBPlus) => {
    //strings separated by plus
    const separatedByMinusandPluses = findRest(opBPlus);

    const calculatedMinus = separatedByMinusandPluses.map((opBMin) => {
      const mulDivOpeBetwMinAndPLus = findMulDiv(opBMin);
      return calculateMulDiv(mulDivOpeBetwMinAndPLus);
    });
    if (calculatedMinus.length === 1) {
      return calculatedMinus[0];
    } else {
      return calculatedMinus.reduce((a, b) =>
        (parseFloat(a) - parseFloat(b)).toString()
      );
    }
  });
  const result = separatedByPluses.reduce((a, b) =>
    (parseFloat(a) + parseFloat(b)).toString()
  );
  return result;
}

