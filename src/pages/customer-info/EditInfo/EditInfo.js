import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import styles from "./EditInfo_style.module.css";
import { EmailOutlined } from "@mui/icons-material";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: "1.6rem",
};

export default function EditInfo({
  isOpen,
  handleCloseEdit,
  cusInfo,
  setCusInfo,
  getData,
}) {
  const [newInfo, setNewInfo] = React.useState({
    customerID: cusInfo.customerID,
    customerName: cusInfo.customerName,
    email: cusInfo.email,
    numberOfPets: cusInfo.numberOfPets,
    password: cusInfo.password,
    phoneNumber: cusInfo.phoneNumber,
    role: cusInfo.role,
  });
  React.useEffect(() => {
    setNewInfo({
      customerID: cusInfo.customerID,
      customerName: cusInfo.customerName,
      email: cusInfo.email,
      numberOfPets: cusInfo.numberOfPets,
      password: cusInfo.password,
      phoneNumber: cusInfo.phoneNumber,
      role: cusInfo.role,
    });
  }, [cusInfo]);

  React.useEffect(() => {
    console.log(newInfo, "neeee");
  }, [newInfo]);
  console.log(newInfo, "ne");
  console.log(cusInfo);
  async function onSave() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8090/edit-account",
        {
          customerID: newInfo.customerID,
          email: newInfo.email,
          customerName: newInfo.customerName,
          phoneNumber: newInfo.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCusInfo({
          ...cusInfo,
          email: newInfo.email,
          name: newInfo.name,
          phoneNumber: newInfo.phoneNumber,
        });
        console.log("Saving to localStorage:", newInfo);
        localStorage.setItem("account", JSON.stringify(newInfo));
        getData();
        setTimeout(() => {
          alert("Successfully updating !!!");
          //window.location.reload();
          handleCloseEdit();
        }, 1000);
      }
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  }
  function handleInput(event) {
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value });
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.boxInfo}>
          <Typography id="modal-modal-title" variant="h3">
            Information of customer
          </Typography>
          {/* Email */}
          <Box className={styles.item}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4} className={styles.description}>
                <Box>
                  <p>Email</p>
                </Box>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ alignItems: "start" }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    value={newInfo.email}
                    name="email"
                    onChange={handleInput}
                    className={styles.customtextField}
                    InputProps={{
                      style: { fontSize: "1.6rem" },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* PhoneNumber */}
          <Box className={styles.item}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4} className={styles.description}>
                <Box>
                  <p>Phone Number</p>
                </Box>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ alignItems: "start" }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    value={newInfo.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInput}
                    className={styles.customtextField}
                    InputProps={{
                      style: { fontSize: "1.6rem" },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* Name */}
          <Box className={styles.item}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4} className={styles.description}>
                <Box>
                  <p>Name</p>
                </Box>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ alignItems: "start" }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    name="customerName"
                    onChange={handleInput}
                    value={newInfo.customerName}
                    className={styles.customtextField}
                    InputProps={{
                      style: { fontSize: "1.6rem" },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              justifyContent: "end",
              fontSize: "1.6rem",
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: "1.6rem",
                margin: "3rem 1rem 1rem 1rem",
                backgroundColor: "#1976d2",
              }}
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: "1.6rem",
                margin: "3rem 1rem 1rem 1rem",
                backgroundColor: "#d32f2f",
              }}
              onClick={handleCloseEdit}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
