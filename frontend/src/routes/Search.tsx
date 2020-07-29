import React from "react";

import SearchBooks from "./components/SearchBooks";
import "./Search.css";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";

class Search extends React.Component {
  state = {
    isLoading: true,
    books: [],
  };
}

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

function SimpleSelect() {
  const classes = useStyles();
  const [selector, setSelector] = React.useState("");

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
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          <MenuItem value={10}>제목</MenuItem>
          <MenuItem value={20}>저자</MenuItem>
          <MenuItem value={30}>출판사</MenuItem>
        </Select>
        <FormHelperText>검색 조건</FormHelperText>
      </FormControl>
    </div>
  );
}

function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="검색어를 입력하세요." />
      <SearchIcon style={{ color: pink[300] }} />
    </form>
  );
}

function Search() {
  return (
    <div className="search">
      <SimpleSelect />
      <BasicTextFields />
    </div>
  );
}

export default Search;
