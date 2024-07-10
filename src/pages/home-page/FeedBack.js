import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./FeedBack_style.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FeedBack({ open, handleClose }) {
  const [dropDownData, setDropDownData] = React.useState([]);
  const [selectingService, setSelectingService] = React.useState({
    feedbackID: "",
    appointmentTime: "",
    serviceName: "",
    petName: "",
    feedbackText: "",
  });
  React.useEffect(() => {
    if (dropDownData.length === 0 && open) {
      handleClose();
    }
  }, [dropDownData]);
  async function getFeedbackData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/feedback/choose-feedback?customerID=${localStorage.getItem(
          "customerID"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedData = response.data.map((item) => ({
          ...item,
          feedbackText: "",
        }));
        setDropDownData(updatedData);
        if (updatedData.length > 0) {
          setSelectingService(updatedData[0]); // Set the default selectingService
        }
      }
    } catch (error) {
      console.log(error);
      if (open) {
        alert("Error occured !!!");
        handleClose();
      }
    }
  }
  console.log("dropDownData length ngao:", dropDownData.length);
  React.useEffect(() => {
    getFeedbackData();
  }, []);
  React.useEffect(() => {
    console.log(selectingService);
  }, [selectingService]);

  const handleChange = (event) => {
    const selectedValue = dropDownData.find(
      (item) => item.feedbackID === event.target.value
    );
    setSelectingService(selectedValue);
  };
  const handleFeedbackChange = (event) => {
    const updatedData = dropDownData.map((item) =>
      item.feedbackID === selectingService.feedbackID
        ? { ...item, feedbackText: event.target.value }
        : item
    );
    setDropDownData(updatedData);
    setSelectingService({
      ...selectingService,
      feedbackText: event.target.value,
    });
  };
  const handleNext = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/feedback/submit",
        {
          feedbackID: selectingService.feedbackID,
          feedbackContent: selectingService.feedbackText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Successfully submit feedback");
        getFeedbackData();
        console.log("dropDownData length:", dropDownData.length);
        console.log(dropDownData.length === 0);
      }
    } catch (error) {
      console.log(error);
      if (open) {
        alert("Error occured !!!");
        handleClose();
      }
    }
  };
  async function saveCloseData() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/feedback/close",
        { customerID: parseInt(localStorage.getItem("customerID")) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      if (open) {
        alert("Error occured !!!");
        handleClose();
      }
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Feedback to your appointment
            </Typography>
            <IconButton
              aria-label="close"
              className={styles.closeButton}
              onClick={() => {
                saveCloseData();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <FormControl
            variant="filled"
            sx={{
              m: 1,
              minWidth: 150,
              width: "100%",
              marginTop: "2.5rem",
              fontSize: "2rem",
              marginLeft: "0rem",
            }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectingService ? selectingService.feedbackID : ""}
              onChange={handleChange}
              label="Feedback"
              sx={{
                fontSize: "2rem",
                marginTop: "2rem",
              }}
            >
              {dropDownData.map((item) => (
                <MenuItem
                  key={item.feedbackID}
                  value={item.feedbackID}
                  sx={{
                    fontSize: "1.6rem",
                  }}
                >
                  {item.petName} - {item.serviceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectingService && (
            <FillFeedBack
              selectingService={selectingService}
              setSelectingService={setSelectingService}
              dropDownData={dropDownData}
              setDropDownData={setDropDownData}
              handleFeedbackChange={handleFeedbackChange}
            />
          )}
          <Box mt={2} textAlign="right" sx={{ marginTop: "2rem" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleNext();
              }}
              sx={{
                color: "#333",
                padding: "0.3rem",
                backgroundColor: "rgba(216, 150, 216, 0.2)",
                borderRadius: "10px",
                boxShadow: " 0.2rem 0.2rem rgba(0, 0, 0, 0.2)",
                marginLeft: "auto",
                fontSize: "1.6rem",
                fontWeight: "500",
                border: "0.2rem solid transparent",
                "&:hover": {
                  background: "transparent",
                  color: "rgba(74, 12, 74, 1.2)",
                  // boxShadow:
                  //   " 0.1rem 0.1rem 0.1rem 0.1rem  rgba(74, 12, 74, 1.2)",
                  borderColor: " rgba(74, 12, 74, 1.2)",
                  fontWeight: "600",
                  transition: "0.2s ease",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
function FillFeedBack({ selectingService, handleFeedbackChange }) {
  return (
    <Box mt={2}>
      <TextField
        InputProps={{ style: { fontSize: "1.6rem" } }}
        InputLabelProps={{
          style: { fontSize: "1.6rem" }, // Chỉnh font size của label
        }}
        id="feedback-text"
        label="Enter Feedback"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={selectingService ? selectingService.feedbackText : ""}
        onChange={handleFeedbackChange}
      />
    </Box>
  );
}
