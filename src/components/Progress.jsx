import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const Progress = () => {
  return (
    <div>
      <Box>
        <CircularProgress
          size={20}
          sx={{
            backgroundColor: "#007bff",
            color: "white",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "green",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Progress;
