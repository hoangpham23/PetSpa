import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { format } from "date-fns";
import ChooseTime from "./ChooseTime";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// BOX CHOOSE NEW TIME

// CHOOSE WHAT SERVICE TO RESCHEDULE
export default function Reschedule({ open, handleClose, listService }) {
  const [selectedServices, setSelectedServices] = React.useState([]);
  React.useEffect(() => {
    if (listService && listService.length > 0) {
      const initialSelectedServices = listService.map((service) => ({
        ...service,
        selected: false, // Default to selected
      }));
      setSelectedServices(initialSelectedServices);
    }
  }, [listService]);
  const [openChooseTime, setOpenChooseTime] = React.useState(false);
  const handleOpenChooseTime = () => {
    setOpenChooseTime(true);
  };
  const handleCloseChooseTime = () => {
    setOpenChooseTime(false);
  };
  const handleCheckboxChange = (index) => {
    const updatedServices = [...selectedServices];
    updatedServices[index].selected = !updatedServices[index].selected;
    setSelectedServices(updatedServices);
  };

  const handleSave = () => {
    const selected = selectedServices.filter((service) => service.selected);
    // console.log("Selected services:", selected);
    // console.log("Selected services length:", selected.length);
    if (selected.length > 0) {
      handleOpenChooseTime();
    }
  };
  if (!open || !listService || listService.length === 0) {
    return null; // Render nothing if modal should not be open or listService is empty
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2
            id="parent-modal-title"
            style={{ fontSize: "2rem", margin: "2rem" }}
          >
            Reschedule Services
          </h2>

          <Grid container spacing={2}>
            {selectedServices.map((service, index) => (
              <Grid
                item
                key={service.appointmentID}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={service.selected}
                      onChange={() => handleCheckboxChange(index)}
                      name={service.serviceName}
                      sx={{ fontSize: "1.6rem", margin: "1rem 0.5rem" }}
                    />
                  }
                  label={
                    <span
                      style={{ fontSize: "1.6rem", margin: "1rem 0.5rem" }}
                    >{`${service.serviceName} - ${format(
                      new Date(service.appointmentTime),
                      "dd/MM/yyyy HH:mm"
                    )}`}</span>
                  }
                />
              </Grid>
            ))}
          </Grid>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              mt: 2,
              fontSize: "1.6rem",
              margin: "2rem",
              display: "flex",
              marginLeft: "auto",
            }}
          >
            Next Step
          </Button>
          <ChooseTime
            openChooseTime={openChooseTime}
            handleCloseChooseTime={handleCloseChooseTime}
            selectedServices={selectedServices.filter(
              (service) => service.selected
            )}
          />
        </Box>
      </Modal>
    </div>
  );
}
