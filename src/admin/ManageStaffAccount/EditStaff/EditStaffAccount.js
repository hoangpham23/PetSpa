import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./EditStaff_style.module.css";
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
  fontSize: "1.6rem",
};

export default function EditStaffAccount({ open, employee, onClose, getData }) {
  const [editEmployee, setEditEmployee] = React.useState(employee);
  const [errors, setError] = React.useState({
    nameError: "",
    phoneNumberError: "",
    passwordError: "",
    emailError: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditEmployee({
      ...editEmployee,
      [name]: value,
    });
  };

  React.useEffect(() => {
    setEditEmployee(employee);
  }, [employee]);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?1?\d{10,15}$/;
    return phoneRegex.test(phoneNumber);
  };
  async function onSave() {
    const newErrors = {};

    if (editEmployee.employeeName === "") {
      newErrors.nameError = "EmployeeName is required";
    }
    if (editEmployee.password === "") {
      newErrors.passwordError = "Password is required";
    }
    if (editEmployee.email === "") {
      newErrors.emailError = "Email is required";
    }
    if (editEmployee.phoneNumber === "") {
      newErrors.phoneNumberError = "Phone Number is required";
    }
    if (!validateEmail(editEmployee.email)) {
      newErrors.emailError = "Email is invalid";
    }
    if (!validatePhoneNumber(editEmployee.phoneNumber)) {
      newErrors.phoneNumberError = "Phone Number is invalid";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8090/admin/update",
        {
          employeeID: employee.employeeID,
          employeeName: editEmployee.employeeName,
          email: editEmployee.email,
          password: editEmployee.password,
          phoneNumber: editEmployee.phoneNumber,
          employeeCIN: employee.employeeCIN,
          gender: employee.gender,
          status: editEmployee.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          getData();
          onClose();
          alert("Successfully updating");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      if (error.response.data.email) {
        setError({
          ...errors,
          emailError: "Email already exists",
        });
      }
      // if (error.response.data.phoneNumber) {
      //   setError({
      //     ...errors,
      //     phoneNumberError: "Phone number already exists",
      //   });
      // }
    }
  }

  return (
    <div>
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
              value={editEmployee.employeeName}
              variant="filled"
              className={styles.customTextField}
              name="employeeName"
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
              value={editEmployee.phoneNumber}
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
              value={editEmployee.email}
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
              value={editEmployee.password}
              variant="filled"
              className={styles.customTextField}
              name="password"
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={!!errors.passwordError}
              helperText={errors.passwordError}
            />
          </Box>
          {/* STATUS */}
          <Box
            sx={{ display: "flex", alignItems: "center", fontSize: "1.6rem" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              STATUS
            </Typography>
            <FormControl variant="filled" className={styles.customTextField}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={editEmployee.status}
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
                  value="ACTIVE"
                  sx={{ fontSize: "1.6rem", textAlign: "left" }}
                >
                  ACTIVE
                </MenuItem>
                <MenuItem
                  value="INACTIVE"
                  sx={{ fontSize: "1.6rem", textAlign: "left" }}
                >
                  INACTIVE
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
