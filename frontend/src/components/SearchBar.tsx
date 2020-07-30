import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

import "./SearchBar.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      "& > *": {
        margin: theme.spacing(1),
      },
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      width: "70vw",
    },
    button: {
      "& > *": {
        margin: theme.spacing(1),
      },
      width: 20,
      margin: 0,
      padding: 0,
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
  const [selector, setSelector] = useState("title");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  const classes = useStyles();

  return (
    <form className={classes.searchBar} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={selector}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"title"}>제목</MenuItem>
          <MenuItem value={"author"}>저자</MenuItem>
          <MenuItem value={"publisher"}>출판사</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.textField}
        placeholder="검색어를 입력하세요."
        {...searchWord}
      />
      <Button className={classes.button}>
        <SearchIcon style={{ color: pink[300] }} />
      </Button>
    </form>
  );
}

export default SearchBar;
