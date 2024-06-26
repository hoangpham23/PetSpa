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
function getOffsetFromLocalStorage() {
  // Lấy giá trị offset từ localStorage
  const offset = localStorage.getItem("offset");
  // Nếu không có giá trị trong localStorage, mặc định là 0
  return offset ? parseInt(offset, 10) : 0;
}

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
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "2rem",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
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
            <CustomizedTables data={data} />
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function CustomizedTables({ data }) {
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
