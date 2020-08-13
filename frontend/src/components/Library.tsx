import React from "react";
import LibraryTabs from "./LibraryTabs";

interface Props {
  mybooks: any;
  no: any;
}

function Library(props: Props) {
  return (
    <div>
      <LibraryTabs mybooks={props.mybooks} no={props.no} />
    </div>
  );
}

export default Library;
