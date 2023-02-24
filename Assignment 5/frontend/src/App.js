import { useState } from "react";
import "./App.css";

const inputFields = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  address: "",
};

function App() {
  // firstName, lastName, email, address, userName, passWord
  const [input, setInput] = useState(inputFields);

  const handleInputChange = (event) => {
    setInput({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // nothing for now
  };

  return (
    <form action="http://localhost:3001/api" method="POST">
      <input
        id="first-name"
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={handleInputChange}
      />

      <input
        id="last-name"
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={handleInputChange}
      />

      <input
        id="email"
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleInputChange}
      />
      <input
        id="username"
        type="text"
        placeholder="username"
        name="username"
        onChange={handleInputChange}
      />
      <input
        id="password"
        type="text"
        placeholder="password"
        name="password"
        onChange={handleInputChange}
      />
      <input
        id="address"
        type="text"
        placeholder="address"
        name="address"
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default App;
