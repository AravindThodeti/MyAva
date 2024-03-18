import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  BooleanInput,
  useDataProvider,
  Loading,
  Error,
  email,
} from "react-admin";
import { getChoices } from "../../utils";
import { TITLES } from "../../constants";
import EditToolbarWithoutDelete from "../EditToolbarWithoutDelete";

const AdminEdit = (props) => {
  const [userEmail, setUserEmail] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const dataProvider = useDataProvider();

  React.useEffect(() => {
    dataProvider.getOne("admins", { id: props.id }).then(({ data }) => {
      dataProvider.getOne("users", { id: data.user_id }).then(({ data }) => {
        setUserEmail(data.email);
        setLoading(false);
      }).catch((error) => {
          setError(error);
          setLoading(false);
      })
    });
  }, [props.id, dataProvider]);

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <Edit undoable={false} {...props}>
      <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
        <TextInput disabled source="id" />
        <SelectInput
          source="title"
          label="Title"
          choices={getChoices(TITLES)}
          validate={required()}
        />
        <TextInput source="name" validate={required()} />
        <TextInput
          label="Email"
          source="user.email"
          type="email"
          defaultValue={userEmail}
          validate={[required(), email()]}
        />
        <TextInput label="Password" type="password" source="user.password" />
        <BooleanInput source="super_admin" />
      </SimpleForm>
    </Edit>
  );
};

export default AdminEdit;
