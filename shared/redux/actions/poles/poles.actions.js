import axios from "@/pages/api/axios";

export const GET_POLES = "GET_POLES";
export const ADD_POLE = "ADD_POLE";
export const UPDATE_POLE = "UPDATE_POLE";

export const getPoles = () => async (dispatch) => {
  try {
    const response = await axios.get("/poles");
    dispatch({ type: GET_POLES, payload: response?.data?.data });
  } catch (error) {
    console.error(error);
  }
};

export const addPole = (pole) => async (dispatch) => {
  try {
    const response = await axios.post("/poles", pole);
    dispatch({ type: ADD_POLE, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const updatePole = (pole) => async (dispatch) => {
  try {
    const response = await axios.put(`/poles/${pole.id}`, pole);
    dispatch({ type: UPDATE_POLE, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
