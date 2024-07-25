import { Box } from "@mui/material";
import React from "react";

function ContainerBox({ children }: { children: React.ReactNode }) {
  return (
    <Box className="max-w-lg border border-solid border-gray-300 rounded-lg mx auto p-4 md:p-5 mx-auto mt-10">
      {children}
    </Box>
  );
}

export default ContainerBox;
