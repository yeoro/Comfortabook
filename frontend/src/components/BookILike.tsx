import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./BookILike.css";

interface Props {
  mybooks: any;
  recentBook: number;
  gotoread: (bookNo: string, page: number) => void;
}

interface State {
  book: any;
}

class BookILike extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  read = () => {
    this.props.gotoread(this.state.book.bookNo, this.state.book.page);
  };

  readRecentBook = () => {
    this.props.mybooks.map((element: any) => {
      if (element.bookNo === this.props.recentBook) {
        this.setState({
          book: element,
        });
      }
    });
  };

  getRecentBook = () => {
    if (!!this.state.book === true) {
      return (
        <div className="book-i-like">
          <Card onClick={this.read}>
            <CardActionArea>
              <CardMedia
                className="media"
                image={this.state.book.cover}
                title={this.state.book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  {this.state.book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.state.book.description.substr(0, 130)} . . .
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="book-i-like">
          <h1>저장된 최근 도서가 없습니다.</h1>
        </div>
      );
    }
  };
  componentWillMount() {
    this.readRecentBook();
  }
  render() {
    return this.getRecentBook();
  }
}

export default BookILike;
