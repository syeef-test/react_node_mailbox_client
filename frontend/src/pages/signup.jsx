import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
        // console.log(obj);
        setLoading(true);
        setError("");
        const response = await axios.post(
          "http://127.0.0.1:3000/api/auth/signup",
          obj
        );

        if (response.status === 200) {
          setLoading(false);
          setSuccess(true);
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        }
      } else {
        //alert("Password and Confirm Password did not match");
        setError("Password and Confirm Password did not match");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to create user.");
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
          Signup
          <div>
            {loading ? <Spinner animation="border" role="status" /> : ""}
            {success ? (
              <Alert variant="success">User created successfully!</Alert>
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

export default signup;
