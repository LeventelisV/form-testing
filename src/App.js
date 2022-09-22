import { useState } from "react";
import validator from "validator";
import "./App.css";

function App() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(" ");
  const handleChange = (e) => {
    console.log(e.target.name);
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signInData.email)) {
      return setError("The email you input is invalid");
    } else if (signInData.password.length < 5) {
      return setError("The password must have 5 digits or more");
    } else if (signInData.password !== signInData.confirmPassword) {
      return setError("The passwords don't match try again");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signInData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signInData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signInData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
