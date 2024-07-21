import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, TextField } from "@mui/material";
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
};

export default function EditAndDeleteService({
  open,
  handleClose,
  service,
  getData,
}) {
  console.log(service);
  const [serviceInfo, setServiceInfo] = React.useState({
    serviceName: "",
    description: "",
    price: "",
    status: "",
    imageURL: "",
    imageFile: null,
  });
  React.useEffect(() => {
    if (open) {
      // Reset serviceInfo when modal closes
      setServiceInfo({
        serviceName: service.serviceName || "",
        description: service.description || "",
        price: service.price || "",
        status: service.status || "",
        imageURL: service.imageURL || "",
        //imageFile: handleImageURLChange(service.imageURL) || "",
      });
    }
  }, [open]);

  React.useEffect(() => {
    if (service) {
      setServiceInfo({
        serviceName: service.serviceName || "",
        description: service.description || "",
        price: service.price || "",
        status: service.status || "",
        imageURL: service.imageURL || "",
        //imageFile: handleImageURLChange(service.imageURL) || "",
      });
    }
  }, [service]);
  const fields = [
    { label: "Service Name", name: "serviceName" },
    { label: "Description", name: "description" },
    { label: "Price", name: "price" },
    // { label: "Status", name: "status" },
    //{ label: "Image URL", name: "image" },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Update serviceInfo with the selected file
      setServiceInfo((prevInfo) => ({
        ...prevInfo,
        imageFile: file,
        imageURL: URL.createObjectURL(file), // Optionally update imageURL to display preview
      }));
    }
  };
  // const fetchImageAsBlob = async (imageUrl) => {
  //   try {
  //     const response = await axios.get(imageUrl, {
  //       responseType: "blob", // Đảm bảo rằng axios trả về dữ liệu dạng Blob
  //     });

  //     return response.data; // Trả về Blob dữ liệu hình ảnh
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //     throw new Error("Error fetching image");
  //   }
  // };
  // const handleImageURLChange = async (imageUrl) => {
  //   try {
  //     const imageBlob = await fetchImageAsBlob(imageUrl);

  //     // Convert blob to File
  //     const imageFile = new File([imageBlob], "image.jpg", {
  //       type: "image/jpeg",
  //     });

  //     setServiceInfo((prevInfo) => ({
  //       ...prevInfo,
  //       imageURL: imageUrl,
  //       imageFile: imageFile,
  //     }));
  //   } catch (error) {
  //     console.error("Error converting image URL to file:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceInfo.serviceName.trim()) {
      alert("Service name cannot be empty");
      return;
    }
    if (!isNaN(serviceInfo.serviceName)) {
      alert("Service name cannot be a number");
      return;
    }
    if (!serviceInfo.description.trim()) {
      alert("Description cannot be empty");
      return;
    }
    if (isNaN(serviceInfo.price) || serviceInfo.price <= 0) {
      alert("Price must be a number greater than 0");
      return;
    }
    // if (!serviceInfo.imageFile) {
    //   alert("Image file cannot be empty");
    //   return;
    // }
    const formData = new FormData();

    formData.append("serviceName", serviceInfo.serviceName);
    formData.append("description", serviceInfo.description);
    formData.append("price", serviceInfo.price);
    formData.append("image", serviceInfo.imageFile);
    formData.append("status", serviceInfo.status);
    try {
      const token = localStorage.getItem("token");
      console.log(formData.get("serviceName"), "name");
      console.log(formData.get("image"), "img");
      console.log(formData.get("status"), "status");
      const response = await axios.put(
        `http://localhost:8090/add-service/edit-service/${service.serviceId}`,
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
        alert("Sucessfully update service");
        getData();
        handleClose();
      }
      // Close modal or handle success state
    } catch (error) {
      console.error("Error adding service:", error);
      if (error.response.status === 400) {
        const err = error.response.data;
        alert(err);
      }
      // Handle error state
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Service Info
          </Typography>
          <Box>
            <Box sx={{ flexGrow: 1 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
                  {fields.map((field) => (
                    <Grid item xs={12} md={12} key={field.name}>
                      {/* {field.name === "image" ? ( */}
                      {/* // <Box
                        //   sx={{
                        //     display: "flex",
                        //     // justifyContent: "space-between",
                        //     alignItems: "center",
                        //   }}
                        // >
                        //   {serviceInfo.imageURL && (
                        //     <img
                        //       src={serviceInfo.imageURL}
                        //       alt="Selected"
                        //       style={{
                        //         width: "100px",
                        //         height: "auto",
                        //         marginRight: "2rem",
                        //         borderRadius: "5px",
                        //       }}
                        //     />
                        //   )}
                        //   <input
                        //     type="file"
                        //     accept="image/*"
                        //     onChange={handleImageChange}
                        //     style={{
                        //       fontSize: "1.6rem",
                        //       justifyContent: "right",
                        //     }}
                        //   />
                        // </Box> ):()}*/}
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        value={serviceInfo[field.name]}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} md={12}>
                    <Select
                      fullWidth
                      label="Status"
                      name="status"
                      value={serviceInfo.status}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                      <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        display: "flex",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {serviceInfo.imageURL && (
                        <img
                          src={serviceInfo.imageURL}
                          alt="Selected"
                          style={{
                            width: "100px",
                            height: "auto",
                            marginRight: "2rem",
                            borderRadius: "5px",
                          }}
                        />
                      )}
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
                  </Grid>
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
                        EDIT SERVICE
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
  );
}
