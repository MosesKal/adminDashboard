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

export const addThematic = (thematic) => async (dispatch) => {
  try {
    const res = await axios.post("/thematics", thematic);
    dispatch({
      type: ADD_THEMATIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateThematic = (thematic) => async (dispatch) => {
  try {
    const res = await axios.put(`/thematics/${thematic.id}`, thematic);
    dispatch({
      type: UPDATE_THEMATIC,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
}