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
import { EXISTING_ILLINESS } from "../../constants/appConstants";
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
    // foodHabits: { value: [], rating: 1 },
  });
  const [illnessNames, setIllnessNames] = React.useState([]);
  const [ratingBool, setRatingBool] = React.useState(0);

  const handleAgeChange = (event, ageChange) => {
    setSelectedItemsList({
      ...selectedItemsList,
      age: { value: ageChange, rating: 2 },
    });
    calculateRatingBool();
  };

  const handleIllnessChange = (event, index) => {
    const selectedIllnessList =
      typeof value === "string"
        ? event.target.value.split(",")
        : event.target.value;
    setIllnessNames(selectedIllnessList);
    setSelectedItemsList({
      ...selectedItemsList,
      existingIllness: {
        value: selectedIllnessList,
        rating: selectedIllnessList.length,
      },
    });
    calculateRatingBool();
  };

  const handleFoodTypeChange = (event, newFoodType) => {
    setSelectedItemsList({
      ...selectedItemsList,
      foodType: { value: newFoodType, rating: 2 },
    });
    calculateRatingBool();
  };

  const calculateRatingBool = () => {
    const selectedItemsListCopy = selectedItemsList;
    let addedRating = 0;
    let multipliedRating = 1;
    Object.values(selectedItemsListCopy).forEach((value) => {
      addedRating += value.rating;
      multipliedRating *= value.rating;
    });
    setRatingBool({
      addedRating,
      multipliedRating,
    });
  };

  useEffect(() => {
    calculateRatingBool();
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
            my: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              px: 3,
              pb: 2,
              height: "500px",
              bgcolor: "#EEEEEE",
              width: "100%",
            }}
          >
            <div>
              <h1 className="header-text">Risk Calculator</h1>
              <hr className="divider-line"></hr>
            </div>
            <div className="form-outer">
              <div>
                <h3>Select Age</h3>
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
                <h3>Existing Illness</h3>
                <div>
                  <FormControl sx={{ m: 1, width: "96%" }}>
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
              <div>
                <h3>Food Type</h3>
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
                <h3>Food Habits</h3>
              </div>
            </div>
          </Paper>
        </Container>
        <SelectedItems
          selectedItemsList={selectedItemsList}
          setSelectedItemsList={setSelectedItemsList}
          ratingBool={ratingBool}
          setIllnessNames={setIllnessNames}
        ></SelectedItems>
      </div>
    </>
  );
}

export default Home;
