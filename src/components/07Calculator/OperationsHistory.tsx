import { useReducer } from "react";
import historyReducer, { initialHistory } from "../../store/store";
interface iHistory {
  changedCurrentNumber: boolean;
  setChangedCurrentNumber: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentNumber: React.Dispatch<React.SetStateAction<string>>;
}

function OperationsHistory({
  setCurrentNumber,
  changedCurrentNumber,
  setChangedCurrentNumber,
}: iHistory) {
  const [history, dispatch] = useReducer(historyReducer, initialHistory);

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
  function handleClickHistoryData(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    e.stopPropagation();
    const { value } = e.target as HTMLButtonElement;
    setCurrentNumber((prev) => prev.concat(value));

    !changedCurrentNumber && setChangedCurrentNumber(true);
  }
  return (
    <div id="operations-history">
      add percentage add transition add paper?
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
  );
}
export default OperationsHistory;
