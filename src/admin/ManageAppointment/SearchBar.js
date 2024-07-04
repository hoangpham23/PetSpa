import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";

function SearchBar({ setAppointments, appointments, getAppointmentToday }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      try {
        console.log(inputValue, "wwww");
        if (inputValue.trim() === "") {
          getAppointmentToday();
          setAppointments(appointments);
          return;
        }

        const token = localStorage.getItem("token");
        const currentDate = new Date().toISOString().split("T")[0];
        console.log(currentDate);
        const response = await axios.get(
          `http://localhost:8090/manage-appointment/search?date=${currentDate}&phoneNumber=${inputValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setAppointments(response.data);
          } else if (response.data && typeof response.data === "object") {
            setAppointments([response.data]);
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleButtonClick = () => {
    handleKeyPress();
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      onSubmit={(e) => e.preventDefault()} // Prevent form submission on Enter key
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "1.6rem" }}
        placeholder="Search appointment by phone number"
        inputProps={{ "aria-label": "Search appointment by phone number" }}
        onChange={handleInputChange}
        value={inputValue}
        onKeyDown={handleKeyPress}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleButtonClick} // Handle button click
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}

export default SearchBar;
