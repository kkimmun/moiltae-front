# 모일때 프론트엔드

기존 `semi-frontend-project-workspace`의 Vite·React Router·Axios·styled-components 구조를 참고해 만든 일정 조율 MVP 프론트엔드입니다. 기존 EVRE 프로젝트는 수정하지 않았습니다.

## 화면

- 로그인
- 회원가입
- 참여 중인 방 목록
- 받은 초대 수락·거절
- 방 생성
- 방 상세, 회원 초대, 1시간 단위 가능 시간 선택
- 마감 후 최다 겹침 결과

## 실행

백엔드를 `http://localhost:8889`에서 실행한 뒤 프론트엔드를 실행합니다.

```bash
npm install
npm run dev
```

Windows PowerShell에서 `npm.ps1` 실행 정책 오류가 나오면 `npm.cmd install`, `npm.cmd run dev`를 사용합니다.

브라우저에서 `http://localhost:5173`으로 접속합니다.

백엔드 주소를 바꾸려면 `.env.example`을 `.env`로 복사하고 다음 값을 수정합니다.

```text
VITE_API_BASE_URL=http://localhost:8889/api/v1
```

## 검증

```bash
npm run lint
npm run build
```
