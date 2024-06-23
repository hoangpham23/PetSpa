import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Footer from "../../components/footer/footer";
import HeaderColor from "../../components/header/HeaderColor";
function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  async function getData(event) {
    try {
      const response = await axios.post(
        "http://localhost:8090/payment-history",
        { customerID: localStorage.getItem("customerID") }
      );
      if (response.status === 200) {
        setPaymentHistory(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(paymentHistory);
  }, [paymentHistory]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#90ABAF",

      color: "white",
      fontSize: "1.5rem",
      fontFamily: "Poppins, sans-serif",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "1.5rem",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#E3ECE9",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Box>
        <HeaderColor />
      </Box>
      <Box marginTop="12rem" marginLeft={"10rem"} fontSize={"1.8rem"}>
        <h1>PAYMENT HISTORY</h1>
      </Box>
      <Box></Box>
      <Box minHeight={"56vh"}>
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
              sx={{ minWidth: "10%", maxWidth: "100%" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>No. </StyledTableCell>
                  <StyledTableCell align="right">Payment Time</StyledTableCell>
                  <StyledTableCell align="right">List Service</StyledTableCell>
                  <StyledTableCell align="right">Pet Name</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <span style={{ marginRight: "10px" }}>
                        {format(new Date(row.paymentTime), "dd/MM/yyyy")}
                      </span>
                      <span>{format(new Date(row.paymentTime), "HH:mm")}</span>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.listService.map((service, index) => (
                        <span key={index}>
                          {service} {"\n"}
                        </span>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.petName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
}

export default PaymentHistory;
