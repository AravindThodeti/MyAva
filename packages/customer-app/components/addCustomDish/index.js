import { useState } from "react";
import { createCustomRecipe } from "@/utils/ApiUtils";
import { Button, FormControl } from "@material-ui/core";
import styles from "./addCustomDish.module.scss";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

export const AddCustomDishForm = ({
  setAddNewRecipe,
  setNotFoundContent,
  setAddmeal,
  setDishNotAvailable,
}) => {
  const recipe = {
    name: "",
    calories: "",
    measurement_unit: "",
    description: "",
  };

  const titles = [
    { name: "GM", value: "GM" },
    { name: "PIECE", value: "PIECE" },
    { name: "GLASS", value: "GLASS" },
    { name: "KATORI", value: "KATORI" },
    { name: "CUP", value: "CUP" },
    { name: "BOWL", value: "BOWL" },
    { name: "TABLESPOON", value: "TABLESPOON" },
    { name: "LITRE", value: "LITRE" },
  ];
  const [title, setTitle] = useState("");
  const [newDish, setNewDish] = useState(recipe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value,
    });
  };
  function change(e) {
    setTitle(e.target.value);

    handleChange(e);
  }
  let value;
  const handleSubmit = async () => {
    value = false;
    mandatoryCheck();
    if (value === true) {
      const newMeal = await createCustomRecipe(newDish);
      await setAddmeal(newMeal);
      setAddNewRecipe(false);
      setNotFoundContent(false);
      setDishNotAvailable(false);
    }
  };

  function mandatoryCheck() {
    let dishName = document.getElementById("input1").value;

    if (dishName != "" && title != "") {
      value = true;
    }
    let inputFieldsArray = [dishName, title];
    for (let i = 0; i < inputFieldsArray.length; i++) {
      if (inputFieldsArray[i] === "") {
        document.getElementById("input" + [i + 1].toString()).style.border =
          "2px solid red";
      } else {
        document.getElementById("input" + [i + 1].toString()).style.border =
          "transparent";
      }
    }
  }

  return (
    <div className={styles.formContent}>
      <div className={styles.dishNotFound}>
        <h6 className={styles.labelHeading}>Didn't find dish?</h6>
        <div>
          <form className={styles.userDishForm}>
            <FormControl>
              <label htmlFor="name" className={styles.labelHeading}>
                DishName
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Text"
                value={newDish.name}
                onChange={handleChange}
                id="input1"
              />
            </FormControl>
            <FormControl className={styles.selectionList}>
              <label htmlFor="measurement_unit" className={styles.labelHeading}>
                Measurement Units
              </label>
              <InputLabel id="measurement_unit" className={styles.chooseUnits}>
                {title === "" ? "Choose units" : null}
              </InputLabel>

              <Select
                name="measurement_unit"
                value={newDish.measurement_unit}
                onChange={change}
                id="input2"
                required={true}
                className={styles.list}
              >
                {titles.map((item, i) => (
                  <MenuItem key={i} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <label htmlFor="calories" className={styles.labelHeading}>
                Kilo Calories(optional)
              </label>
              <input
                type="number"
                name="calories"
                placeholder="Enter Text"
                value={newDish.calories}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="description" className={styles.labelHeading}>
                Description(optional)
              </label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter Text"
                rows="10"
                value={newDish.description}
                onChange={handleChange}
              />
            </FormControl>
            <div className={styles.formButton}>
              <Button className={styles.AddNewButton} onClick={handleSubmit}>
                Add New
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
