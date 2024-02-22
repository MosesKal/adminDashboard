import {
  GET_SOLUTIONS_CURATED,
  GET_SOLUTIONS_CONFORMS,
  UPDATE_SOLUTION,
  ADD_SOLUTION,
  GET_SOLUTIONS,
} from "@/shared/redux/actions/solution/solution.action";

const initialState = {
  solutions: [],
  curatedSolutions: [],
  conformSolutions: [],
};

export default function solutionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SOLUTIONS:
      return { ...state, solutions: action.payload };
    case GET_SOLUTIONS_CURATED:
      return { ...state, curatedSolutions: action.payload };
    case GET_SOLUTIONS_CONFORMS:
      return { ...state, conformSolutions: action.payload };
    case ADD_SOLUTION:
      return [...state, action.payload];
    case UPDATE_SOLUTION:
      return { ...state, solution: action.payload };
    default:
      return state;
  }
}
