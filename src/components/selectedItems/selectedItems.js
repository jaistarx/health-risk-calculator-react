import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade,
    Modal,
    Paper,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import GaugeChart from "react-gauge-chart/dist/GaugeChart";
import { FaTimes } from "react-icons/fa";
import "./selectedItems.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "80%",
  bgcolor: "#053B50",
  color: "white",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  textAlign: "center",
  p: 4,
};

function SelectedItems({
  selectedItemsList,
  setSelectedItemsList,
  ratingBool,
  setIllnessNames,
  setFoodHabitNames,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  const handleOpenModal = () => {
    let totalRating = 0;
    console.log(selectedItemsList);
    Object.values(selectedItemsList).forEach((value) => {
      totalRating += value.rating;
    });

    setRiskScore(
      (totalRating / Object.keys(selectedItemsList).length).toFixed(2)
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRiskScore(0);
  };

  const handleCloseCard = (key) => {
    switch (key) {
      case "existingIllness":
        setIllnessNames([]);
        setSelectedItemsList({
          ...selectedItemsList,
          existingIllness: {
            value: [],
            rating: 0,
          },
        });
        break;
      case "foodHabits":
        setFoodHabitNames([]);
        setSelectedItemsList({
          ...selectedItemsList,
          foodHabits: { value: [], rating: 0 },
        });
        break;
      case "foodType":
        setSelectedItemsList({
          ...selectedItemsList,
          foodType: { value: "", rating: 0 },
        });
        break;
      case "age":
        setSelectedItemsList({
          ...selectedItemsList,
          age: { value: 20, rating: 0 },
        });
        break;
      default:
        break;
    }
  };

  const handleClearClicked = () => {
    setIllnessNames([]);
    setFoodHabitNames([]);
    setSelectedItemsList({
      ...selectedItemsList,
      age: { value: 20, rating: 0 },
      existingIllness: {
        value: [],
        rating: 0,
      },
      foodType: { value: "", rating: 0 },
      foodHabits: { value: [], rating: 0 },
    });
  };

  return (
    <>
      <Container sx={{ height: "100%", width: "30%", ml: 0 }}>
        <Paper
          elevation={3}
          sx={{
            px: 3,
            pt: 2,
            height: "510px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "#EEEEEE",
          }}
        >
          <div className="form-container">
            {ratingBool.addedRating === 0 && (
              <div className="select-an-item-text">
                <h3>
                  Select an item <br></br>from the list
                </h3>
              </div>
            )}
            {ratingBool.addedRating !== 0 && (
              <div className="form-outer-selected-items">
                {selectedItemsList.age.rating !== 0 && (
                  <div className="single-value-card">
                    <div
                      className="close-icon"
                      onClick={() => handleCloseCard("age")}
                    >
                      <FaTimes />
                    </div>
                    <h3>Age</h3>
                    <div>{selectedItemsList.age.value}</div>
                  </div>
                )}

                {selectedItemsList.foodType.rating !== 0 && (
                  <div className="single-value-card">
                    <div
                      className="close-icon"
                      onClick={() => handleCloseCard("foodType")}
                    >
                      <FaTimes />
                    </div>
                    <h3>Food Type</h3>
                    <div>{selectedItemsList.foodType.value}</div>
                  </div>
                )}
                {selectedItemsList.foodHabits.rating !== 0 && (
                  <div className="single-value-card">
                    <div
                      className="close-icon"
                      onClick={() => handleCloseCard("foodHabits")}
                    >
                      <FaTimes />
                    </div>
                    <h3>Food Habits</h3>
                    <div>
                      {selectedItemsList.foodHabits.value.map((name, index) => (
                        <>
                          <span>
                            {name}
                            {index !==
                              selectedItemsList.foodHabits.value.length - 1 && (
                              <>,</>
                            )}{" "}
                          </span>
                        </>
                      ))}
                    </div>
                  </div>
                )}
                {selectedItemsList.existingIllness.rating !== 0 && (
                  <div className="single-value-card">
                    <div
                      className="close-icon"
                      onClick={() => handleCloseCard("existingIllness")}
                    >
                      <FaTimes />
                    </div>
                    <h3>Existing Illness</h3>
                    <div>
                      {selectedItemsList.existingIllness.value.map(
                        (name, index) => (
                          <>
                            <span>
                              {name}
                              {index !==
                                selectedItemsList.existingIllness.value.length -
                                  1 && <>,</>}{" "}
                            </span>
                          </>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="button-group">
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mr: 1 }}
              onClick={handleOpenModal}
              disabled={!ratingBool.multipliedRating}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ ml: 1 }}
              onClick={handleClearClicked}
              disabled={!ratingBool.addedRating}
            >
              Clear All
            </Button>
          </div>
        </Paper>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Your Health Risk Score
            </Typography>
            <GaugeChart
              id="gauge-chart1"
              nrOfLevels={20}
              arcPadding={0.02}
              animDelay={0}
              percent={riskScore}
              formatTextValue={() => riskScore}
              needleColor="#176B87"
              needleBaseColor="#64CCC5"
            />
            <Typography
              className="indicator-text"
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
              {riskScore !== 0 && (
                <>
                  {riskScore >= 0 && riskScore <= 0.33 && (
                    <h4>
                      Congrats!...Your Health Risk Score is{" "}
                      <span className="low-text">Low</span>
                    </h4>
                  )}
                  {riskScore >= 0.34 && riskScore <= 0.64 && (
                    <h4>
                      Your Health Risk Score is{" "}
                      <span className="medium-text">Medium</span>
                    </h4>
                  )}
                  {riskScore >= 0.65 && riskScore <= 1 && (
                    <h4>
                      Your Health Risk Score is{" "}
                      <span className="high-text">High</span>...Its time to do
                      something!
                    </h4>
                  )}
                  {riskScore === 0 && (
                    <>
                      <h4>
                        Your Health Risk Score is{" "}
                        <span className="high-text">High</span>...Its time to do
                        something!
                      </h4>
                    </>
                  )}
                </>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default SelectedItems;
