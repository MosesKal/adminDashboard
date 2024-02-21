import {
  ADD_SOLUTION,
  GET_SOLUTIONS,
  GET_SOLUTIONS_CURATED,
  GET_SOLUTIONS_CONFORMS,
  UPDATE_SOLUTION,
} from "@/shared/redux/actions/solution/solution.action";

const initialState = {};

export default function solutionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SOLUTIONS:
      return action.payload;
    case GET_SOLUTIONS_CURATED:
      return action.payload;
    case GET_SOLUTIONS_CONFORMS :
      return action.payload;
    case ADD_SOLUTION:
      return [...state, action.payload];
    case UPDATE_SOLUTION:
      return { ...state, solution: action.payload };
    default:
      return state;
  }
}
