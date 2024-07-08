import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { set } from "date-fns";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LimitMaxSlot({ handleClose, open }) {
  const [maxSlot, setMaxSlot] = React.useState(null);
  const [error, setError] = React.useState("");
  async function getData() {
    setMaxSlot(0);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8090/admin/getMaxBooking",
        { maxSlot },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setMaxSlot(response.data);
      }
    } catch (error) {
      console.log(error);
      if (open) {
        alert("Errors have been occured !!!");
        handleClose();
      }
    }
  }
  React.useEffect(() => {
    getData();
  }, []);

  async function handleSubmit() {
    if (maxSlot === "") {
      setError("This field is required");
      return;
    }

    if (isNaN(maxSlot) || maxSlot <= 0) {
      setError("Value must be a positive number");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/admin/updateMaxBooking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMaxSlot(response.data);
      }
    } catch (error) {
      console.log(error);
      if (open) {
        alert("Errors havae been occured while submitting ");
        handleClose();
      }
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            MAX APPOINTMENT IN A SLOT
          </Typography>
          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            value={maxSlot}
            helperText={error}
            sx={{ marginTop: "3rem", width: "100%" }}
            onChange={(e) => setMaxSlot(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "rgb(249, 207, 211)",
                borderRadius: "10px",
                boxShadow: " 0.1rem 0.1rem rgba(0, 0, 0, 0.2)",
                color: "#333",
                marginLeft: "auto",
                "&:hover": {
                  background: "transparent",
                  color: "#0b5864",
                  border: "0.1rem solid transparent",
                  borderColor: "#0b5864",
                  fontWeight: "600",
                  transition: "0.5s ease",
                },
                marginTop: "3rem",
              }}
            >
              SAVE CHANGES
            </Button>
            {}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
