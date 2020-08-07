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
  footer: {
    width: "600px",
  },
});
interface Props {
  changePage: (event: any) => void;
}

export default function Footer(Props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Home");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    Props.changePage(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction label="홈" value="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="검색"
        value="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="내 서재"
        value="Library"
        icon={<LibraryBooksIcon />}
      />
      <BottomNavigationAction
        label="관리"
        value="Mypage"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}
