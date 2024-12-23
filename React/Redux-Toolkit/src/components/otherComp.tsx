import React from "react";
import { useAppSelector } from "../redux/hooks";

const OtherComp = () => {
  const count = useAppSelector((state) => state.counter);
  return (
    <div style={{border: "2px solid red"}}>
        <p>New Component</p>
      <h1>
        <i>{count}</i>
      </h1>
    </div>
  );
};

export default OtherComp;
