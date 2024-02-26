import axios from "@/pages/api/axios";

export const GET_STATUS = "GET_STATUS";
export const ADD_STATUS = "ADD_STATUS";
export const UPDATE_STATUS = "UPDATE_STATUS";

export const getStatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/status");
    dispatch({
      type: GET_STATUS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
};
