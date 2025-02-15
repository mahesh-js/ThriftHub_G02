import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      if (user.emailVerification) {
        window.location.href = "/ThriftHub_G02/frontend/robotech_v1/dist/index.html";
      } else {
        window.location.href = "/auth/verify-pending";
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h2>Signin</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            👁️
          </span>
        </div>
        <button type="submit">Signin</button>
      </form>
      <p><a href="forgot-password.html">Forgot Password?</a></p>
      <p>Don't have an account? <a href="signup.html">Signup</a></p>
      <p><a href="/ThriftHub_G02/frontend/admin-signin.html">Admin</a></p>
    </div>
  );
}