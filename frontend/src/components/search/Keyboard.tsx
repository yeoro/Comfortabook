import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-hangul-virtual-keyboard";
import "react-hangul-virtual-keyboard/build/css/index.css";

interface IProps {
  onChange: (input: string) => void;
  keyboardRef: MutableRefObject<Keyboard>;
  setKeyboardOpen: (open: boolean) => void;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  setKeyboardOpen,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    } else if (button === "{enter}") {
      setKeyboardOpen(false);
    }
  };

  return (
    <Keyboard
      keyboardRef={(r: any) => (keyboardRef.current = r)}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default KeyboardWrapper;
