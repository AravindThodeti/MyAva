import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ReferenceField,
  useDataProvider,
  Loading,
  useNotify,
} from "react-admin";
import AvatarField from "../AvatarField";
import Button from "@material-ui/core/Button";
import EditToolbarWithoutDelete from "../EditToolbarWithoutDelete";

const ImageInput = ({ onChange }) => {
  return (
    <>
      <input
        accept="image/jpeg,image/png"
        style={{ display: "none" }}
        id="attachment-image-input"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="attachment-image-input">
        <Button
          variant="outlined"
          aria-label="attachment"
          color="primary"
          component="span"
        >
          Change Image
        </Button>
      </label>
    </>
  );
};

const SpEdit = (props) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [loading, setLoading] = React.useState(false);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      setLoading(true);
      dataProvider
        .update(props.resource, {
          id: props.id,
          updateType: "image",
          data: formData,
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          notify(error.message);
        });
    }
  };

  if (loading) return <Loading />;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
        <TextInput disabled source="id" />
        <ReferenceField label="" source="user_id" reference="users" link="show">
          <AvatarField source="image_url" />
        </ReferenceField>
        <TextInput source="name" validate={required()} />
        <ImageInput onChange={handleImageChange} />
      </SimpleForm>
    </Edit>
  );
};

export default SpEdit;
