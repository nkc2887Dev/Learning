import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { dec, inc } from "../redux/slices/counter";

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div style={{ border: "2px solid green" }}>
      <h3>count : {count}</h3>
      <button onClick={() => dispatch(inc())}>INC + </button>
      <button onClick={() => dispatch(dec())}>DEC - </button>
    </div>
  );
};

export default Counter;
