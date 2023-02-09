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
  const displayFormatting = (value: string) =>{
    value
      .replaceAll(
        /(\d+)([\.\-\+x÷])/g,
        (m: string, p1: string, p2: string) =>
          Number(p1).toLocaleString("en") + p2
      )
      value.replaceAll(
        /([\-\+x÷])(\d+)/g,
        (m: string, p1: string, p2?: string) =>
          p1 + Number(p2).toLocaleString("en")
      )
      value.replace(/^(\d+)$/g, (m: string, p1: string, p2?: string) =>
        Number(p1).toLocaleString("en")
      )
      value.replace(
        /(\d+)([.])$/g,
        (m: string, p1: string, p2?: string) =>
          Number(p1).toLocaleString("en") + p2
      )
      value.replaceAll(
        /([.])(\d{8,})$/g,
        (m: string, p1: string, p2?: string) =>

          p1 + p2?.substring(0,13)
      );
      return value
    
    }
      return (
    <div id="display-container">
      <div className="display-box prev-operation-display">
        {existPrevCalc && (
          <>
            <span className="display-span prev-operation">
              ( {prevCalculation} )
            </span>
            <span className="display-span ans">Ans: </span>
            <span className="display-span prev-result">
              {displayFormatting(prevResult)}
            </span>
          </>
        )}
      </div>
      <div className="display-box current-operation-display">
        <span className="display-span current-operation">
          {/^Ans$/.test(currentNumber)
            ? currentNumber
            : displayFormatting(currentNumber)}
        </span>
      </div>
    </div>
  );
}

Display.propTypes = {};

export default Display;
