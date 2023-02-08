import React from "react";
interface iCaclButtons {
  classes: string;
  id: string;
  name: string;
  ki: string;
  value?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CalcButtons({
  classes,
  id,
  name,
  onClick,
  ki,
  value,
}: iCaclButtons) {
  return (
    <button
      key={ki}
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
