import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../utils/auth-context'

export default function Login() {

    const [ values, setValues ] = useState({ email: '', password: '', error: '', loading: false, redirectToReferrer: false })

    const auth = useContext(AuthContext)

    const login = async (user) => {
      let response;

      try {
        response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
      } catch (error) {
        console.log(error)
      }
      return response.json()
    }

    const {
      email,
      password,
      error,
      loading,
      redirectToReferrer
    } = values;

    const changeHandler = name => event => {
      setValues({...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = async (event) => {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      const data = await login({email, password})

      auth.login(data.userId, data.token);

      if (data.status === 'fail') {
        setValues({ ...values, error: data.message, loading: false });
        
      } else {
        setValues({ ...values, redirectToReferrer: true });
      }

    }

    const showLoading = () => {
      return loading && (
        <div className="alert alert-info"> 
        <h2>Loading.........</h2>
        </div>
      )
    }

    const redirectUser = () => {
      if (redirectToReferrer) {
        return <Redirect to="/"></Redirect>
      }
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
        <form>
          <div className="form-group">
            <label for="email">Email address:</label>
            <input
              onChange={changeHandler("email")}
              type="email"
              className="form-control"
              placeholder="Enter email"
              id="email"
            />
          </div>

          <div className="form-group">
            <label for="pwd">Password:</label>
            <input
              onChange={changeHandler("password")}
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="pwd"
            />
          </div>

          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" /> Remember me
            </label>
          </div>

          <button
            onClick={clickSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        <div>
        {showLoading()}
        {showError()}
        {redirectUser()}
        </div>
      </div>
    );
}
