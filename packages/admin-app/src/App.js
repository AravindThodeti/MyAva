import * as React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import dataProvider from "./data_provider/index";
import authProvider from "./data_provider/authProvider";
import { API_VERSION_URL, LS_ACCESS_TOKEN } from "@ava/common";
import MyLayout from "./components/Layout";
import { RecipeList, RecipeCreate, RecipeEdit } from "./components/recipe";
import { CustomerList, CustomerShow } from "./components/customer";
import { SpList, SpShow, SpEdit } from "./components/sp";
import { TagList, TagShow, TagCreate } from "./components/tag";
import { PostList, PostShow } from "./components/post";
import { UserList, UserShow } from "./components/user";
import { DepartmentList } from "./components/department";
import {
  AdminList,
  AdminEdit,
  AdminShow,
  AdminCreate,
} from "./components/admin";
import {
  ActivityList,
  ActivityEdit,
  ActivityCreate,
} from "./components/activity";
import * as Program from "./components/program";
import * as Plan from "./components/program/plan";
import * as UserProgram from "./components/program/plan/user";
import * as Consultation from "./components/consultation";
import { LiveSessionCreate, LiveSessionEdit, LiveSessionList, StudioVideoCreate, StudioVideoEdit, StudioVideoList } from "components/studio";
import StudioDiseaseList from "components/studio/StudioDiseaseList";
import StudioProgramList from "components/studio/StudioProgramList";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem(LS_ACCESS_TOKEN);
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const customDataProvider = dataProvider(API_VERSION_URL, httpClient);

const App = () => (
  <Admin
    layout={MyLayout}
    authProvider={authProvider}
    dataProvider={customDataProvider}
  >
    <Resource
      options={{ group: "Users" }}
      name="customers"
      list={CustomerList}
      show={CustomerShow}
    />
    <Resource
      options={{ group: "Users", label: "Service Providers" }}
      name="service_providers"
      list={SpList}
      show={SpShow}
      edit={SpEdit}
    />
    <Resource
      options={{ group: "Users" }}
      name="admins"
      list={AdminList}
      show={AdminShow}
      edit={AdminEdit}
      create={AdminCreate}
    />
    <Resource
      name="users"
      options={{ group: "Users" }}
      list={UserList}
      show={UserShow}
    />
    <Resource name="departments" list={DepartmentList} />
    <Resource
      options={{ group: "Community" }}
      name="tags"
      list={TagList}
      show={TagShow}
      create={TagCreate}
    />
    <Resource
      options={{ group: "Community" }}
      name="posts"
      list={PostList}
      show={PostShow}
    />
    <Resource name="comments" />

    <Resource
      options={{ group: "Programs" }}
      name="programs"
      list={Program.ProgramList}
      create={Program.ProgramCreate}
      edit={Program.ProgramEdit}
    />

    <Resource
      options={{ group: "Programs" }}
      name="plans"
      list={Plan.PlanList}
      edit={Plan.PlanEdit}
      show={Plan.PlanShow}
      create={Plan.PlanCreate}
    />

    <Resource
      options={{ group: "Programs", label: "User Programs" }}
      name="user_programs"
      list={UserProgram.UserProgramList}
      show={UserProgram.UserProgramShow}
    />

    <Resource
      options={{ group: "Consultation", label: "User Consulations" }}
      name="consultations"
      list={Consultation.ConsultationList}
      show={Consultation.ConsultationShow}
    />
    <Resource name="calls" />

    <Resource
      options={{ group: "Trackers" }}
      name="recipes"
      list={RecipeList}
      create={RecipeCreate}
      edit={RecipeEdit}
    />
    <Resource
      options={{ group: "Trackers" }}
      name="activities"
      list={ActivityList}
      edit={ActivityEdit}
      create={ActivityCreate}
    />
     <Resource
      options={{ group: "Studio" , label: "live Session"}}
      name="StudioLiveSession"
      list={LiveSessionList}
      create={LiveSessionCreate}
      edit={LiveSessionEdit}
    />
     <Resource
      options={{ group: "Studio" , label: "Studio Video"}}
      name="studio"
      list={StudioVideoList}
      create={StudioVideoCreate}
      edit={StudioVideoEdit}
    />
    <Resource
      options={{ group: "Studio" , label: "StudioDiseaseList"}}
      name="studio_disease"
      list={StudioDiseaseList}
    />
    <Resource
      options={{ group: "Studio" , label: "StudioSessionList"}}
      name="studio_session"
      list={StudioDiseaseList}
    />
     <Resource
      options={{ group: "Studio" , label: "StudioProgramList"}}
      name="studio_program"
      list={StudioProgramList}
    />
    <Resource name="disease" />
  </Admin>
);

export default App;
