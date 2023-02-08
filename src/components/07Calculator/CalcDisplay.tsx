import React from "react";
import PropTypes from "prop-types";

interface iDisplay {
  prevCalculation: string;
  prevResult: string;
  currentNumber: string;
  existPrevCalc: boolean;
}

function Display({
  prevCalculation,
  prevResult,
  currentNumber,
  existPrevCalc,
}: iDisplay) {
  return (
    <div id="display-container">
      <div className="display-box">
        {existPrevCalc &&
          <>
            <span className="display-span prev-operation">
              ( {prevCalculation} )
            </span>
            <span className="display-span ans">Ans: </span>
            <span className="display-span prev-result">
              {/[x÷+-]/.test(prevResult)
                ? prevResult
                : Number(prevResult).toLocaleString("en")}
            </span>
          </>
        }
      </div>
      <div className="display-box">
        <span className="display-span">
          {/[x÷+-]/.test(currentNumber) || /^Ans$/.test(currentNumber)
            ? currentNumber
            : Number(currentNumber).toLocaleString("en")}
        </span>
      </div>
    </div>
  );
}

Display.propTypes = {};

export default Display;
