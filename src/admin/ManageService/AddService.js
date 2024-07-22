import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { TextField } from "@mui/material";
import styles from "./ManageService_style.module.css";
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

function AddService({ open, handleClose, getData }) {
  // URL (GET): http://localhost:8090/add-service
  //Params(formData): serviceName, description, price, image
  const [serviceName, setServiceName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState(null);

  const [serviceInfo, setServiceInfo] = React.useState([
    { serviceName: "" },
    { description: "" },
    { price: "" },
    { image: "" },
  ]);
  const fields = [
    { label: "Service Name", name: "serviceName" },
    { label: "Description", name: "description" },
    { label: "Price", name: "price" },
    { label: "Image URL", name: "image" },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "serviceName":
        setServiceName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/add-service",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status, "assss");
      console.log("Service added successfully:", response.data);
      if (response.status === 200) {
        alert("Sucessfuly add new service");
        getData();
        handleClose();
      }
      // Close modal or handle success state
    } catch (error) {
      console.error("Error adding service:", error);
      // Handle error state
    }
  };
  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Insert info for new service
            </Typography>
            <Box>
              <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
                    {fields.map((field) => (
                      <Grid item xs={12} md={12} key={field.name}>
                        {field.name === "image" ? (
                          <Box
                            sx={{
                              display: "flex",
                              // justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <label
                              htmlFor="file-input"
                              id="file-description"
                              style={{
                                fontSize: "1.6rem",
                                marginRight: "3rem",
                              }}
                            >
                              Choose image file:
                            </label>

                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{
                                fontSize: "1.6rem",
                                justifyContent: "right",
                              }}
                            />
                          </Box>
                        ) : (
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            value={serviceInfo[field.name]}
                            onChange={handleInputChange}
                            variant="outlined"
                          />
                        )}
                      </Grid>
                    ))}
                    <Grid
                      item
                      xs={12}
                      md={12}
                      justifyContent="flex-end"
                      dislay="flex"
                    >
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          type="submit"
                          variant="contained"
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
                          }}
                        >
                          ADD NEW
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddService;
