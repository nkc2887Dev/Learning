import React, { memo, useState } from "react";

const ChildComponent = memo(({ data }) => {
  // console.log("ChildComponent re-rendered!");
  return <div>{data}</div>;
});

const MimeComponent = () => {
  // console.log("MimeComponent re-rendered!");
  const [count, setCount] = useState(0);
  const data = "This is static data";

  return (
    <div className="card">
      <h3>
        <i>memo</i>
      </h3>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent data={data} />
    </div>
  );
};

export default MimeComponent;
