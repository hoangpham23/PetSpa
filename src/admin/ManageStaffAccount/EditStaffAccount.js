import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import styles from "./EditStaff_style.module.css";

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
              defaultValue={employee.employeeName}
              variant="filled"
              className={styles.customTextField}
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
              defaultValue={employee.phoneNumber}
              variant="filled"
              className={styles.customTextField}
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
              defaultValue={employee.email}
              variant="filled"
              className={styles.customTextField}
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
              defaultValue={employee.password}
              variant="filled"
              className={styles.customTextField}
            />
          </Box>
          {/* employeeCIN */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              CIN
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={employee.employeeCIN}
              variant="filled"
              className={styles.customTextField}
            />
          </Box>
          {/* gender */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            className={styles.InfoItem}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={styles.customTypography}
            >
              Gender
            </Typography>
            <FormControl fullWidth sx={{ fontSize: "1.6rem" }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                value={editEmployee.gender}
                //onChange={handleGenderChange}
                label="Gender"
                sx={{
                  fontSize: "1.6rem",

                  width: "60%",
                }}
                className={styles.customTextField}
              >
                <MenuItem value="male" sx={{ fontSize: "1.6rem" }}>
                  Male
                </MenuItem>
                <MenuItem value="female" sx={{ fontSize: "1.6rem" }}>
                  Female
                </MenuItem>
                <MenuItem value="other" sx={{ fontSize: "1.6rem" }}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button onClick={onClose}>UPDATE</Button>
        </Box>
      </Modal>
    </div>
  );
}
// export default function EditStaffAccount({ open, employee, onClose }) {
//   React.useEffect(() => {
//     // Side effects on mount
//   }, []);

//   return (
//     <div style={{ display: open ? "block" : "none" }}>
//       <Box sx={style}>
//         <Typography variant="h6" component="h2">
//           Edit Employee
//         </Typography>
//         {/* Content to edit */}
//         <button onClick={onClose}>Close</button>
//       </Box>
//     </div>
//   );
// }
