import React from "react";
import LibraryTabs from "./LibraryTabs";

interface Props {
  mybooks: any;
}
function Library(props: Props) {
  return (
    <div>
      <LibraryTabs mybooks={props.mybooks} />
    </div>
  );
}

export default Library;
