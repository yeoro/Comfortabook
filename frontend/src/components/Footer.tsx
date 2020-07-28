import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

import "./Footer.css";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Home");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction label="홈" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="검색"
        value="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="내 서재"
        value="LibraryBooks"
        icon={<LibraryBooksIcon />}
      />
      <BottomNavigationAction
        label="관리"
        value="management"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}
