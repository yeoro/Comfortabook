import React from "react";
import { Grid } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Bookcard from "./Card";

interface Props extends WithStyles<typeof styles> {
  mybooks: any;
}

const styles = () =>
  createStyles({
    root: {},
    list: {
      background: "#fce4ec",
      height: "100%",
      padding: "5% 5%",
    },
  });

class Favorites extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // getBook = async (num: any) => {
  //   const URL = `http://i3d204.p.ssafy.io:9999/book/detail/${num}`;
  //   await axios
  //     .get(URL)
  //     .then((res: any) => {
  //       console.log(res.data);
  //       this.setState({
  //         books: this.state.books.concat({
  //           title: res.data.title,
  //           cover: res.data.title,
  //           description: res.data.description,
  //           author: res.data.author,
  //         }),
  //       });
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };
  // layBook = () => {
  //   this.props.mybooks.mybooks.map((element: any) =>
  //     this.getBook(element.bookNo)
  //   );
  // };
  componentDidMount() {
    // this.layBook();
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid container item className={classes.list} justify="space-around">
          {this.props.mybooks.map((element: any) => {
            return (
              <Grid container item xs={5} spacing={2}>
                <Grid item>
                  <Bookcard book={element} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Favorites);
