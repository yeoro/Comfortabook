백엔드 관련 이슈

PJT 구조

- controller
- Service
- Repository
- dto
- domain (Entity class)
- config

CRUD rules

- Create -> insert
- Read -> retrieve, find
- Update -> update
- Delete -> delete

1.  DB 설계
    > Member
        - member_no (PK, auto increment, long, not null)
        - email( = id)
        - password
        - name
        - phone_number
        - access_token
        - oauth_id
        - provider_name
        - role

> Book

    - book_no(PK, auto increment, long, not null)
    - isbn
    - title
    - CategoryName
    - author
    - publisher
    - pubdate
    - description
    - cover
    - member_no (FK)

2.  기능
    > 회원 가입
        - 이메일 중복 확인
        - 비밀번호 재확인
        - 소셜 로그인(정보 추가 입력 필요)
        - 기본 로그인

> 아이디 찾기

    - 이름, 휴대폰 번호

> 비밀번호 찾기

    - 이름, 휴대폰 번호, 이메일 일치 확인 후 임시 비밀번호 전송, DB 수정
