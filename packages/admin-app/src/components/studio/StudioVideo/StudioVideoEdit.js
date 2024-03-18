import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput
} from "react-admin";
import EditToolbarWithoutDelete from "../../EditToolbarWithoutDelete";
import ImageField from "../../recipe/imageField";

const StudioVideoEdit = (props) => {
  const [imageLink, setImageLink] = React.useState("");
  const imageRef = React.useRef();
  imageRef.current = imageLink;
  const transform = (data) => {
    if(data?.thumbnail){
      imageRef.current= data.thumbnail
    }
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
          <ImageField imageLink={imageLink} setImageLink={setImageLink} imageHeight={70} imageWidth={70} folderName="studioVideo" />
          {/* <TextInput validate={required()} source="thumbnail" /> */}
          <ReferenceInput validate={required()}
          label="disease" source="studio_disease_id" reference="studio_disease">
        <SelectInput optionText="name" />
      </ReferenceInput>
          <ReferenceInput validate={required()} label="session" source="session_id" reference="studio_session">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput validate={required()} label="program" source="studio_program_id" reference="studio_program">
        <SelectInput optionText="name" />
      </ReferenceInput>
            <TextInput
              validate={required()}
              source="name"
            />
            <TextInput
              validate={required()}
              source="video_link"
            />
            <TextInput
              source="video_duration"
            />
              <TextInput
              source="video_description"
              multiline 
              fullWidth
            />
               <TextInput
              validate={required()}
              source="provided_by"
            />
             <TextInput
              source="provider_description"
              multiline 
              fullWidth
            />
             <TextInput
              source="provider_specialisation"
              multiline 
              fullWidth
            />
             <TextInput
              validate={required()}
              source="priority"
            />
        </SimpleForm>
      </Edit>
    </>
  );
};

export default StudioVideoEdit;
