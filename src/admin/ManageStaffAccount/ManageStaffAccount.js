import { ThemeProvider, createTheme, styled } from "@mui/material";
import SideBar from "../../components/side-bar/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

//import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

function ManageStaffAccount() {
  //  Prepare data to send
  const [data, setData] = useState([]);
  async function getData() {
    try {
      const response = await axios.get(
        " http://localhost:8090/admin/employees"
      );
      console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins,sans-serif", // Thay đổi font chữ ở đây
      fontSize: 18, // Cỡ chữ mặc định
    },
  });
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  async function deleteEmployee(id) {
    try {
      const response = axios.delete(
        `http://localhost:8090/admin/employees/${id}`
      );
      if (response && response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "2rem",
        backgroundColor: "#f0f0f0",
        minHeight: "95vh",
        marginTop: "3rem",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1
            style={{
              marginTop: "6rem",
              marginBottom: "-2rem",
              textAlign: "left",
            }}
          >
            Staff's account{" "}
          </h1>
          <DrawerHeader />
          <Box>
            <CustomizedTables data={data} onDelete={deleteEmployee} />
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default ManageStaffAccount;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DEB3C5",
    color: theme.palette.common.white,
    fontSize: "1.6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CustomizedTables({ data, deleteEmployee }) {
  if (!Array.isArray(data)) {
    return null; // Return null if data is not an array
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell size="small" align="left" width={"10rem"}>
              ID
            </StyledTableCell>
            <StyledTableCell align="right">UserName</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Password</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <StyledTableRow key={data.employeeID}>
              <StyledTableCell component="th" scope="row">
                {data.employeeID}
              </StyledTableCell>
              <StyledTableCell align="right">
                {data.employeeName}
              </StyledTableCell>
              <StyledTableCell align="right">{data.email}</StyledTableCell>
              <StyledTableCell align="right">{data.password}</StyledTableCell>
              <StyledTableCell align="right">
                <Box
                  sx={{
                    backgroundColor: "#F6E1CC",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "15px",
                    //margin: "0px 10px",
                    padding: "0.4rem",
                    transition: "background-color 0.3s ease",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "white",
                      //border: "1px solid black",
                      boxShadow: "0 0 6px #E19D59",
                      "& > input": {
                        backgroundColor: "#FFAE5C", // Màu nền của input khi hover
                      },
                    },
                  }}
                >
                  <input
                    type="submit"
                    value="Edit"
                    style={{
                      backgroundColor: "inherit",
                      fontSize: "1.6rem",
                      "&:hover": {
                        backgroundColor: "#inherit", // Màu nền khi hover
                      },
                    }}
                  />
                </Box>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Box
                  sx={{
                    backgroundColor: "#F6E1CC",
                    justifyContent: "center",
                    display: "flex",
                    borderRadius: "15px",
                    //margin: "0px 10px",
                    padding: "0.4rem",
                    transition: "background-color 0.3s ease",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "white",
                      //border: "1px solid black",
                      boxShadow: "0 0 6px #E19D59",
                      "& > input": {
                        backgroundColor: "#FFAE5C", // Màu nền của input khi hover
                      },
                    },
                  }}
                >
                  <input
                    type="submit"
                    value="Delete"
                    style={{
                      backgroundColor: "inherit",
                      fontSize: "1.6rem",
                      "&:hover": {
                        backgroundColor: "#inherit", // Màu nền khi hover
                      },
                    }}
                    onClick={() => deleteEmployee(data.employeeID)}
                  />
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}