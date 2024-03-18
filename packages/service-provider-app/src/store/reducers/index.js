import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import profileReducer from "./profile.reducer";
import departmentsReducer from "./departments.reducer";
import scheduleReducer from "./schedule.reducer";
import userProgramReducer from "./userProgram.reducer";
import swReducer from "./sw.reducer";
import groupReducer from "@ava/common/lib/store/reducers/group.reducer";
import messageReducer from "@ava/common/lib/store/reducers/message.reducer";
import alertReducer from "@ava/common/lib/store/reducers/alert.reducer";
import callReducer from "@ava/common/lib/store/reducers/call.reducer";

export default combineReducers({
  userReducer,
  swReducer,
  profileReducer,
  departmentsReducer,
  scheduleReducer,
  userProgramReducer,
  groupReducer,
  messageReducer,
  callReducer,
  alertReducer,
});
