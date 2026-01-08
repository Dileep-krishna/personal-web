import React, { useState } from "react";

function AdminProfileManagement() {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    phone: "9876543210",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdmin({ ...admin, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Admin Profile:", admin);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="mb-4 text-center">Admin Profile Management</h3>

        <div className="text-center mb-3">
          <img
            src={
              admin.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Admin Avatar"
            className="rounded-circle mb-2"
            width="120"
            height="120"
          />
          <div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={admin.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={admin.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={admin.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={admin.role}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfileManagement;

