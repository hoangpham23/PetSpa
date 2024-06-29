import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./CreateStaff_style.module.css";
import axios from "axios";
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
function CreateStaff({ open, onClose, getData }) {
  const [errors, setErrors] = React.useState({
    nameError: "",
    phoneNumberError: "",
    passwordError: "",
    emailError: "",
    employeeCINError: "",
    genderError: "",
  });
  const [newEmployee, setNewEmployee] = React.useState({
    name: "",
    phoneNumber: "",
    email: "",
    employeeCIN: "",
    gender: "",
  });
  React.useEffect(() => {
    console.log(newEmployee);
  }, [newEmployee]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?1?\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };
  async function handleSubmit() {
    try {
      const newErrors = {};
      if (newEmployee.name === "") {
        newErrors.nameError = "EmployeeName is required";
      }
      if (newEmployee.password === "") {
        newErrors.passwordError = "Password is required";
      }
      if (newEmployee.email === "") {
        newErrors.emailError = "Email is required";
      }
      if (newEmployee.phoneNumber === "") {
        newErrors.phoneNumberError = "Phone Number is required";
      }
      if (newEmployee.employeeCIN === "") {
        newErrors.employeeCINError = "Employee CIN is required";
      }
      if (newEmployee.gender === "") {
        newErrors.genderError = "Gender is required";
      }
      if (!validateEmail(newEmployee.email)) {
        newErrors.emailError = "Email is invalid";
      }
      if (!validatePhoneNumber(newEmployee.phoneNumber)) {
        newErrors.phoneNumberError = "Phone Number is invalid";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/admin/create-employee",
        newEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        getData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errorEmail) {
        setErrors({
          ...errors,
          emailError: "Email already exists",
        });
      }
      if (error.response.data.errorPhoneNumber) {
        setErrors({
          ...errors,
          phoneNumberError: "Phone Number already exists",
        });
      }
      if (error.response.data.errorEmployeeCIN) {
        setErrors({
          ...errors,
          employeeCINError: "Employee CIN already exists",
        });
      }
    }
  }
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              //value={newEmployee.employeeName}
              variant="filled"
              className={styles.customTextField}
              name="name"
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={!!errors.nameError}
              helperText={errors.nameError}
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
              //value={newEmployee.phoneNumber}
              variant="filled"
              className={styles.customTextField}
              name="phoneNumber"
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={!!errors.phoneNumberError}
              helperText={errors.phoneNumberError}
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
              //value={newEmployee.email}
              variant="filled"
              className={styles.customTextField}
              name="email"
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={!!errors.emailError}
              helperText={errors.emailError}
            />
          </Box>

          {/* PASSWORD */}
          {/* <Box
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
              // value={newEmployee.password}
              variant="filled"
              className={styles.customTextField}
              name="password"
              //onChange={handleInputChange}
              sx={{ width: "100%" }}
              //error={!!errors.passwordError}
              //helperText={errors.passwordError}
            />
          </Box> */}
          {/* EmployeeCIN */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              EmployeeCIN
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              //value={newEmployee.password}
              variant="filled"
              className={styles.customTextField}
              name="employeeCIN"
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={!!errors.employeeCINError}
              helperText={errors.employeeCINError}
            />
          </Box>
          {/* GENDER */}
          <Box
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
            <FormControl
              variant="filled"
              className={styles.customTextField}
              error={!!errors.genderError}
              helperText={errors.genderError}
            >
              <InputLabel id="status-label">Gender</InputLabel>
              <Select
                labelId="status-label"
                name="gender"
                //value={newEmployee.gender}
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
                  value="Female"
                  sx={{ fontSize: "1.6rem", textAlign: "left" }}
                >
                  Female
                </MenuItem>
                <MenuItem
                  value="Male"
                  sx={{ fontSize: "1.6rem", textAlign: "left" }}
                >
                  Male
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* SUBMIT BUTTONS */}
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
              onClick={handleSubmit}
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
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CreateStaff;
