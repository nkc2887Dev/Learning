import React, { useState, useMemo } from 'react';

const ExpensiveComponent = ({ count }) => {
  const computeExpensiveValue = (num) => {
    // console.log('Expensive computation...');
    return num * 2;
  };

  const result = useMemo(() => computeExpensiveValue(count), [count]);

  return <div>Computed Value: {result}</div>;
};

const UseMemoComponent = () => {
//   console.log("UseMemoComponent re-rendered!");
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  return (
    <div className='card'>
      <h3><i>UseMemo</i></h3>
      <button onClick={() => setCount(count + 1)}>Increment Count {count} </button>
      <br />
      <button onClick={() => setOtherState(otherState + 1)}>Increment Other State {otherState}</button>
      <ExpensiveComponent count={count} />
    </div>
  );
};

export default UseMemoComponent;
