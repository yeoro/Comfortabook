<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<c:if test="${userId eq null}">
		<a
			href="https://kauth.kakao.com/oauth/authorize?client_id=8a647c3f80248463971defaff4b4ac23&redirect_uri=http://localhost:8090/login&response_type=code">
			<img src="/img/kakao_login_medium_narrow.png">
		</a>
		<a
			href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=6ZhvWFbXywo8wUL1vSlX&state=STATE_STRING&redirect_uri=CALLBACK_URL">
			<img src="/img/네이버 아이디로 로그인_완성형_Green.png">
		</a>
	</c:if>
	<c:if test="${userId ne null}">
		<h1>로그인 성공입니다</h1>
		<input type="button" value="로그아웃" onclick="location.href='/logout'">
		<input type="button" value="회원탈퇴" onclick="location.href='/unlink'">
	</c:if>
</body>
</html>