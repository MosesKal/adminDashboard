import {
  GET_STATUS,
  ADD_STATUS,
  UPDATE_STATUS,
} from "../../actions/status/status.action";

const initialState = {
  status : [],
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATUS:
      return { ...state, status: action.payload };
    case ADD_STATUS:
      return [...state, action.payload];
    case UPDATE_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
