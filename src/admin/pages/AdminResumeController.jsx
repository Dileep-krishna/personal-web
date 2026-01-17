import { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import {
  uploadResumeAPI,
  getResumeAPI,
  updateResumeAPI,
  deleteResumeAPI,
} from "../../services/allAPI"; // Adjust path as needed

function ResumeModal() {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState(null); // Loaded resume from backend
  const [file, setFile] = useState(null); // Selected file for upload/update
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    console.log("Modal closed");
    setShow(false);
    setIsEditing(false);
    setFile(null);
    setError(null);
  };

  const handleShow = () => {
    console.log("Modal opened - fetching resume");
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      setLoading(true);
      getResumeAPI()
        .then((res) => {
          console.log("Resume fetched:", res);
          setResume(res); // Set directly because backend returns resume object
        })
        .catch((err) => {
          console.error("Error fetching resume:", err);
          setResume(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [show]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
  };

  const handleSave = async () => {
    if (!file) {
      setError("Please select a file first.");
      console.warn("Save aborted: No file selected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!resume || !resume._id) {
        console.log("Uploading new resume...");
        const res = await uploadResumeAPI(file);
        console.log("Upload response:", res);
        setResume(res); // set response directly
      } else {
        console.log(`Updating resume ID: ${resume._id}...`);
        const res = await updateResumeAPI(resume._id, file);
        console.log("Update response:", res);
        setResume(res); // set response directly
      }
      setFile(null);
      setIsEditing(false);
      console.log("Save completed successfully");
    } catch (err) {
      console.error("Error saving resume:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!resume) {
      console.warn("Delete aborted: No resume to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete the resume?")) {
      console.log("Delete cancelled by user");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!resume._id) throw new Error("Resume ID missing, cannot delete.");
      console.log(`Deleting resume ID: ${resume._id}...`);
      await deleteResumeAPI(resume._id);
      console.log("Delete successful");
      setResume(null);
      setFile(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Error deleting resume:", err);
      setError(err.message || "Failed to delete resume");
    } finally {
      setLoading(false);
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
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && (!resume || isEditing) && (
            <Form>
              <Form.Group>
                <Form.Label>Upload Resume (PDF, DOC, DOCX)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Form.Group>
            </Form>
          )}

          {!loading && resume && !isEditing && (
            <p>
              <strong>Uploaded Resume:</strong>{" "}
              <a
                href={`http://localhost:4000${resume.filepath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resume.filename}
              </a>
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!loading && resume && !isEditing && (
            <>
              <Button variant="warning" onClick={() => setIsEditing(true)}>
                Edit / Update
              </Button>

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}

          {!loading && (isEditing || !resume) && (
            <Button
              variant="success"
              onClick={handleSave}
              disabled={!file || loading}
            >
              {loading ? "Saving..." : "Save Resume"}
            </Button>
          )}

          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResumeModal;
