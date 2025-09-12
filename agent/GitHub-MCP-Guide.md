# GitHub MCP Server 사용 가이드

이 가이드는 Claude Code에서 GitHub MCP (Model Context Protocol) 서버를 사용하는 방법에 대한 종합적인 안내를 제공합니다.

## 목차
1. [개요](#개요)
2. [설치 및 설정](#설치-및-설정)
3. [기본 사용법](#기본-사용법)
4. [주요 기능](#주요-기능)
5. [실습 예제](#실습-예제)
6. [고급 활용법](#고급-활용법)
7. [문제 해결](#문제-해결)
8. [Best Practices](#best-practices)

## 개요

### GitHub MCP Server란?
GitHub MCP Server는 Claude Code가 GitHub API를 통해 리포지토리와 상호작용할 수 있도록 하는 도구입니다. 이를 통해 다음과 같은 작업을 Claude Code 내에서 직접 수행할 수 있습니다:

- 리포지토리 정보 조회
- 파일 내용 읽기/쓰기
- 이슈 및 PR 관리
- 커밋 히스토리 조회
- 브랜치 관리
- GitHub Actions 워크플로우 조회

### 주요 장점
- **통합 워크플로우**: Claude Code 내에서 GitHub 작업 직접 수행
- **자동화**: 반복적인 GitHub 작업 자동화
- **컨텍스트 유지**: 코드와 GitHub 정보를 함께 분석
- **효율성**: 브라우저와 IDE를 오가지 않고 작업 가능

## 설치 및 설정

### 1. GitHub MCP Server 설치
```bash
# Claude Code에서 GitHub MCP 서버 추가
claude mcp add github npx @modelcontextprotocol/server-github

# 설치 확인
claude mcp list
```

### 2. GitHub 토큰 설정
GitHub API 사용을 위해 Personal Access Token이 필요합니다.

#### GitHub Token 생성
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 필요한 권한 선택:
   - `repo` (전체 리포지토리 접근)
   - `read:org` (조직 정보 읽기)
   - `workflow` (GitHub Actions)
   - `user:email` (이메일 정보)

#### 환경 변수 설정
```bash
# ~/.zshrc 또는 ~/.bashrc에 추가
export GITHUB_TOKEN="ghp_your_token_here"

# 현재 세션에 적용
source ~/.zshrc
```

또는 프로젝트별 설정:
```bash
# 프로젝트 루트에 .env 파일 생성
echo "GITHUB_TOKEN=ghp_your_token_here" >> .env
```

### 3. 연결 확인
```bash
claude mcp list
# github: npx @modelcontextprotocol/server-github - ✓ Connected
```

## 기본 사용법

### Claude Code 내에서 GitHub MCP 사용
Claude Code가 실행 중일 때, GitHub 관련 요청을 하면 자동으로 MCP 서버가 사용됩니다.

#### 기본 명령 패턴
```
# 리포지토리 정보 조회
"이 리포지토리의 기본 정보를 보여주세요"

# 파일 내용 읽기
"GitHub에서 README.md 파일을 읽어주세요"

# 이슈 목록 조회
"열려있는 이슈들을 보여주세요"

# PR 정보 조회
"최근 Pull Request들을 확인해주세요"
```

## 주요 기능

### 1. 리포지토리 관리

#### 리포지토리 정보 조회
- 기본 정보 (이름, 설명, 언어, 스타 수 등)
- 브랜치 목록
- 태그 정보
- 릴리스 정보

```
"현재 리포지토리의 모든 브랜치를 보여주세요"
"최근 릴리스 정보를 확인해주세요"
"이 리포지토리의 주요 통계를 보여주세요"
```

#### 파일 시스템 탐색
- 디렉토리 구조 조회
- 파일 내용 읽기
- 파일 생성/수정
- 파일 삭제

```
"src 디렉토리의 구조를 보여주세요"
"package.json 파일의 내용을 읽어주세요"
"새로운 컴포넌트 파일을 생성해주세요"
```

### 2. 이슈 관리

#### 이슈 조회
- 열린 이슈 목록
- 특정 이슈 상세 정보
- 이슈 검색
- 레이블별 필터링

```
"bug 레이블이 붙은 이슈들을 보여주세요"
"이슈 #123의 상세 내용을 확인해주세요"
"최근 일주일간 생성된 이슈들을 보여주세요"
```

#### 이슈 생성 및 수정
- 새 이슈 생성
- 이슈 제목/내용 수정
- 레이블 추가/제거
- 할당자 설정

```
"버그 리포트 이슈를 생성해주세요"
"이슈 #123에 'priority:high' 레이블을 추가해주세요"
"이슈를 닫아주세요"
```

### 3. Pull Request 관리

#### PR 조회
- 열린 PR 목록
- PR 상세 정보
- 변경 사항 조회
- 리뷰 상태 확인

```
"현재 열린 Pull Request들을 보여주세요"
"PR #456의 변경 사항을 확인해주세요"
"리뷰가 필요한 PR들을 찾아주세요"
```

#### PR 생성 및 관리
- 새 PR 생성
- PR 제목/설명 수정
- 리뷰어 할당
- PR 머지/닫기

```
"feature/new-component 브랜치로 PR을 생성해주세요"
"PR #456을 머지해주세요"
"드래프트 PR을 ready로 변경해주세요"
```

### 4. 커밋 및 히스토리

#### 커밋 조회
- 커밋 히스토리
- 특정 커밋 상세 정보
- 커밋 검색
- 작성자별 필터링

```
"최근 10개 커밋을 보여주세요"
"특정 파일의 커밋 히스토리를 확인해주세요"
"버그 수정 관련 커밋들을 찾아주세요"
```

### 5. GitHub Actions

#### 워크플로우 관리
- 워크플로우 목록 조회
- 실행 상태 확인
- 로그 조회
- 워크플로우 재실행

```
"GitHub Actions 워크플로우 상태를 확인해주세요"
"실패한 워크플로우의 로그를 보여주세요"
"CI 워크플로우를 다시 실행해주세요"
```

## 실습 예제

### 예제 1: 프로젝트 상태 체크
```
"이 프로젝트의 현재 상태를 종합적으로 체크해주세요:
1. 열린 이슈 수와 주요 이슈들
2. 진행 중인 PR들
3. 최근 커밋 활동
4. GitHub Actions 상태"
```

### 예제 2: 릴리스 준비
```
"다음 릴리스를 위한 준비 상황을 체크해주세요:
1. 머지 대기 중인 PR들
2. 릴리스 관련 이슈들
3. 마일스톤 진행률
4. 변경사항 요약"
```

### 예제 3: 버그 트래킹
```
"현재 프로젝트의 버그 상황을 분석해주세요:
1. bug 레이블이 붙은 이슈들
2. 우선순위별 분류
3. 할당 상황
4. 해결 시간 추이"
```

### 예제 4: 코드 리뷰 자동화
```
"PR #123을 분석하여 다음을 수행해주세요:
1. 변경된 파일들 리뷰
2. 코드 품질 체크
3. 테스트 커버리지 확인
4. 리뷰 코멘트 작성"
```

## 고급 활용법

### 1. 자동화된 워크플로우

#### 일일 프로젝트 리포트
```
"매일 아침 프로젝트 상태 리포트를 만들어주세요:
- 어제 새로 생성된 이슈/PR
- 완료된 작업들
- 주의가 필요한 항목들
- 오늘의 우선순위"
```

#### 릴리스 체크리스트
```
"v2.0 릴리스를 위한 체크리스트를 생성하고 확인해주세요:
- 모든 관련 이슈가 닫혔는지 확인
- PR이 모두 머지되었는지 확인
- 테스트가 통과하는지 확인
- 문서가 업데이트되었는지 확인"
```

### 2. 프로젝트 분석

#### 기여자 분석
```
"지난 3개월간의 기여자 활동을 분석해주세요:
- 커밋 수별 순위
- 주요 기여 영역
- 코드 리뷰 참여도
- 이슈 해결 기여도"
```

#### 코드베이스 건강도 체크
```
"코드베이스의 전반적인 건강도를 평가해주세요:
- 오래된 PR들
- 방치된 이슈들
- 테스트 커버리지
- 문서화 상태"
```

### 3. GitHub 연동 개발 워크플로우

#### 이슈 기반 개발
```
"이슈 #789를 기반으로 개발 계획을 세워주세요:
1. 이슈 분석 및 요구사항 정리
2. 브랜치 생성 제안
3. 구현 단계별 체크리스트
4. 테스트 계획
5. PR 템플릿 준비"
```

#### 코드 리뷰 최적화
```
"PR의 리뷰 품질을 높이기 위한 분석을 해주세요:
1. 변경사항의 복잡도 평가
2. 잠재적 문제점 식별
3. 테스트 필요성 평가
4. 문서 업데이트 필요성 체크"
```

## 문제 해결

### 일반적인 문제들

#### 1. 연결 오류
**문제**: `github: npx @modelcontextprotocol/server-github - ✗ Failed`

**해결책**:
```bash
# 토큰 확인
echo $GITHUB_TOKEN

# MCP 서버 재시작
claude mcp remove github
claude mcp add github npx @modelcontextprotocol/server-github

# 패키지 업데이트
npm update -g @modelcontextprotocol/server-github
```

#### 2. 권한 오류
**문제**: `Error: Bad credentials` 또는 `403 Forbidden`

**해결책**:
1. GitHub 토큰 권한 확인
2. 토큰 만료 여부 확인
3. 리포지토리 접근 권한 확인

#### 3. 응답 속도 저하
**문제**: GitHub API 호출이 느림

**해결책**:
- API 레이트 리밋 확인
- 불필요한 대용량 요청 피하기
- 캐싱 활용

### 디버깅 팁

#### MCP 연결 상태 확인
```bash
# 연결 상태 체크
claude mcp list

# 상세 로그 확인 (개발자 도구)
# Claude Code에서 개발자 도구 열기 후 Console 탭 확인
```

#### API 응답 확인
```
"GitHub API 응답 상태를 확인해주세요"
"현재 API 레이트 리밋 상황을 알려주세요"
```

## Best Practices

### 1. 효율적인 사용법

#### 배치 처리 활용
```
# 좋은 예: 관련 정보를 한 번에 요청
"프로젝트 상태를 종합적으로 분석해주세요 (이슈, PR, 액션)"

# 피해야 할 예: 개별 요청 반복
"이슈 목록을 보여주세요"
"PR 목록을 보여주세요"
"액션 상태를 확인해주세요"
```

#### 구체적인 요청
```
# 좋은 예: 구체적이고 명확한 요청
"bug 레이블이 있는 high priority 이슈 중 할당되지 않은 것들을 보여주세요"

# 피해야 할 예: 모호한 요청
"이슈들 좀 보여줘"
```

### 2. 보안 고려사항

#### 토큰 관리
- GitHub 토큰을 코드에 하드코딩하지 않기
- 최소 권한 원칙 적용
- 정기적인 토큰 교체
- 토큰 만료 시점 관리

#### 민감한 정보 처리
- 개인 정보가 포함된 이슈/PR 주의
- 프라이빗 리포지토리 접근 시 주의
- 로그에 민감한 정보 노출 방지

### 3. 성능 최적화

#### API 호출 최적화
- 필요한 데이터만 요청
- 페이지네이션 적절히 활용
- 캐시 가능한 데이터 식별
- 레이트 리밋 고려한 요청 패턴

#### 대용량 데이터 처리
```
# 좋은 예: 점진적 데이터 로딩
"최근 50개 커밋을 먼저 보여주고, 필요시 더 로드해주세요"

# 피해야 할 예: 과도한 데이터 요청
"모든 커밋 히스토리를 한 번에 보여주세요"
```

### 4. 팀 협업

#### 표준화된 워크플로우
- 일관된 이슈 템플릿 사용
- 표준 PR 리뷰 프로세스
- 자동화된 상태 리포트
- 명명 규칙 준수

#### 문서화
```
"프로젝트의 GitHub 워크플로우를 문서화해주세요:
1. 이슈 생성 과정
2. 브랜치 전략
3. PR 리뷰 프로세스
4. 릴리스 절차"
```

## 추가 리소스

### 유용한 링크
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)

### 커뮤니티
- GitHub MCP Server Issues: https://github.com/modelcontextprotocol/servers
- Claude Code Community: https://github.com/anthropics/claude-code

### 학습 자료
- GitHub API 실습 튜토리얼
- MCP 서버 개발 가이드
- Claude Code 고급 활용법

---

이 가이드를 통해 GitHub MCP Server를 효과적으로 활용하여 개발 워크플로우를 획기적으로 개선할 수 있습니다. 추가 질문이나 특정 시나리오에 대한 도움이 필요하시면 언제든 말씀해 주세요.