import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const defaultValues = {
  name: "",
  email: "",
};
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email("Invalid email").required(),
  })
  .required();

type Formdata = yup.InferType<typeof schema>;

const HookForm: React.FC = () => {
  const [data, setData] = useState<Formdata[]>([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Formdata>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onsubmit = (newRecord: Formdata) => {
    setData((prevData) => [...prevData, newRecord]);
    reset();
  };

  return (
    <>
      <h4>HookForm</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input id="email" {...register("email", { required: true })} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <br />
        {/* <input type="submit" value="Submit with input" />
        <br />
        <br /> */}
        <button type="submit">Submit with react-hook-form</button>
      </form>
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
      <hr />
    </>
  );
};

export default HookForm;
