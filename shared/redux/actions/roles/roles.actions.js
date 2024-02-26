import axios from "@/pages/api/axios";

export const GET_ROLES = "GET_ROLES";
export const ADD_POLE = "ADD_POLE";
export const UPDATE_POLE = "UPDATE_POLE";

export const getRoles = () => async (dispatch) => {
  try {
    const response = await axios.get("/roles");
    dispatch({ type: GET_ROLES, payload: response?.data?.data });
  } catch (error) {
    console.error(error);
  }
};

