import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ResumeModal() {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
  };

  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete the resume?")) {
      setResume(null);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Manage Resume
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resume Management</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!resume || isEditing ? (
            <Form>
              <Form.Group>
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Form>
          ) : (
            <>
              <p>
                <strong>Uploaded Resume:</strong> {resume.name}
              </p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          {resume && !isEditing && (
            <>
              <Button
                variant="warning"
                onClick={() => setIsEditing(true)}
              >
                Edit / Update
              </Button>

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}

          {(isEditing || !resume) && (
            <Button
              variant="success"
              onClick={() => {
                setIsEditing(false);
                handleClose();
              }}
              disabled={!resume}
            >
              Save Resume
            </Button>
          )}

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResumeModal;
