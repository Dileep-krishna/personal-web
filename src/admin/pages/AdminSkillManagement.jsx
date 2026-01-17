import React, { useState, useEffect } from "react";
import { addSkillAPI, getAllSkillAPI, deleteSkillAPI } from "../../services/allAPI";

function AdminSkillManagement() {
  const [newSkill, setNewSkill] = useState({ category: "frontend", name: "", level: "" });
  const [skills, setSkills] = useState({ frontend: [], backend: [], tools: [], programmingLanguage: [] });

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const response = await getAllSkillAPI();
      if (response) {
        setSkills(response);
      } else {
        console.error("Failed to fetch skills");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill.name.trim() || newSkill.level === "") {
      alert("Please fill all fields");
      return;
    }
    if (isNaN(newSkill.level) || newSkill.level < 0 || newSkill.level > 100) {
      alert("Level must be a number between 0 and 100");
      return;
    }

    try {
      const response = await addSkillAPI({
        name: newSkill.name.trim(),
        level: Number(newSkill.level),
        category: newSkill.category,
      });

      if (response.status === 201 || response.status === 200) {
        alert(`Skill added: "${newSkill.name}" with level ${newSkill.level}% to ${newSkill.category}`);
        setNewSkill({ category: newSkill.category, name: "", level: "" });
        fetchSkills();
      } else {
        alert("Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Error adding skill, check console.");
    }
  };

  // New: Remove skill handler
  const handleRemoveSkill = async (skillId) => {
    if (!window.confirm("Are you sure you want to remove this skill?")) return;

    try {
      const response = await deleteSkillAPI(skillId);
      console.log("Delete skill response:", response);

      if (response && response.message === "Skill deleted successfully") {
        alert("Skill removed successfully");
        fetchSkills(); // refresh skills list
      } else {
        alert("Failed to remove skill");
      }
    } catch (error) {
      console.error("Error removing skill:", error);
      alert("Error removing skill, check console.");
    }
  };

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4 text-primary">Admin Skill Management</h2>

      <div className="card shadow p-4 mx-auto mb-5" style={{ maxWidth: 480 }}>
        {/* Add Skill Form */}
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">Select Skill Category</label>
          <select
            id="categorySelect"
            className="form-select"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools & Platforms</option>
            <option value="programmingLanguage">Programming Languages</option> {/* FIXED HERE */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="skillName" className="form-label">Skill Name</label>
          <input
            type="text"
            id="skillName"
            className="form-control"
            placeholder="Enter skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="skillLevel" className="form-label">
            Skill Level (%) <small className="text-muted">(0 to 100)</small>
          </label>
          <input
            type="number"
            id="skillLevel"
            className="form-control"
            placeholder="Enter skill level"
            min="0"
            max="100"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleAddSkill}>
          Add Skill
        </button>
      </div>

      {/* Display Skills */}
      <div className="row">
        {["frontend", "backend", "tools", "programmingLanguage"].map((category) => ( // ADDED programmingLanguage HERE
          <div key={category} className="col-md-3"> {/* Changed to col-md-3 for 4 columns */}
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white text-capitalize">
                <h5 className="mb-0">
                  {category === "programmingLanguage" ? "Programming Languages" : 
                   category === "frontend" ? "Frontend Development" :
                   category === "backend" ? "Backend Development" : "Tools & Platforms"}
                </h5>
              </div>
              <div className="card-body p-3">
                {skills[category]?.length === 0 ? (
                  <div className="text-center py-3">
                    <i className="bi bi-tools fs-4 text-muted"></i>
                    <p className="text-muted mt-2 mb-0">No skills added</p>
                  </div>
                ) : (
                  <ul className="list-group list-group-flush">
                    {skills[category].map((skill) => (
                      <li key={skill._id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <div>
                          <strong>{skill.name}</strong>
                          <div className="progress mt-1" style={{ height: '6px', width: '100px' }}>
                            <div 
                              className="progress-bar bg-success" 
                              role="progressbar" 
                              style={{ width: `${skill.level}%` }}
                              aria-valuenow={skill.level} 
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveSkill(skill._id)}
                          title="Remove skill"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 text-muted small">
                  <i className="bi bi-info-circle me-1"></i>
                  Total: {skills[category]?.length || 0} skills
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminSkillManagement;