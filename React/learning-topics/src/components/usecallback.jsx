import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ onClick }) => {
//   console.log('Child re-rendered!');
  return <button onClick={onClick}>Click Me</button>;
});

const UseCallbackComponent = () => {
//   console.log('UseCallback re-rendered!');
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  return (
    <div className='card'>
      <h3><i>UseCallback</i></h3>
      <button onClick={() => setCount(count + 1)}>Increment Count {count}</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

export default UseCallbackComponent;
