import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import profileReducer from "./profile.reducer";
import loginReducer from "./login.reducer";

export default combineReducers({
  userReducer,
  profileReducer,
  loginReducer
});