import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function SearchBar({ setSearch, getData }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      getData(inputValue.trim()); // Trim any leading/trailing whitespace
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
        placeholder="Search employee by name"
        inputProps={{ "aria-label": "search employee by name" }}
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
