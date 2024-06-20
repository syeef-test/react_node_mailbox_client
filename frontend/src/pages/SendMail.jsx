import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import useAxios from "../hooks/useAxios/index.js";

function SendMail() {
  const toRef = useRef();
  const subjectRef = useRef();
  const bodyRef = useRef();

  const [success, setSuccess] = useState(false);
  const { response, error, loading, fetchData } = useAxios();

  const history = useHistory();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const to = toRef.current.value;
      const subject = subjectRef.current.value;
      const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      if (!to || !subject || !body.trim()) {
        setError("To, subject, and body cannot be empty");
        return;
      }

      if (to.length !== 0 || subject.length !== 0 || body.length !== 0) {
        const from = localStorage.getItem("email");
        const obj = {
          to: to,
          subject: subject,
          body: body,
          from: from,
        };
        //console.log(obj);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://127.0.0.1:3000/api/mail/sendmail",
          obj,
          {
            headers: {
              authorization: token,
            },
          }
        );

        // console.log("frontend_response:", response.data);
        // dispatch(authActions.login(response.data));
        // history.push("/profile");

        // if (response.status === 200) {

        //   setSuccess(true);

        //   toRef.current.value = "";
        //   subjectRef.current.value = "";
        //   setEditorState(EditorState.createEmpty());
        // }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to send mail.");
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
          Send Mail
          <div>
            {loading ? <Spinner animation="border" role="status" /> : ""}
            {success ? (
              <Alert variant="success">Send Mail successfull!</Alert>
            ) : (
              ""
            )}
            {error ? <Alert variant="danger">{error}</Alert> : ""}
          </div>
          <div>
            <Card style={{ padding: "20px", maxWidth: "500px" }}>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="to" ref={toRef} />
                <input type="text" placeholder="subject" ref={subjectRef} />
                <div style={{ marginTop: "20px" }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                </div>
                <div>
                  <Button type="submit" variant="primary">
                    Send
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </h3>
      </div>
    </>
  );
}

export default SendMail;
