import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const useInput = (initialValue: string, validator: any) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

function SearchBar() {
  const emptyValue = (value: any) => true;
  const searchWord = useInput("", emptyValue);
  const [selector, setSelector] = useState("d_titl");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
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
      <br />
      <TextField placeholder="검색어를 입력하세요." {...searchWord} />
      <SearchIcon style={{ color: pink[300] }} />
    </form>
  );
}

export default SearchBar;
