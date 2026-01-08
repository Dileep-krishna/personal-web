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
