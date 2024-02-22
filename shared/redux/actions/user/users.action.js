import axios from "@/pages/api/axios";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/users");
    dispatch({
      type: GET_USERS,
      payload: res?.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/users", user);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = (user) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/${user.id}`, user);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
}