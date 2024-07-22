import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HeaderColor from "../../components/header/HeaderColor";
import { Box } from "@mui/material";
import { Style } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import styles from "./CustomerInfo_style.module.css";
import EditInfo from "./EditInfo/EditInfo";
import { Helmet } from "react-helmet";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E3ECE9",
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Poppins, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.5rem",
  },
}));
export default function CustomerInfo() {
  const [cusInfo, setCusInfo] = useState({
    customerID: "",
    name: "",
    email: "",
    numberOfPets: "",
    phoneNumber: "",
    role: "",
  });
  function getData() {
    try {
      const savedCus =
        JSON.parse(sessionStorage.getItem("accountSession")) || {};
      console.log(sessionStorage.getItem("accountSession"));
      if (savedCus) {
        setCusInfo({
          customerID: savedCus.customerID || "",
          customerName: savedCus.customerName || "",
          email: savedCus.email || "",
          numberOfPets: savedCus.numberOfPets || "",
          password: savedCus.password || "",
          phoneNumber: savedCus.phoneNumber || "",
          role: savedCus.role || "",
        });
      }
    } catch (error) {
      console.error("Error parsing customer data from sessionStorage:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(cusInfo);
  }, [cusInfo]);

  const [edit, setEdit] = useState(false);
  const handleOpenEdit = () => setEdit(true);
  const handleCloseEdit = () => setEdit(false);
  return (
    <>
      <Helmet>
        <title>Customer Information</title>
      </Helmet>
      <HeaderColor />
      <Box marginTop="12rem" marginLeft={"10rem"} fontSize={"1.8rem"}>
        <h1>CUSTOMER INFORMATION</h1>
      </Box>
      <Box sx={{ minHeight: "51vh" }}>
        <Box sx={{}}>
          <Box
            display="flex"
            justifyContent="center"
            mt={5}
            marginTop={"5rem"}
            marginLeft={"9rem"}
            marginRight={"9rem"}
            marginBottom={"5rem"}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: "10%",
                  maxWidth: "100%",
                  border: "5px solid #C0ABE4",
                }}
                aria-label="customized table"
              >
                <TableBody>
                  <TableRow>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">
                      {cusInfo.email}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">Phone Number</StyledTableCell>
                    <StyledTableCell align="left">
                      {cusInfo.phoneNumber}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">
                      {cusInfo.customerName}
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell align="left">
                      Amount of pet(s)
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {cusInfo.numberOfPets}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <input
            type="submit"
            value="Edit Information"
            className={styles.btn}
            onClick={handleOpenEdit}
          />
          <EditInfo
            isOpen={edit}
            handleCloseEdit={handleCloseEdit}
            cusInfo={cusInfo}
            setCusInfo={setCusInfo}
            getData={getData}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
