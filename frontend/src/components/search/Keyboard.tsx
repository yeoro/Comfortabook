import React, { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

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

  const handleShift = () => {
    if (layoutName === "default" || layoutName === "shift") {
      let newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    } else {
      let newLayoutName = layoutName === "kdefault" ? "kshift" : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  const onKeyPress = (button: any) => {
    if (button === "{shift}") handleShift();
    if (button === "{close}") {
      setKeyboardOpen(false);
    }
    if (button === "{language}") {
      const newLayoutName =
        layoutName === "kdefault" || layoutName === "kshift"
          ? "default"
          : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  return (
    <Keyboard
      keyboardRef={(r: any) => (keyboardRef.current = r)}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
      layout={{
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} q w e r t y u i o p [ ] \\",
          "{language} a s d f g h j k l ; ' {enter}",
          "{shift} z x c v b n m , . / {shift}",
          ".com @ {space} {close}",
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} Q W E R T Y U I O P { } |",
          '{language} A S D F G H J K L : " {enter}',
          "{shift} Z X C V B N M < > ? {shift}",
          ".com @ {space} {close}",
        ],
        kdefault: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕㅑㅑ ㅐ ㅔ [ ] \\",
          '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
          "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
          ".com @ {space} {close}",
        ],
        kshift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕㅑㅑ ㅒ ㅖ { } |",
          '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
          "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {shift}",
          ".com @ {space} {close}",
        ],
      }}
    />
  );
};

export default KeyboardWrapper;
