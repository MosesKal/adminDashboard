import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
} from "../../actions/user/users.action";

const initialState = {
  users: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
      return [...state, action.payload];
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
