import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GaugeChart from "react-gauge-chart/dist/GaugeChart";
import "./selectedItems.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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
}) {
  const [openModal, setOpenModal] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  const handleOpenModal = () => {
    setRiskScore(0.6);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRiskScore(0);
  };

  const handleClearClicked = () => {
    setIllnessNames([]);
    setSelectedItemsList({
      ...selectedItemsList,
      age: { value: 20, rating: 0 },
      existingIllness: {
        value: [],
        rating: 0,
      },
      foodType: { value: "", rating: 0 },
      //   foodHabits: { value: [], rating: 1 },
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
            height: "500px",
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
                    <h3>Age</h3>
                    <div>{selectedItemsList.age.value}</div>
                  </div>
                )}
                {selectedItemsList.existingIllness.rating !== 0 && (
                  <div className="single-value-card">
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
                {selectedItemsList.foodType.rating !== 0 && (
                  <div className="single-value-card">
                    <h3>Food Type</h3>
                    <div>{selectedItemsList.foodType.value}</div>
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
              Clear
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
              Your Risk Score is
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
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default SelectedItems;