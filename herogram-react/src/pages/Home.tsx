import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box component="section" className="mt-10 text-center">
      <Typography variant="h1" className=" max-w-2xl !mx-auto">
        Welcome to the Hero Puzzle
      </Typography>

      <Box className="!mt-10">
        <Link to="login">
          <Button variant="contained" size="large">
            Get Start
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
