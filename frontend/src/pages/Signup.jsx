import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import useAxios from "../hooks/useAxios/index.js";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [success, setSuccess] = useState(false);
  const { response, error, loading, fetchData } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (password === confirmPassword) {
        const obj = {
          email: email,
          password: password,
        };

        fetchData({
          url: "auth/signup",
          method: "POST",
          data: obj,
        });

        // if (response) {
        //   emailRef.current.value = "";
        //   passwordRef.current.value = "";
        //   confirmPasswordRef.current.value = "";
        // }
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
      confirmPasswordRef.current.value = "";
      console.log("Signup successful:", response);
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
          Signup
          <div>
            {loading ? <Spinner animation="border" role="status" /> : ""}
            {success && <Alert variant="success">Signup Successful</Alert>}
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
                <input
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </form>
            </Card>
          </div>
        </h3>
      </div>
    </>
  );
}

export default Signup;
