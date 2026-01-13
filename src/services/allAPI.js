import axios from "axios";
import commonAPI from "./commonAPI";
import SERVERURL from "./serverUrl";

//add-project
export const addProjectAPI = async (formData) => {
  return await commonAPI("POST", `${SERVERURL}/add-project`, formData, {
    "Content-Type": "multipart/form-data",
  });
};
//get all project
export const getProjectAPI = async () => {
  return await commonAPI("get", `${SERVERURL}/all-project`, {}, {})
}
//edit
// Update project - CHANGED path
export const updateProjectAPI = async (id, formData) => {
  return await commonAPI("put", `${SERVERURL}/update/${id}`, formData, {
    "Content-Type": "multipart/form-data", // Add this for FormData
  });
};

// Delete project - CHANGED path
export const deleteProjectAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/delete-project/${id}`, {}, {});
};
// ➕ Add Skill (ADMIN)
export const addSkillAPI = async (skill) => {
  try {
    console.log("🌐 Sending skill to backend:", skill);
    const response = await axios.post(`${SERVERURL}/skills-add`, skill, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("🌟 Response from backend:", response);
    return response;
  } catch (error) {
    console.error("❌ API addSkill error:", error);
    throw error;  // Let the caller handle it
  }
};

// 📥 Get All Skills (USER HOME)
export const getAllSkillAPI = async () => {
  try {
    const data = await commonAPI("get", `${SERVERURL}/get-skills`, {}, {});
    return data;
  } catch (error) {
    console.error("❌ API getAllSkill error:", error);
    throw error;
  }
};
// Delete skill by ID with debugging logs
export const deleteSkillAPI = async (skillId) => {
  try {
    console.log(`🗑️ Sending DELETE request for skill ID: ${skillId}`);
    const response = await commonAPI("delete", `${SERVERURL}/skills/${skillId}`);
    console.log("✅ DELETE response:", response);
    return response;
  } catch (error) {
    console.error("❌ Error deleting skill:", error);
    throw error;  // so caller can handle the error if needed
  }
};
// 🔹 GET ADMIN PROFILE
export const getAdminProfileAPI = (id) => {
  return axios.get(`${SERVERURL}/admin/profile/${id}`);
};

// 🔹 UPDATE ADMIN PROFILE
export const updateAdminProfileAPI = (id, formData) => {
  return axios.put(
    `${SERVERURL}/admin/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};


