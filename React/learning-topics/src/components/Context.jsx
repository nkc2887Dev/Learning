import React, { createContext, useContext } from "react";

const UserContext = createContext();
const Context = () => {
  const user = { name: "Nick", id: 10 };
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
};
function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  const user = useContext(UserContext);
  return (
    <div className="card">
      <h3>
        <i>useContext</i>
      </h3>
      <p>GrandChild: {user.name},</p>
      Role: {user.id}
    </div>
  );
}

export default Context;
