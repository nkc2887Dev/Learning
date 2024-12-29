import React from "react";
import Form from "./components/form";
import HookForm from "./components/hookForm";
import FormikFork from "./components/formik";
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="app-container">
      <FormikFork />
      <hr />
      <HookForm />
      <hr />
      <Form />
    </div>
  );
};

export default App;
