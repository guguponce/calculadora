interface iOperation {
  operation: string;
  result: string;
  id: string;
}

interface iAdd_Action {
  type: "add" | "remove" | "reset";
  payload: iOperation;
}
interface iReset_Action {
  type: "reset";
}
interface iRemove_Action {
  type: "remove";
  payload: {
    id: string;
  };
}

export const initialHistory: iOperation[] = [];

export default function historyReducer(
  state: iOperation[],
  action: iReset_Action | iAdd_Action | iRemove_Action
) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "reset":
      return [...initialHistory];
    case "remove":
      return [...state].filter((ope) => ope.id !== action.payload.id);
    default:
      return [...state];
  }
}
