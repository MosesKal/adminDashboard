import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import solutionReducer from "./solution/solution.reducer";


const rootred = combineReducers({
  cartreducer,
  solutionReducer
});

export default rootred;
