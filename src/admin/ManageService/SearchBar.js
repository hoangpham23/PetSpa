import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";

function SearchBar({ data, setData, getData }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      if (inputValue === null || inputValue === "" || inputValue === " ") {
        getData();
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8090/add-service/search?serviceName=${inputValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (response.data && typeof response.data === "object") {
          setData([response.data]);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          alert("No service found !!!");
        } else {
          console.log(error);
          alert("An error occurred while searching for the service.");
        }
      }
    }
  };

  const handleButtonClick = () => {
    getData(inputValue.trim()); // Handle button click event
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      onSubmit={(e) => e.preventDefault()} // Prevent form submission on Enter key
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "1.6rem" }}
        placeholder="Search service"
        inputProps={{ "aria-label": "search service" }}
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
