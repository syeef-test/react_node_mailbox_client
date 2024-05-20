import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
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
        console.log(obj);
      } else {
        alert("Password and Confirm Password did not match");
      }
    } catch (error) {
      console.log(error);
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
            <Card style={{ padding: "20px", maxWidth: "500px" }}>
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" ref={emailRef} />
                <input
                  type="password"
                  placeholder="password"
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
