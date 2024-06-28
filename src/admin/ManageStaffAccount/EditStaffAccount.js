import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Alert,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import styles from "./EditStaff_style.module.css";
import axios from "axios";
import SuccessfullyScreen from "../../components/sucessfullyScreen/SucessfullyScreen";
import CheckIcon from "@mui/icons-material/Check";

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
  fontSize: "1.6rem",
};

export default function EditStaffAccount({ open, employee, onClose }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  //   React.useEffect(() => {
  //     handleOpen();
  //   }, []);
  const [editEmployee, setEditEmployee] = React.useState(employee);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditEmployee({
      ...editEmployee,
      [name]: value,
    });
  };
  React.useEffect(() => {
    console.log(employee, "ne");
    console.log(editEmployee);
  }, [editEmployee]);

  async function onSave() {
    if (
      !editEmployee.employeeName ||
      !editEmployee.phoneNumber ||
      !editEmployee.email ||
      !editEmployee.password ||
      !editEmployee.gender
    ) {
      alert("Please fill all filed before saving !!!");
      return;
    }
    try {
      setTimeout(() => {
        onClose();
      }, 3000);
      const response = await axios.put("http://localhost:8090/admin/update", {
        employeeName: editEmployee.employeeName,
        phoneNumber: editEmployee.phoneNumber,
        email: editEmployee.email,
        password: editEmployee.password,
        employeeCIN: employee.employeeCIN,
        gender: employee.gender,
      });
      console.log(response);
      // <SuccessfullyScreen />;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, lineHeight: 3 }}>
          <Typography id="modal-modal-title" variant="h3">
            Information of employee
          </Typography>
          {/* NAME BOX */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Name
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={editEmployee.employeeName}
              variant="filled"
              className={styles.customTextField}
              name="employeeName"
              onChange={handleInputChange}
            />
          </Box>
          {/* PHONE NUMBER */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Phone Number
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={editEmployee.phoneNumber}
              variant="filled"
              className={styles.customTextField}
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </Box>
          {/* EMAIL BOX */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Email
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={editEmployee.email}
              variant="filled"
              className={styles.customTextField}
              name="email"
              onChange={handleInputChange}
            />
          </Box>
          {/* password */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Password
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={editEmployee.password}
              variant="filled"
              className={styles.customTextField}
              name="password"
              onChange={handleInputChange}
            />
          </Box>
          {/* gender */}

          {/* <Box
            sx={{ display: "flex", alignItems: "center", fontSize: "1.6rem" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Gender
            </Typography>
            <FormControl variant="filled" className={styles.customTextField}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={editEmployee.gender}
                onChange={handleInputChange}
                sx={{ fontSize: "1.6rem", width: "100%" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      textAlign: "left",
                    },
                  },
                }}
              >
                <MenuItem
                  value="Male"
                  sx={{
                    fontSize: "1.6rem",
                    textAlign: "left",
                  }}
                >
                  Male
                </MenuItem>
                <MenuItem
                  value="Female"
                  sx={{ fontSize: "1.6rem", textAlign: "left" }}
                >
                  Female
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}
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
                margin: "3rem 1rem",
                boxSizing: "content-box",
              }}
              onClick={() => {
                onSave();
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontSize: "1.6rem",
                margin: "3rem 1rem",
                boxSizing: "content-box",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
