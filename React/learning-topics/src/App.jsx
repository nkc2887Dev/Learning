import "./App.css";
import Context from "./components/Context";
import MimeComponent from "./components/memo";
import Reducer from "./components/Reducer";
import UseCallbackComponent from "./components/usecallback";
import UseMemoComponent from "./components/usememo";

function App() {
  return (
    <div className="container">
      <Reducer />
      <Context />
      <MimeComponent />
      <UseMemoComponent />
      <UseCallbackComponent />
    </div>
  );
}

export default App;
