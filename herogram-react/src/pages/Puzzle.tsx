import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Playing from "../components/puzzle/Playing";

type playTypes = "intro" | "playing" | "end";

function Puzzle() {
  const [level, setLevel] = useState(1);
  const [playStatus, setPlayStatus] = useState<playTypes>("intro");
  function handleLevelChange(l: number) {
    setLevel(l);
  }

  const pass = { handleLevelChange, levelValue: level, setPlayStatus };

  return (
    <Box component="section" className="mt-10 text-center">
      {playStatus == "intro" && <Intro {...pass} />}
      {playStatus == "playing" && <Playing level={level} />}
    </Box>
  );
}

function Intro({
  handleLevelChange,
  levelValue,
  setPlayStatus,
}: {
  handleLevelChange: (e: number) => void;
  levelValue: number;
  setPlayStatus: (e: playTypes) => void;
}) {
  function start() {
    setPlayStatus("playing");
  }
  return (
    <>
      <Typography variant="h1" className=" max-w-2xl !mx-auto">
        Lets Play
      </Typography>

      <Box className="!mt-10 border border-solid border-gray-300 rounded-lg  max-w-2xl mx-auto p-4">
        <Box>
          <Level
            levelValue={levelValue}
            handleLevelChange={handleLevelChange}
          ></Level>
        </Box>

        <Button variant="contained" size="large" onClick={start}>
          Start
        </Button>
      </Box>
    </>
  );
}

function Level({
  handleLevelChange,
  levelValue,
}: {
  handleLevelChange: (e: number) => void;
  levelValue: number;
}) {
  const level = [1, 2, 3];
  return (
    <FormControl className="!mb-10">
      <FormLabel id="demo-row-radio-buttons-group-label">Level</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {level.map((l: number, i: number) => (
          <FormControlLabel
            key={i}
            value={l}
            checked={l == levelValue}
            control={
              <Radio
                onChange={() => {
                  handleLevelChange(l);
                }}
              />
            }
            label={l}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default Puzzle;
