import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import styles from "./EditStaff_style.css";

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
          <Typography
            id="modal-modal-title"
            variant="h3"
            //component="h2"
          >
            Information of employee
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              id="modal-modal-description"
              //sx={{ mt: 2, marginRight: 2, fontSize: "1.6rem" }}
              className={style.customTypography}
            >
              Name
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={employee.employeeName}
              variant="filled"
              className={style.customTextField}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, marginRight: 2 }}
            >
              Name
            </Typography>
            <TextField
              required
              id="filled-required"
              label="Required"
              defaultValue={employee.employeeName}
              variant="filled"
            />
          </Box>
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
