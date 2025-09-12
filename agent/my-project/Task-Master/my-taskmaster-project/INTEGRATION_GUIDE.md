# 외부 서비스 연동 설정 가이드

Task Master에서 Google Calendar와 Notion을 연동하기 위한 상세한 설정 방법을 안내합니다.

## 🔗 Google Calendar 연동

### 1. Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **API 및 서비스** > **라이브러리**에서 다음 API 활성화:
   - Google Calendar API
   - Google+ API (필요시)

### 2. OAuth 2.0 클라이언트 ID 생성

1. **API 및 서비스** > **사용자 인증 정보**로 이동
2. **사용자 인증 정보 만들기** > **OAuth 2.0 클라이언트 ID** 선택
3. 애플리케이션 유형: **웹 애플리케이션** 선택
4. **승인된 리디렉션 URI**에 다음 추가:
   - `http://localhost:3000` (개발용)
   - `https://yourdomain.com` (배포용)
5. **만들기** 클릭하여 Client ID와 Client Secret 생성

### 3. API 키 생성

1. **API 및 서비스** > **사용자 인증 정보**에서 **API 키 만들기**
2. 생성된 API 키 복사

### 4. Task Master에서 설정

1. 설정 페이지에서 **Google Calendar** > **연결하기** 클릭
2. **Client ID** 입력 (예: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
3. **API Key** 입력 (예: `AIzaSyB...`)
4. **저장 및 연결** 클릭
5. Google 계정으로 로그인하여 권한 승인

### 5. OAuth 2.0 설정 문제 해결

#### "invalid_request" 오류 해결 방법:

1. **Client ID 확인**:
   - OAuth 2.0 클라이언트 ID가 정확한지 확인
   - 클라이언트 ID 형식: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

2. **승인된 리디렉션 URI 확인**:
   - `http://localhost:3000`이 정확히 추가되어 있는지 확인
   - 프로토콜(http/https), 포트 번호, 경로가 정확해야 함

3. **애플리케이션 유형 확인**:
   - 반드시 **웹 애플리케이션**으로 설정
   - 데스크톱 애플리케이션이나 기타 유형이 아님

4. **API 활성화 확인**:
   - Google Calendar API가 활성화되어 있는지 확인
   - Google+ API도 함께 활성화 권장

5. **프로젝트 설정 확인**:
   - OAuth 동의 화면이 구성되어 있는지 확인
   - 테스트 사용자에 본인 계정이 추가되어 있는지 확인

#### OAuth 동의 화면 설정:

1. **API 및 서비스** > **OAuth 동의 화면**으로 이동
2. **사용자 유형** 선택 (외부 또는 내부)
3. **앱 이름**, **사용자 지원 이메일** 등 필수 정보 입력
4. **범위**에서 `https://www.googleapis.com/auth/calendar` 추가
5. **테스트 사용자**에 본인 Google 계정 추가

#### 팝업 차단 해제:

1. 브라우저 주소창 우측의 팝업 차단 아이콘 클릭
2. "항상 허용" 선택
3. 또는 브라우저 설정에서 팝업 차단 해제

## 📝 Notion 연동

### 1. Notion Integration 생성

1. [Notion Developers](https://developers.notion.com/)에 접속
2. **My integrations** 클릭
3. **New integration** 클릭
4. Integration 이름 입력 (예: "Task Master")
5. **Submit** 클릭하여 API 키 생성

### 2. 데이터베이스에 Integration 추가

1. Notion에서 연동할 데이터베이스 열기
2. 우측 상단 **...** 메뉴 클릭
3. **Add connections** 선택
4. 생성한 Integration 추가

### 3. Database ID 확인

1. 데이터베이스 URL에서 Database ID 추출
2. URL 형식: `https://notion.so/workspace/database-id?v=...`
3. `database-id` 부분이 Database ID

### 4. Task Master에서 설정

1. 설정 페이지에서 **Notion** > **연결하기** 클릭
2. **API Key** 입력 (예: `secret_...`)
3. **Database ID** 입력 (예: `12345678-1234-1234-1234-123456789012`)
4. **저장 및 연결** 클릭

## 🔧 연동 테스트

### Google Calendar 테스트

연결 후 **지금 동기화** 버튼을 클릭하면:
- Google Calendar에서 일정을 가져옴
- 콘솔에 동기화된 일정 수 표시
- 성공/실패 알림 표시

### Notion 테스트

연결 후 **지금 동기화** 버튼을 클릭하면:
- Notion 데이터베이스에서 할 일을 가져옴
- 콘솔에 동기화된 할 일 수 표시
- 성공/실패 알림 표시

## 🚨 문제 해결

### Google Calendar 연결 실패

1. **Client ID 확인**: OAuth 2.0 클라이언트 ID가 정확한지 확인
2. **API Key 확인**: Google Calendar API가 활성화되어 있는지 확인
3. **리디렉션 URI 확인**: `http://localhost:3000`이 승인된 리디렉션 URI에 포함되어 있는지 확인
4. **팝업 차단**: 브라우저에서 팝업 차단을 해제
5. **OAuth 동의 화면**: OAuth 동의 화면이 올바르게 구성되어 있는지 확인

### Notion 연결 실패

1. **API Key 확인**: Integration이 올바르게 생성되었는지 확인
2. **Database ID 확인**: 데이터베이스 URL에서 ID를 정확히 추출했는지 확인
3. **권한 확인**: Integration이 데이터베이스에 추가되었는지 확인
4. **데이터베이스 구조**: 데이터베이스에 다음 속성이 있는지 확인:
   - Name (제목)
   - Status (상태)
   - Priority (우선순위)
   - Due Date (마감일)
   - Description (설명)

## 📱 모바일 지원

모바일 브라우저에서도 연동이 가능하지만, Google OAuth 인증 시 새 창 대신 리디렉션 방식으로 처리됩니다.

## 🔒 보안 주의사항

1. **API 키 보호**: API 키를 공개 저장소에 업로드하지 마세요
2. **환경 변수**: 프로덕션 환경에서는 환경 변수를 사용하세요
3. **권한 최소화**: 필요한 최소한의 권한만 요청하세요

## 📞 지원

연동에 문제가 있거나 추가 도움이 필요하시면:
1. 브라우저 개발자 도구의 콘솔 확인
2. 네트워크 탭에서 API 요청/응답 확인
3. Google Cloud Console과 Notion Developers의 로그 확인

## 🔍 디버깅 팁

### Google OAuth 디버깅:

1. **브라우저 콘솔 확인**: OAuth URL과 에러 메시지 확인
2. **네트워크 탭**: OAuth 요청/응답 확인
3. **Google Cloud Console 로그**: API 사용량 및 오류 로그 확인

### Notion API 디버깅:

1. **API 응답 확인**: 상태 코드 및 에러 메시지 확인
2. **권한 확인**: Integration이 데이터베이스에 올바르게 추가되었는지 확인
3. **데이터베이스 구조**: 필수 속성들이 올바르게 설정되어 있는지 확인
