import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import MyBooks from "./BookILike";
import Favorites from "./Favorites";
import "./LibraryTabs.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
interface bProps {
  mybooks: any;
  no: any;
  gotoread: (bookNo: string, page: number) => void;
  recentBook: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    width: "50%",
  },
}));

export default function SimpleTabs(props: bProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="library-tabs">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab className={classes.tabs} label="MY BOOKS" {...a11yProps(0)} />
            <Tab className={classes.tabs} label="FAVORITES" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Favorites
            mybooks={props.mybooks}
            no={props.no}
            gotoread={props.gotoread}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyBooks mybooks={props.mybooks} recentBook={props.recentBook} />
        </TabPanel>
      </div>
    </div>
  );
}
