import React from "react";
import LibraryTabs from "./LibraryTabs";

interface Props {
  mybooks: any;
  no: any;
  gotoread: (bookNo: string, page: number) => void;
  recentBook: number;
}

function Library(props: Props) {
  return (
    <div>
      <LibraryTabs
        recentBook={props.recentBook}
        mybooks={props.mybooks}
        no={props.no}
        gotoread={props.gotoread}
      />
    </div>
  );
}

export default Library;
