import { useReducer } from "react";

const ACTIONS = {
  ADD: "addItems",
  REMOVE: "removeItems",
  RESET: "reset",
};

const itemReducer = (items, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...items, action.data];
    case ACTIONS.REMOVE:
      return items.filter((item) => item.id !== action.id);
    case ACTIONS.RESET:
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const generateRandomName = () => {
  const names = ["Bottle", "Mobile", "Tablet", "Laptop", "Speaker", "Headphone"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

function Reducer() {
  const [data, dispatch] = useReducer(itemReducer, [{ id: 1, name: "Mobile" }]);

  const addItem = () => {
    dispatch({
      type: ACTIONS.ADD,
      data: { id: Date.now(), name: generateRandomName() },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE, id });
  };

  const resetItems = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <div className="card">
      <h3>
        <i>useReducer</i>
      </h3>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="item">
            {item.name}
            <div className="actions">
              <button onClick={addItem}>Add</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={resetItems} className="reset-btn">Reset All</button>
    </div>
  );
}

export default Reducer;