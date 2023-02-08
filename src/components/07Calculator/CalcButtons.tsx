import React from "react";
interface iCaclButtons {
  classes: string;
  id: string;
  name: string;

  value?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CalcButtons({
  classes,
  id,
  name,
  onClick,
  value,
}: iCaclButtons) {

  return (
    <button
      key={Math.random()+""}
      className={classes}
      id={id}
      name={name}
      value={value}
      onClick={onClick}
    >
      {/number/.test(classes) ? name : value}
    </button>
  );
}
