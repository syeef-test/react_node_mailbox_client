import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (password.length > 0 || email.length > 0) {
        const obj = {
          email: email,
          password: password,
        };
        // console.log(obj);
        setLoading(true);
        setError("");
        const response = await axios.post(
          "http://127.0.0.1:3000/api/auth/signin",
          obj
        );

        console.log("frontend_response:", response.data);
        dispatch(authActions.login(response.data));
        history.push("/profile");

        if (response.status === 200) {
          setLoading(false);
          setSuccess(true);
          emailRef.current.value = "";
          passwordRef.current.value = "";
        }
      } else {
        setError("Password and Email can not be emapty");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to signin user.");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h3>
          Signin
          <div>
            {loading ? <Spinner animation="border" role="status" /> : ""}
            {success ? (
              <Alert variant="success">Signin successfull!</Alert>
            ) : (
              ""
            )}
            {error ? <Alert variant="danger">{error}</Alert> : ""}
          </div>
          <div>
            <Card style={{ padding: "20px", maxWidth: "500px" }}>
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" ref={emailRef} />
                <input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <div>
                  <Button type="submit" variant="primary">
                    Login
                  </Button>
                </div>
              </form>
              <Link to="/forgetPassword">Forget Password ?</Link>
              <Link to="/signup">Don't have account Sign up </Link>
            </Card>
          </div>
        </h3>
      </div>
    </>
  );
}

export default Signin;
