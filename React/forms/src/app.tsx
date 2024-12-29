import React from "react";
import Form from "./components/form";
import HookForm from "./components/hookForm";
import FormikFork from "./components/formik";

const App: React.FC = () => {
  return (
    <>
      <FormikFork />
      <hr />
      <HookForm />
      <hr />
      <Form />
    </>
  );
};

export default App;
