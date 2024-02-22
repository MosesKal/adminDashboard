import {
  ADD_POLE,
  GET_POLES,
  UPDATE_POLE,
} from "@/shared/redux/actions/poles/poles.actions";

const initialState = {
    poles: [],
};

export default function polesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POLES:
      return { ...state, poles: action.payload };
    case ADD_POLE:
      return [...state, action.payload];
    case UPDATE_POLE:
      return { ...state, pole: action.payload };
    default:
      return state;
  }
}
