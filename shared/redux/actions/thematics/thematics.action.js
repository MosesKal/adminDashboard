import axios from "@/pages/api/axios";

export const GET_THEMATICS = "GET_THEMATICS";
export const ADD_THEMATIC = "ADD_THEMATIC";
export const UPDATE_THEMATIC = "UPDATE_THEMATIC";

export const getThematics = () => async (dispatch) => {
  try {
    const res = await axios.get("/thematics");
    dispatch({
      type: GET_THEMATICS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
};

