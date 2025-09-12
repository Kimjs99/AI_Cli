// Google Calendar API 연동 서비스
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
}

export interface GoogleCalendarConfig {
  clientId: string;
  apiKey: string;
  scope: string;
}

class GoogleCalendarService {
  private config: GoogleCalendarConfig | null = null;
  private accessToken: string | null = null;
  private isInitialized = false;

  // Google Calendar API 설정
  initialize(config: GoogleCalendarConfig) {
    this.config = config;
    this.isInitialized = true;
    console.log('Google Calendar API 초기화 완료');
  }

  // Google OAuth 2.0 인증
  async authenticate(): Promise<boolean> {
    if (!this.isInitialized || !this.config) {
      console.error('Google Calendar API가 초기화되지 않았습니다.');
      return false;
    }

    try {
      // Google OAuth 2.0 인증 플로우 - 최신 표준 준수
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      
      // 필수 파라미터들
      authUrl.searchParams.set('client_id', this.config.clientId);
      authUrl.searchParams.set('redirect_uri', window.location.origin);
      authUrl.searchParams.set('scope', this.config.scope);
      authUrl.searchParams.set('response_type', 'token');
      authUrl.searchParams.set('access_type', 'offline');
      
      // 선택적 파라미터들
      authUrl.searchParams.set('include_granted_scopes', 'true');
      authUrl.searchParams.set('state', this.generateRandomState());
      
      console.log('OAuth URL 생성:', authUrl.toString());

      // 새 창으로 인증 진행
      const popup = window.open(
        authUrl.toString(), 
        'google-auth', 
        'width=500,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no'
      );
      
      if (!popup) {
        throw new Error('팝업 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
      }

      return new Promise((resolve) => {
        let resolved = false;
        
        const checkClosed = setInterval(() => {
          if (popup.closed && !resolved) {
            clearInterval(checkClosed);
            resolved = true;
            resolve(false);
          }
        }, 1000);

        // URL 해시에서 액세스 토큰 추출
        const checkUrl = setInterval(() => {
          try {
            if (popup.closed || resolved) {
              clearInterval(checkUrl);
              return;
            }

            const currentUrl = popup.location.href;
            
            // 성공적인 인증 후 리디렉션 확인
            if (currentUrl.includes('access_token=') || currentUrl.includes('error=')) {
              const url = new URL(currentUrl);
              
              // 에러 확인
              if (url.searchParams.has('error')) {
                const error = url.searchParams.get('error');
                const errorDescription = url.searchParams.get('error_description');
                console.error('OAuth 에러:', error, errorDescription);
                
                if (error === 'access_denied') {
                  showSnackbar('사용자가 인증을 취소했습니다.', 'warning');
                } else {
                  showSnackbar(`인증 오류: ${error}`, 'error');
                }
                
                popup.close();
                clearInterval(checkUrl);
                clearInterval(checkClosed);
                resolved = true;
                resolve(false);
                return;
              }
              
              // 액세스 토큰 추출
              if (url.hash) {
                const hash = url.hash.substring(1);
                const params = new URLSearchParams(hash);
                const accessToken = params.get('access_token');
                const tokenType = params.get('token_type');
                const expiresIn = params.get('expires_in');
                
                if (accessToken && tokenType === 'Bearer') {
                  this.accessToken = accessToken;
                  console.log('Google 인증 성공');
                  console.log('토큰 타입:', tokenType);
                  console.log('만료 시간:', expiresIn, '초');
                  
                  popup.close();
                  clearInterval(checkUrl);
                  clearInterval(checkClosed);
                  resolved = true;
                  resolve(true);
                  return;
                }
              }
            }
          } catch (error) {
            // CORS 오류는 정상적인 동작 (팝업이 아직 리디렉션되지 않음)
            // console.log('CORS 오류 (정상):', error.message);
          }
        }, 500);

        // 타임아웃 설정 (5분)
        setTimeout(() => {
          if (!resolved) {
            console.log('OAuth 인증 타임아웃');
            popup.close();
            clearInterval(checkUrl);
            clearInterval(checkClosed);
            resolved = true;
            resolve(false);
          }
        }, 300000);
      });
    } catch (error) {
      console.error('Google 인증 실패:', error);
      return false;
    }
  }

  // 랜덤 state 생성 (CSRF 방지)
  private generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // 일정 목록 가져오기
  async getEvents(calendarId: string = 'primary', timeMin?: Date, timeMax?: Date): Promise<GoogleCalendarEvent[]> {
    if (!this.accessToken) {
      throw new Error('인증이 필요합니다. 먼저 authenticate()를 호출해주세요.');
    }

    try {
      const params = new URLSearchParams();
      
      if (timeMin) {
        params.append('timeMin', timeMin.toISOString());
      }
      if (timeMax) {
        params.append('timeMax', timeMax.toISOString());
      }
      params.append('singleEvents', 'true');
      params.append('orderBy', 'startTime');

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Google Calendar API 오류: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('일정 가져오기 실패:', error);
      throw error;
    }
  }

  // 일정 생성
  async createEvent(calendarId: string, event: Omit<GoogleCalendarEvent, 'id'>): Promise<GoogleCalendarEvent> {
    if (!this.accessToken) {
      throw new Error('인증이 필요합니다.');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error(`일정 생성 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('일정 생성 실패:', error);
      throw error;
    }
  }

  // 일정 수정
  async updateEvent(calendarId: string, eventId: string, event: Partial<GoogleCalendarEvent>): Promise<GoogleCalendarEvent> {
    if (!this.accessToken) {
      throw new Error('인증이 필요합니다.');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error(`일정 수정 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('일정 수정 실패:', error);
      throw error;
    }
  }

  // 일정 삭제
  async deleteEvent(calendarId: string, eventId: string): Promise<boolean> {
    if (!this.accessToken) {
      throw new Error('인증이 필요합니다.');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('일정 삭제 실패:', error);
      return false;
    }
  }

  // 캘린더 목록 가져오기
  async getCalendars(): Promise<Array<{ id: string; summary: string; primary?: boolean }>> {
    if (!this.accessToken) {
      throw new Error('인증이 필요합니다.');
    }

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`캘린더 목록 가져오기 실패: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('캘린더 목록 가져오기 실패:', error);
      throw error;
    }
  }

  // 연결 해제
  disconnect() {
    this.accessToken = null;
    this.config = null;
    this.isInitialized = false;
    console.log('Google Calendar 연결 해제됨');
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return !!this.accessToken && this.isInitialized;
  }

  // 액세스 토큰 가져오기
  getAccessToken(): string | null {
    return this.accessToken;
  }
}

// 전역 함수로 스낵바 표시 (임시)
declare global {
  function showSnackbar(message: string, severity: 'success' | 'error' | 'info' | 'warning'): void;
}

export const googleCalendarService = new GoogleCalendarService();
export default googleCalendarService;

