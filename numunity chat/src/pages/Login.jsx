import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <main className="form-container">
      <p className="form-container__title">Нэвтрэх</p>
      <form className="form" onSubmit={handleSubmit}>
        {err && <p id="incorrect">Something went wrong</p>}
        <div className="form__input-group">
          <label htmlFor="email">Цахим шуудан:</label>
          <input type="email" name="email" id="email" placeholder="" autoFocus />
        </div>
        <div className="form__input-group">
          <label htmlFor="password">Нууц үг:</label>
          <input type="password" name="password" id="password" placeholder="" />
          <div className="form__forgot">
            <Link to="/forgot-password">Нууц үг мартсан?</Link>
          </div>
        </div>
        <input type="submit" value="Нэвтрэх" className="btn form__sign" id="btn_login" />
      </form>
      <div className="social-message">
        <div className="social-message__line"></div>
        <p className="social-message__message">Хялбар нэвтрэлт</p>
        <div className="social-message__line"></div>
      </div>
      <div className="social-icons">
        <button aria-label="Log in with Google" className="social-icons__icon">
          <i className="fa-brands fa-google"></i>
        </button>
        <button aria-label="Log in with Facebook" className="social-icons__icon">
          <i className="fa-brands fa-facebook"></i>
        </button>
        <button aria-label="Log in with Instagram" className="social-icons__icon">
          <i className="fa-brands fa-instagram"></i>
        </button>
      </div>
      <p className="signup">
        Та бүртгэлгүй юу? <Link to="/register">Бүртгүүлэх</Link>
      </p>
    </main>
  );
};

export default Login;
