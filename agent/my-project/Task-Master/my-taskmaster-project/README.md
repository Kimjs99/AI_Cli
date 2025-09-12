# Task Master - 일정 관리 애플리케이션

Task Master는 Google Calendar와 Notion과 연동되는 현대적인 일정 관리 웹 애플리케이션입니다.

## ✨ 주요 기능

### 📅 일정 관리
- 월간/주간/일간 캘린더 뷰
- 일정 추가, 수정, 삭제
- 일정 유형별 분류 (미팅, 마감, 개인, 기타)
- 드래그 앤 드롭으로 일정 이동

### ✅ 할 일 관리
- 할 일 목록 생성 및 관리
- 우선순위 설정 (높음, 보통, 낮음)
- 카테고리별 분류
- 완료 상태 추적

### 🔗 외부 서비스 연동
- **Google Calendar**: 일정 동기화 및 관리
- **Notion**: 데이터베이스와 연동하여 할 일 관리

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- Material-UI 기반의 현대적인 UI/UX

## 🚀 시작하기

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm start
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 🔧 설정

### Google Calendar 연동

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Google Calendar API 활성화
3. OAuth 2.0 클라이언트 ID 생성
4. 환경 변수 설정:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_GOOGLE_API_KEY=your_api_key
```

### Notion 연동

1. [Notion Developers](https://developers.notion.com/)에서 Integration 생성
2. API 키 발급
3. 데이터베이스에 Integration 추가
4. 환경 변수 설정:

```env
REACT_APP_NOTION_API_KEY=your_notion_api_key
REACT_APP_NOTION_DATABASE_ID=your_database_id
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx     # 상단 헤더
│   └── Sidebar.tsx    # 좌측 사이드바
├── pages/             # 페이지 컴포넌트
│   ├── Dashboard.tsx  # 대시보드
│   ├── Calendar.tsx   # 캘린더
│   ├── Tasks.tsx      # 할 일 관리
│   └── Settings.tsx   # 설정
├── services/          # API 서비스
│   ├── googleCalendar.ts  # Google Calendar API
│   └── notion.ts         # Notion API
└── App.tsx            # 메인 앱 컴포넌트
```

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router
- **Date Handling**: date-fns
- **HTTP Client**: Fetch API
- **Build Tool**: Create React App

## 📱 사용법

### 1. 대시보드
- 오늘의 일정과 할 일을 한눈에 확인
- 통계 정보 및 진행 상황 파악

### 2. 캘린더
- 월간 캘린더에서 일정 관리
- 일정 추가/수정/삭제
- 일정 유형별 색상 구분

### 3. 할 일 관리
- 진행중인 할 일과 완료된 할 일 분리
- 우선순위 및 마감일 설정
- 카테고리별 분류

### 4. 설정
- Google Calendar 및 Notion 연동 설정
- 동기화 간격 조정
- 알림 및 테마 설정

## 🔒 보안

- OAuth 2.0을 통한 안전한 인증
- API 키는 환경 변수로 관리
- 사용자 데이터는 로컬에만 저장

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 있거나 제안사항이 있으시면 [Issues](https://github.com/yourusername/task-master/issues)에 등록해 주세요.

## 🙏 감사의 말

- [Material-UI](https://mui.com/) - 아름다운 UI 컴포넌트
- [date-fns](https://date-fns.org/) - 날짜 처리 라이브러리
- [Google Calendar API](https://developers.google.com/calendar) - 일정 관리 API
- [Notion API](https://developers.notion.com/) - 노트 및 데이터베이스 API

