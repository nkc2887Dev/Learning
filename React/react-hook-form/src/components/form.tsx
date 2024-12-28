import React, { useState } from "react";

interface Idata {
  name: string;
  email: string;
}

const Form: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [data, setData] = useState<Idata[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setData([...data, { name, email }]);
    setName("");
    setEmail("");
  };
  return (
    <>
      <h4>Normal Form</h4>
      <form action="submit">
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit with normal form
        </button>
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
    </>
  );
};

export default Form;
