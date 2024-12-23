import React from "react";
import Counter from "./components/counter";
import OtherComp from "./components/otherComp";

const App: React.FC = () => {
    return(
        <>
        <h3>App</h3>
        <Counter />
        <OtherComp />
        </>
    )
}

export default App;
