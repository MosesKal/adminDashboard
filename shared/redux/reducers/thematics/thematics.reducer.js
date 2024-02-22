import {
  ADD_THEMATIC,
  GET_THEMATICS,
  UPDATE_THEMATIC,
} from "../../actions/thematics/thematics.action";

const initialState = {
  thematics: [],
};

export default function thematicsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THEMATICS:
      return { ...state, thematics: action.payload };
    case ADD_THEMATIC:
      return [...state, action.payload];
    case UPDATE_THEMATIC:
      return { ...state, thematic: action.payload };
    default:
      return state;
  }
}
