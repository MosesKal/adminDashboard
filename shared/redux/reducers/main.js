import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import solutionReducer from "./solution/solution.reducer";
import thematicsReducer from "./thematics/thematics.reducer";
import statusReducer from "./status/status.reducer";
import usersReducer from "./user/users.reducer";
import polesReducer from "./poles/poles.reducer";

const rootred = combineReducers({
  cartreducer,
  solutionReducer,
  thematicsReducer,
  statusReducer,
  usersReducer,
  polesReducer,
});

export default rootred;
