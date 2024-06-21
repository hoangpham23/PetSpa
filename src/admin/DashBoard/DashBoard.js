import { ThemeProvider, createTheme, styled } from "@mui/material";
import SideBar from "../../components/side-bar/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
function DashBoard() {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif", // Thay đổi font chữ ở đây
      fontSize: 18, // Cỡ chữ mặc định
      // Các thiết lập khác cho typography
    },
    // Các thiết lập khác cho chủ đề
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
    <>
      <Box sx={{ display: "flex", fontSize: "2rem" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default DashBoard;
