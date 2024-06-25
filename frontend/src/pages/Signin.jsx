import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";
import useAxios from "../hooks/useAxios/index.js";

function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [success, setSuccess] = useState(false);
  const { response, error, loading, fetchData } = useAxios();

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

        fetchData({
          url: "auth/signin",
          method: "POST",
          data: obj,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response) {
      setSuccess(true);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      //console.log("Signin successful:", response);
      dispatch(authActions.login(response));
      history.push("/profile");
    }
  }, [response]);
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
