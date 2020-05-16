import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext)
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [error, setError] = useState(null)
  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setError(null)
      setIsPasswordReset(true)
    } catch (e) {
      console.error("Error sending email")
      setError(e.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>Reset Password</button>
      </div>
      {isPasswordReset && <p>Check eamil to reset password!</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default ForgotPassword;
