import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";

import Admintab from "../components/Admintabs";

import { History } from "history";

export interface Props {
  history: History;
}

export interface State {
  getBook: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
    },
  })
);
function Admin(props: Props) {
  // const [book, setBook] = useState(book1);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>관리자페이지</h1>
      <Admintab history={props.history} />
    </div>
  );
}

export default Admin;
