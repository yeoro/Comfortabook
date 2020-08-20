import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  return {
    top: "5%",
    left: "5%",
    padding: "5%",
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "80%",
      height: "80%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
    },
  })
);

interface Props {
  guideOpen: boolean;
  guideClose: () => void;
  mode: string;
}

export default function SimpleModal(props: Props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  let body = (
    <div style={modalStyle} className={classes.paper}>
      <h1>현재 페이지는 가이드가 존재하지 않는 페이지입니다.</h1>
    </div>
  );
  if (props.mode === "Home") {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h1>반갑습니다.</h1>
        <h3>
          -저희 서비스를 원활하게 이용하시는데에 도움이 될 수 있는 가이드입니다-
        </h3>
        <h2>기본적인 하단메뉴에 대한 설명과 이용방법</h2>
        <ol>
          <li>
            <h3>홈</h3>
            <p>
              현재 들어와 있는 페이지로써 도서 추천과 명언으로 이루어진 독서애
              대한 욕망을 불러 일으킬 수 있는 페이지 입니다.
            </p>
          </li>
          <li>
            <h3>검색</h3>
            <p>
              저희 사이트에 포함되어 있는 책들을 검색 할 수 있는 페이지입니다.
              유저 본인 보다는 보호자를 위한 페이지입니다. 페이지 속 추가
              음성으로 제어할 수 있는 기능은 없습니다.
            </p>
          </li>
          <li>
            <h3>도서</h3>
            <p>
              책을 보기 위해 이용해야하는 페이지 입니다. 유저가 고른 책들과 가장
              최근에 읽은 책을 저장 한 페이지도 포함하여 지속적인 독서에 많은
              도움을 줄 수 있습니다.
            </p>
          </li>
          <li>
            <h3>관리</h3>
            <p>
              유저의 로그아웃 그리고 유저 정보 수정의 도움을 주는 페이지입니다.
              이 페이지에도 음성으로 제어가능한 기능이 없습니다.
            </p>
          </li>
        </ol>
        <h3>
          하단 메뉴의 이름을 말씀하시면 각 페이지로 이동 하실 수 있습니다.
        </h3>
        <p>ex) 홈으로 가실려면 "홈"이라고 말씀하시면 됩니다.</p>
        <p>
          모든 페이지에는 각 페이지의 기능에 대한 설명을 포함하는 가이드가
          있습니다
        </p>
        <h2>가이드는 "가이드"라고 말씀하시면 켜고 끄실 수 있습니다</h2>
      </div>
    );
  } else if (props.mode === "Library") {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h1>독서목록 페이지 이용방법</h1>
        <ol>
          <li>
            <h2>나의 도서 목록 이용방법</h2>
            <h3>
              각 도서의 번호를 말씀하시면 각 도서를 읽는 페이지로 이동합니다.
            </h3>
            <h3>
              ex) "1번"이라고 말씀하시면 1번 도서 읽기 페이지로 이동합니다.
            </h3>
          </li>
          <li>
            <h2>최근 읽은 도서 이용방법</h2>
            <h3>본 페이지는 가장 최근 읽은 도서만 보여지는 페이지입니다.</h3>
            <h3>"실행"이라고 말씀하시면 본 도서 읽기 페이지로 이동합니다.</h3>
          </li>
        </ol>
        <h2>가이드는 "가이드"라고 말씀하시면 켜고 끄실 수 있습니다</h2>
      </div>
    );
  } else if (props.mode === "Read") {
    body = (
      <div style={modalStyle} className={classes.paper}>
        <h1>책 읽기 페이지 이용방법</h1>
        <ol>
          <li>
            <h2>다음</h2>
            <p>다음 페이지로 이동 할 수 있는 명령어 입니다.</p>
          </li>
          <li>
            <h2>이전</h2>
            <p>이전 페이지로 이동 할 수 있는 명령어 입니다.</p>
          </li>
          <li>
            <h2>크게</h2>
            <p>글씨 크기를 크게 볼 수 있는 명령어 입니다.</p>
          </li>
          <li>
            <h2>작게</h2>
            <p>글씨 크기를 작게 볼 수 있는 명령어 입니다.</p>
            <h3>글씨 크기는 3단계로 이루어져 있습니다.</h3>
          </li>
          <li>
            <h2>뒤로</h2>
            <p>나의 도서 목록으로 돌아 갈 수 있는 명령어 입니다.</p>
            <h3>
              책갈피 기능이 있어 모든 도서를 항상 읽던 페이지에서 읽으실 수
              있습니다. 부담없이 책을 폈다 덮었다 하십시오.
            </h3>
          </li>
        </ol>
        <h2>가이드는 "가이드"라고 말씀하시면 켜고 끄실 수 있습니다</h2>
      </div>
    );
  }

  return (
    <Modal
      open={props.guideOpen}
      onClose={props.guideClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
