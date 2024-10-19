import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import useAxios from "../hooks/useAxios/index.js";

function SendMail() {
  const toRef = useRef();
  const subjectRef = useRef();
  //const bodyRef = useRef();

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
        fetchData({
          url: "mail/sendmail",
          method: "POST",
          data: obj,
          headers: {
            authorization: token,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (response && isMounted) {
      setSuccess(true);
      toRef.current.value = "";
      subjectRef.current.value = "";
      setEditorState(EditorState.createEmpty());
      console.log("Send Mail:", response);
    }

    return () => {
      isMounted = false;
    };
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
                <input type="text" placeholder="To" ref={toRef} />
                <input type="text" placeholder="Subject" ref={subjectRef} />
                <div style={{ marginTop: "20px" }}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    editorStyle={{
                      minHeight: "200px",
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "4px",
                    }}
                    placeholder="Enter text here..."
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
