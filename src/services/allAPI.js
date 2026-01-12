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
  return await commonAPI("get", `${SERVERURL}/all-project`,{},{})
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