import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  required,
} from "react-admin";
import { getChoices } from "../../utils";
import {
  MEASUREMENT_UNITS,
  RECIPE_PREPARATION_COMPLEXITY,
} from "./RecipeCreate";
import EditToolbarWithoutDelete from "../EditToolbarWithoutDelete";
import RichTextInput from "ra-input-rich-text";
import ImageField from "./imageField";
import GoodForField from "./goodForField";

const RecipeEdit = (props) => {
  const [imageLink, setImageLink] = React.useState("");
  const [goodForIds, setGoodForIds] = React.useState([]);
  const imageRef = React.useRef();
  imageRef.current = imageLink;
  const goodForRef = React.useRef();
  goodForRef.current = goodForIds;

  const transform = (data) => {
    console.log({ data });
    return {
      ...data,
      image_url: imageRef.current,
      good_for: goodForRef.current,
    };
  };

  return (
    <>
      <Edit mutationMode={"pessimistic"} transform={transform} {...props}>
        <SimpleForm redirect={false} toolbar={<EditToolbarWithoutDelete />}>
          <TextInput disabled source="id" />
          <ImageField imageLink={imageLink} setImageLink={setImageLink} imageHeight={150}imageWidth={150} folderName="recipeImage"/>
          <TextInput source="name" validate={required()} />
          <SelectInput
            source="measurement_unit"
            lable="Measurement Unit"
            choices={getChoices(MEASUREMENT_UNITS)}
            validate={required()}
          />
          <TextInput validate={required()} source="description" multiline />
          <RichTextInput validate={required()} source="recipe" />
          <TextInput
            validate={required()}
            source="preparation_time"
            lable="Preparation time"
          />
          <SelectInput
            validate={required()}
            source="preparation_complexity"
            label="Preparation Complexity"
            choices={getChoices(RECIPE_PREPARATION_COMPLEXITY)}
          />
          <GoodForField goodForIds={goodForIds} setGoodForIds={setGoodForIds} />
          <NumberInput validate={required()} source="calories" />
          <NumberInput validate={required()} source="carbs" />
          <NumberInput validate={required()} source="protein" />
          <NumberInput validate={required()} source="fats" />
          <NumberInput validate={required()} source="fibre" />
          <TextInput source="preparation_video_link" label="Video url" />
        </SimpleForm>
      </Edit>
    </>
  );
};

export default RecipeEdit;
