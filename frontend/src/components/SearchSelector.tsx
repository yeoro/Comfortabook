import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function SearchSelector() {
  const classes = useStyles();
  const [selector, setSelector] = useState("d_titl");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={selector}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"d_titl"}>제목</MenuItem>
          <MenuItem value={"d_auth"}>저자</MenuItem>
          <MenuItem value={"d_publ"}>출판사</MenuItem>
        </Select>
        <FormHelperText>검색 조건</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SearchSelector;
