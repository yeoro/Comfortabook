import React, { useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField placeholder="검색어를 입력하세요." {...searchWord} />
      <SearchIcon style={{ color: pink[300] }} />
    </form>
  );
}

export default SearchBar;
