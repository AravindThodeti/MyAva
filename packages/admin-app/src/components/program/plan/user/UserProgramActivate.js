import * as React from "react";
import {
  Button,
  AutocompleteArrayInput,
  ReferenceArrayInput,
  SaveButton,
  useUpdate,
  FormWithRedirect,
} from "react-admin";
import IconCancel from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const UserProgramActivate = (props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  let [activate, { loading, loaded }] = useUpdate();

  const handleButtonClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  React.useEffect(() => {
    if (loaded) {
      handleCloseClick();
    }
  }, [loaded, loading]);

  const handleSubmit = async (values) => {
    if(values && values['service_providers_id']){
      values['service_providers']=values['service_providers_id'];
    }
    activate({
      resource: "user_programs",
      payload: {
        id: props?.data?.id,
        data: { ...values, updateType: "activate" },
      },
    });
  };

  return (
    <>
      <Button onClick={handleButtonClick} label={props.label || "Activate"} />
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        style={{ zIndex: 2 }}
      >
        <DialogTitle>Add Service Providers</DialogTitle>
        <FormWithRedirect
          resource="user_programs"
          save={handleSubmit}
          render={({ handleSubmitWithRedirect, pristine, saving }) => (
            <>
              <DialogContent>           
                <ReferenceArrayInput
                  source="service_providers_id"
                  reference="service_providers"
                  label="Service Provider"
                  perPage={60}
                  filter={{ is_activated: true }}
                  filterToQuery={(searchText) => ({ name: searchText })}
                >
                  <AutocompleteArrayInput
                    optionText={(choice) => {
                      return `${choice.id} - ${choice.title} ${choice.name}`;
                    }}
                    translateChoice={false}
                  />
                </ReferenceArrayInput>                
              </DialogContent>
              <DialogActions>
                <Button
                  label="ra.action.cancel"
                  onClick={handleCloseClick}
                  disabled={loading}
                >
                  <IconCancel />
                </Button>
                <SaveButton
                  handleSubmitWithRedirect={handleSubmitWithRedirect}
                  pristine={pristine}
                  saving={saving}
                  disabled={loading}
                />
              </DialogActions>
            </>
          )}
        />
      </Dialog>
    </>
  );
};

export default UserProgramActivate;
