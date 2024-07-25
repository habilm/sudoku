import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../context";
import { Logout } from "@mui/icons-material";

function SiteHeader() {
  const { currentUser, logOut } = useContext(CurrentUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="justify-between ">
          <div className="flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hero Puzzle
              </Typography>
            </Link>
          </div>

          {currentUser.token ? (
            <>
              <div>
                Hello {currentUser.full_name}
                <Button color="inherit" onClick={logOut}>
                  <Logout width="20" height="20" /> LogOut
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Link to="/login">
                <Button color="inherit">Login </Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SiteHeader;
