import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
} from "react-admin";
import EditToolbarWithoutDelete from "../../EditToolbarWithoutDelete";
import ImageField from "../../recipe/imageField";
const LiveSessionEdit = (props) => {
  const [imageLink, setImageLink] = React.useState("");
  const imageRef = React.useRef();
  imageRef.current = imageLink;
  const transform = (data) => {
    return {
      ...data,
      thumbnail: imageRef.current,
    };
  };

  return (
    <>
      <Edit mutationMode={"pessimistic"} transform={transform} {...props}>
        <SimpleForm redirect={false} toolbar={<EditToolbarWithoutDelete />}>
          <TextInput disabled source="id" />
          <ImageField imageLink={imageLink} setImageLink={setImageLink} imageHeight={360} imageWidth={360} folderName="studioSession"/>
          <TextInput source="session_link" validate={required()} />
          <DateTimeInput
              source="session_starts_at"
              validate={required()}
            />
            <DateTimeInput
              source="session_ends_at"
              validate={required()}
            />
          <TextInput
              validate={required()}
              source="activity_type"
              lable="session name"
            />
              <TextInput
              source="about_expert"
              multiline 
              fullWidth
            />
               <TextInput
              source="description"
              multiline
              fullWidth
            />
               <TextInput
              validate={required()}
              source="organizer_name"
              lable="speaker name"
            />
        </SimpleForm>
      </Edit>
    </>
  );
};

export default LiveSessionEdit;
