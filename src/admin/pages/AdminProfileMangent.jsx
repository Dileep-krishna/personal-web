import React, { useEffect, useState } from "react";
import {
  updateAdminProfileAPI,
  getAdminProfileAPI,
} from "../../services/allAPI";

function AdminProfileManagement() {
  const ADMIN_ID = "695e53041570a0de247b4d89";

  const [showModal, setShowModal] = useState(false);
  const [serverImage, setServerImage] = useState("");

  const [admin, setAdmin] = useState({
    email: "",
    description: "",
    profile: null,
  });

  // 🔥 FETCH PROFILE ON PAGE LOAD (THIS FIXES REFRESH)
  const fetchAdminProfile = async () => {
    try {
      const res = await getAdminProfileAPI(ADMIN_ID);
      console.log("✅ Admin Profile:", res.data);

      setAdmin({
        email: res.data.email,
        description: res.data.description,
        profile: null,
      });

      if (res.data.profile) {
        setServerImage(`http://localhost:4000/${res.data.profile}`);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setAdmin({ ...admin, profile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", admin.email);
    formData.append("description", admin.description);
    if (admin.profile) {
      formData.append("profile", admin.profile);
    }

    try {
      const res = await updateAdminProfileAPI(ADMIN_ID, formData);
      console.log("🎉 Update Response:", res.data);

      if (res.data.admin.profile) {
        setServerImage(
          `http://localhost:4000/${res.data.admin.profile}`
        );
      }

      setShowModal(false);
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 text-center">
        <img
          src={
            serverImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Admin"
          width="120"
          height="120"
          className="rounded-circle mx-auto mb-3"
          onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/149/149071.png")
          }
        />

        <h5 className="fw-bold">Admin</h5>
        <p className="text-muted">{admin.description}</p>

        <button
          className="btn btn-outline-primary"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-2"
                      value={admin.email}
                      onChange={handleChange}
                    />

                    <textarea
                      name="description"
                      className="form-control mb-2"
                      value={admin.description}
                      onChange={handleChange}
                    />

                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default AdminProfileManagement;
