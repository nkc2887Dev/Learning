import React, { useState } from "react";
import { Formik } from "formik";

interface IFormData {
  name: string;
  email: string;
}

interface IFormError {
  email?: string;
}

const initialValues = {
  name: "",
  email: "",
};

const FormikFork: React.FC = () => {
  const [data, setData] = useState<IFormData[]>([]);
  return (
    <>
      <h4>FormikFork</h4>
      <Formik
        initialValues={initialValues}
        validate={(values: IFormData): IFormError => {
          const errors: IFormError = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values) => {
          setData((prev) => [...prev, values]);
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          isSubmitting,
          values,
          handleChange,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && errors.name}
              </div>
              <div>
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
      </Formik>
      <br />
      <div>
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{dt.name}</td>
                    <td>{dt.email}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormikFork;