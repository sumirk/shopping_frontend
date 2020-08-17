import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {
        const [values, setValues] = useState({
          name: "",
          email: "",
          password: "",
          error: "",
          success: false,
        });

        const { name, email, password, success, error } = values;

        const handleChange = (name) => (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
        };

        const signup = async (user) => {
          let response;
          try {
            response = await fetch('http://localhost:5000/api/users/signup', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              "Content-Type": 'application/json',
            },
            body: JSON.stringify(user)
          })
        }
          catch (error) {
            console.log(error)
          }
          return response.json()
        }



        const clickSubmit =  async (event) => {
          event.preventDefault();
          setValues({ ...values, error: false });
          console.log(values)

          const data = await signup({ name, email, password })
          if (data.status === "error") {
            setValues({ ...values, error: data.message, success: false });
            console.log(data.status)
            console.log(typeof(data.status));
          } else {
                      setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                      });
          }
          

          console.log(data)
          console.log(data.error)
        };

    const showSuccess = () => {
      return (
        <div className="alert alert-info" style={{ display: success ? "" : "none"}}> 
        User Created Successfully !!! , please <Link to="/login"> Login </Link> 
        </div>
      )
    }

    const showError = () => {
            return (
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            );
    };

    return (
      <div>
        <form action="/action_page.php">
          <div className="form-group">
            <label for="name">Name:</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>
          <div className="form-group">
            <label for="email">Email address:</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" /> Remember me
            </label>
          </div>
          <button onClick={clickSubmit} type="submit" className="btn btn-primary">
            Submit
          </button>

        </form>
        <div>
        { success ? showSuccess() : showError()}
        </div>
      </div>
    );
}
