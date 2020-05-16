import React, { useState } from "react";
import useFormValidation from './useFormValidation'
import validate from './validateLogin'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'

const initial_state = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const [login, setLogin] = useState(true)
  const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(initial_state, validate, authenticateUser)
  const [firebaseError, setFirebaseError] = useState(null)

  async function authenticateUser() {
    const { name, email, password } = values
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      props.history.push('/')
    }
    catch (e) {
      console.error('Authentication Error')
      setFirebaseError(e.message)
    }
  }
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>

      <form className="flex flex-column" onSubmit={handleSubmit}>

        {!login && <input onChange={handleChange} name="name" type="text" placeholder="Your name" value={values.name}></input>}

        <input onChange={handleChange} className={errors.email && 'error-input'} onBlur={handleBlur} name="email" type="email" placeholder="Your email" value={values.email}></input>
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input onChange={handleChange} onBlur={handleBlur} name="password" type="password" placeholder="Choose password" className={errors.password && 'error-input'} value={values.password}></input>
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p>{firebaseError}</p>}

        <div className="flex mt3">
          <button type="submit" className="button pointer mr2" disabled={isSubmitting} style={{ background: isSubmitting ? 'grey' : 'orange' }}>submit</button>

          <button type="button" className="pointer button" onClick={() => setLogin((old) => !old)}>
            {login ? "need to create account? " : "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
