import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { EXISTING_ILLINESS, FOOD_HABITS } from "../../constants/appConstants";
import SelectedItems from "../selectedItems/selectedItems";
import { PrettoSlider } from "../slider/slider";
import "./home.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Home() {
  const [selectedItemsList, setSelectedItemsList] = useState({
    age: { value: 20, rating: 0 },
    existingIllness: { value: [], rating: 0 },
    foodType: { value: "", rating: 0 },
    foodHabits: { value: [], rating: 0 },
  });
  const [illnessNames, setIllnessNames] = useState([]);
  const [foodHabitNames, setFoodHabitNames] = useState([]);
  const [ratingBool, setRatingBool] = useState(0);

  const handleAgeChange = (event, ageChange) => {
    setSelectedItemsList({
      ...selectedItemsList,
      age: { value: ageChange, rating: ageChange / 100 },
    });
    calculateRatingBool();
  };

  const handleIllnessChange = (event) => {
    const illnessValue = event.target.value;
    const selectedIllnessList =
      typeof illnessValue === "string" ? illnessValue.split(",") : illnessValue;
    setIllnessNames(selectedIllnessList);
    setSelectedItemsList({
      ...selectedItemsList,
      existingIllness: {
        value: selectedIllnessList,
        rating: selectedIllnessList.length / EXISTING_ILLINESS.length,
      },
    });
    calculateRatingBool();
  };

  const handleFoodHabitChange = (event) => {
    const foodHabitValue = event.target.value;
    const selectedFoodHabitList =
      typeof foodHabitValue === "string"
        ? foodHabitValue.split(",")
        : foodHabitValue;
    setFoodHabitNames(selectedFoodHabitList);
    let givenRatingAdded = 0;
    selectedFoodHabitList.forEach((element) => {
      givenRatingAdded += getRatingFromList(FOOD_HABITS, element);
    });
    setSelectedItemsList({
      ...selectedItemsList,
      foodHabits: {
        value: selectedFoodHabitList,
        rating: selectedFoodHabitList.length
          ? givenRatingAdded / selectedFoodHabitList.length
          : 0,
      },
    });
    console.log(selectedItemsList);
    calculateRatingBool();
  };

  const handleFoodTypeChange = (event, newFoodType) => {
    let givenRating;
    switch (newFoodType) {
      case "Vegetarian":
        givenRating = 0.1;
        break;
      case "Non-Vegetarian":
        givenRating = 0.3;
        break;
      default:
        givenRating = 0;
        break;
    }
    setSelectedItemsList({
      ...selectedItemsList,
      foodType: {
        value: newFoodType,
        rating: givenRating,
      },
    });
    calculateRatingBool();
  };

  const calculateRatingBool = () => {
    const selectedItemsListCopy = selectedItemsList;
    let addedRating = 0;
    let multipliedRating = 1;
    Object.keys(selectedItemsListCopy).forEach((key) => {
      if (key !== "existingIllness") {
        multipliedRating *= selectedItemsListCopy[key].rating;
      }
      addedRating += selectedItemsListCopy[key].rating;
    });
    setRatingBool({
      addedRating,
      multipliedRating,
    });
  };

  const getRatingFromList = (list, item) => {
    const listItem = list.find((element) => element.name === item);
    return listItem.rating;
  };

  useEffect(() => {
    calculateRatingBool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemsList]);

  return (
    <>
      <div className="home-outer">
        <Container
          sx={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            mr: 0,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              px: 3,
              pb: 2,
              height: "510px",
              bgcolor: "#EEEEEE",
              width: "100%",
            }}
          >
            <div>
              <h1 className="header-text">Health Risk Calculator</h1>
              <hr className="divider-line"></hr>
            </div>
            <div className="form-outer">
              <div>
                <h3 className="required">Select Age</h3>
                <div className="age-slider">
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    onChange={handleAgeChange}
                    value={selectedItemsList.age.value}
                    aria-label="slider"
                    min={20}
                  />
                </div>
              </div>
              <div>
                <h3 className="required">Food Type</h3>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedItemsList.foodType.value}
                  name="radio-buttons-group"
                  row
                  onChange={handleFoodTypeChange}
                >
                  <FormControlLabel
                    value="Vegetarian"
                    control={<Radio color="success" />}
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    value="Non-Vegetarian"
                    control={<Radio color="success" />}
                    label="Non-Vegetarian"
                  />
                </RadioGroup>
              </div>
              <div>
                <h3 className="required">Food Habits</h3>
                <div>
                  <FormControl sx={{ mx: 1, mt: 1, width: 500 }}>
                    <InputLabel
                      color="success"
                      id="demo-multiple-checkbox-label"
                    >
                      Select Food Habits
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      color="success"
                      value={foodHabitNames}
                      onChange={handleFoodHabitChange}
                      input={<OutlinedInput label="Select Food Habits" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {FOOD_HABITS.map((food, index) => (
                        <MenuItem key={food.name} value={food.name}>
                          <Checkbox
                            color="success"
                            checked={foodHabitNames.indexOf(food.name) > -1}
                          />
                          <Tooltip title={food.description} arrow>
                            <ListItemText primary={food.name} />
                          </Tooltip>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <h3>Existing Illness</h3>
                <div>
                  <FormControl sx={{ mx: 1, mt: 1, mb: 3, width: 500 }}>
                    <InputLabel
                      color="success"
                      id="demo-multiple-checkbox-label"
                    >
                      Select Illness
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      color="success"
                      value={illnessNames}
                      onChange={handleIllnessChange}
                      input={<OutlinedInput label="Select Illness" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {EXISTING_ILLINESS.map((illness, index) => (
                        <MenuItem key={illness.name} value={illness.name}>
                          <Checkbox
                            color="success"
                            checked={illnessNames.indexOf(illness.name) > -1}
                          />
                          <Tooltip title={illness.description} arrow>
                            <ListItemText primary={illness.name} />
                          </Tooltip>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </Paper>
        </Container>
        <SelectedItems
          selectedItemsList={selectedItemsList}
          setSelectedItemsList={setSelectedItemsList}
          ratingBool={ratingBool}
          setIllnessNames={setIllnessNames}
          setFoodHabitNames={setFoodHabitNames}
        ></SelectedItems>
      </div>
    </>
  );
}

export default Home;
