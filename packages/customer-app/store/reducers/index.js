import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import drawerReducer from "./drawer.reducer";
import profileReducer from "./profile.reducer";
import departmentReducer from "./department.reducer";
import consultantReducer from "./consultant.reducer";
import slotReducer from "./slot.reducer";
import initConsultationReducer from "./initConsultation.reducer";
import paymentReducer from "./payment.reducer";
import consultationReducer from "./consultation.reducer";
import communityReducer from "./community.reducer";
import planPurchaseReducer from "./planPurchase.reducer";
import userProgramReducer from "./userProgram.reducer";
import dietTrackerReducer from "./dietTracker.reducer";
import workoutTrackerReducer from "./workoutTracker.reducer";
import weightTrackerReducer from "./weightTracker.reducer";
import goalReducer from "./goal.reducer";
import groupReducer from "@ava/common/lib/store/reducers/group.reducer";
import messageReducer from "@ava/common/lib/store/reducers/message.reducer";
import programReducer from "@ava/common/lib/store/reducers/program.reducer";
import planReducer from "@ava/common/lib/store/reducers/plan.reducer";
import callReducer from "@ava/common/lib/store/reducers/call.reducer";

export default combineReducers({
  userReducer,
  drawerReducer,
  profileReducer,
  departmentReducer,
  consultantReducer,
  slotReducer,
  initConsultationReducer,
  paymentReducer,
  consultationReducer,
  communityReducer,
  planPurchaseReducer,
  userProgramReducer,
  dietTrackerReducer,
  workoutTrackerReducer,
  weightTrackerReducer,
  goalReducer,
  groupReducer,
  messageReducer,
  callReducer,
  programReducer,
  planReducer,
});
