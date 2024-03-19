import { combineReducers } from "redux";
import { cartreducer } from "./reducer";


const rootred = combineReducers({
  cartreducer,
  // solutionReducer,
  // thematicsReducer,
  // statusReducer,
  // usersReducer,
  // polesReducer,
  // rolesReducer,
});

export default rootred;
