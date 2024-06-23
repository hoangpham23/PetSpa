// import { Box } from "@mui/material";
// import HeaderColor from "../../components/header/HeaderColor";

// function CustomerInfo() {
//   return (
//     <>
//       <HeaderColor />
//       <Box marginTop="12rem" marginLeft={"10rem"} fontSize={"1.8rem"}>
//         <h1>CUSTOMER INFORMATION</h1>
//       </Box>
//       <Box
//         sx={{
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "12rem",
//           marginLeft: "10rem",
//         }}
//       >
//         <Box
//           sx={{ display: "flex", gap: 4, fontSize: "1.6rem", lineHeight: 3 }}
//         >
//           <Box>
//             <p>Gmail: </p>
//             <p>Phone number: </p>
//             <p>Name: </p>
//             <p>Amount of pets: </p>
//           </Box>
//           <Box>
//             <Box
//               sx={{
//                 border: "1.5px solid grey",
//                 width: "40rem",
//                 height: "2.5rem",
//                 display: "inline",
//                 alignItems: "center", // Align text vertically in the center
//                 justifyContent: "center", // Align text horizontally in the center
//                 borderRadius: "0.5rem",
//                 display: "flex",
//                 marginTop: 3,
//               }}
//             >
//               GAMIL
//             </Box>
//             <Box
//               sx={{
//                 border: "1.5px solid grey",
//                 width: "40rem",
//                 height: "2rem",
//                 display: "inline",
//                 alignItems: "center", // Align text vertically in the center
//                 justifyContent: "center", // Align text horizontally in the center
//                 borderRadius: "0.5rem",
//                 display: "flex",
//                 marginTop: 3,
//               }}
//             >
//               GAMIL
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default CustomerInfo;;
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

export default function CustomerInfo() {
  const [cusInfo, setCusInfo] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    amountOfPets: "",
  });
  useEffect(() => {
    const savedCus = JSON.parse(localStorage.getItem("account"));
    setCusInfo({
      email: savedCus.email,
      phoneNumber: savedCus.phoneNumber,
      name: savedCus.customerName,
      amountOfPets: savedCus.numberOfPets,
    });
  }, []);
  useEffect(() => {
    console.log(cusInfo);
  }, [cusInfo]);
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
      <HeaderColor />
      <Box marginTop="12rem" marginLeft={"10rem"} fontSize={"1.8rem"}>
        <h1>CUSTOMER INFORMATION</h1>
      </Box>
      <Box sx={{ minHeight: "56vh" }}>
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
                  <StyledTableCell align="left">{cusInfo.name}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="left">
                    Amount of pet(s)
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {cusInfo.amountOfPets}
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
