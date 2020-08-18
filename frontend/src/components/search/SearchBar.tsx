import React, { useState, useEffect, useRef } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Keyboard from "./Keyboard";
import * as Hangul from "hangul-js";

import "./SearchBar.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      "& > *": {
        margin: theme.spacing(1),
      },
      display: "flex",
      marginBottom: "20px",
      marginLeft: "30px",
      width: "650px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      width: "65%",
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

function SearchBar(props: any) {
  // select
  const [selector, setSelector] = useState("title");
  const [searchSelector, setSearchSelector] = useState("title");
  const keyboard: any = useRef(null);

  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  const updateSelector = () => {
    setSearchSelector(selector);
  };

  useEffect(updateSelector, [selector]);

  // input
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // const inputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setInput(event.target.value as string);
  // };
  const onChangeInput = (event: any): void => {
    const input = Hangul.assemble(event);
    if (!!input === true) {
      setInput(event);
    } else {
      setInput("");
    }
    keyboard.current.setInput(input);
  };
  const updateInput = () => {
    setSearchText(input);
  };

  useEffect(updateInput, [input]);

  const classes = useStyles();

  const sendData = () => {
    props.setSelectData(searchSelector);
    props.setValueData(searchText);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  return (
    <div className="searchBar">
      <form className={classes.searchBar} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={selector}
            onChange={selectChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"author"}>저자</MenuItem>
          </Select>
        </FormControl>
        <TextField
          onFocus={() => {
            setKeyboardOpen(true);
          }}
          value={input}
          className={classes.textField}
          placeholder="검색어를 입력하세요."
          onChange={onChangeInput}
          onKeyPress={handleKeyPress}
        />
        <Button className={classes.button} onClick={sendData}>
          <SearchIcon style={{ color: pink[300] }} />
        </Button>
      </form>
      <div className={`${!keyboardOpen ? "hidden" : ""}`}>
        <Keyboard
          onChange={onChangeInput}
          keyboardRef={keyboard}
          setKeyboardOpen={setKeyboardOpen}
        />
      </div>
    </div>
  );
}

export default SearchBar;
