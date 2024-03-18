import * as actions from "../actionTypes";
export const verficationBegin = () => ({
    type: actions.VERFICATION_BEGIN,
  });
  export const verficationSuccess = (verfication) => ({
    type: actions.VERFICATION_SUCCESS,
    payload: {
        verfication,
    },
  });
  
  export const verficationFailure = (error) => ({
    type: actions.VERFICATION_FAILURE,
    payload: {
      error,
    },
  });