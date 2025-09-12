import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Switch,
  TextField,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Book as NotionIcon,
  Settings as SettingsIcon,
  Sync as SyncIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import googleCalendarService from '../services/googleCalendar';
import notionService from '../services/notion';

const Settings: React.FC = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [notionConnected, setNotionConnected] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [syncInterval, setSyncInterval] = useState('30');
  
  // 설정 다이얼로그 상태
  const [googleConfigOpen, setGoogleConfigOpen] = useState(false);
  const [notionConfigOpen, setNotionConfigOpen] = useState(false);
  
  // 설정 값들
  const [googleConfig, setGoogleConfig] = useState({
    clientId: '',
    apiKey: '',
  });
  const [notionConfig, setNotionConfig] = useState({
    apiKey: '',
    databaseId: '',
  });
  
  // 알림 상태
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // 컴포넌트 마운트 시 연결 상태 확인
  useEffect(() => {
    setGoogleConnected(googleCalendarService.isConnected());
    setNotionConnected(notionService.isConnected());
    
    // 로컬 스토리지에서 설정 불러오기
    const savedGoogleConfig = localStorage.getItem('googleCalendarConfig');
    const savedNotionConfig = localStorage.getItem('notionConfig');
    
    if (savedGoogleConfig) {
      const config = JSON.parse(savedGoogleConfig);
      setGoogleConfig(config);
      if (config.clientId && config.apiKey) {
        googleCalendarService.initialize({
          clientId: config.clientId,
          apiKey: config.apiKey,
          scope: 'https://www.googleapis.com/auth/calendar',
        });
      }
    }
    
    if (savedNotionConfig) {
      const config = JSON.parse(savedNotionConfig);
      setNotionConfig(config);
      if (config.apiKey && config.databaseId) {
        notionService.initialize(config);
      }
    }
  }, []);

  // Google Calendar 연결
  const handleGoogleConnect = async () => {
    if (googleConnected) {
      // 연결 해제
      googleCalendarService.disconnect();
      setGoogleConnected(false);
      showSnackbar('Google Calendar 연결이 해제되었습니다.', 'info');
    } else {
      // 설정 다이얼로그 열기
      setGoogleConfigOpen(true);
    }
  };

  // Google Calendar 설정 저장 및 연결
  const handleGoogleConfigSave = async () => {
    try {
      if (!googleConfig.clientId || !googleConfig.apiKey) {
        showSnackbar('Client ID와 API Key를 모두 입력해주세요.', 'error');
        return;
      }

      // 서비스 초기화
      googleCalendarService.initialize({
        clientId: googleConfig.clientId,
        apiKey: googleConfig.apiKey,
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      // 로컬 스토리지에 저장
      localStorage.setItem('googleCalendarConfig', JSON.stringify(googleConfig));

      // 인증 시도
      const success = await googleCalendarService.authenticate();
      if (success) {
        setGoogleConnected(true);
        setGoogleConfigOpen(false);
        showSnackbar('Google Calendar 연결이 완료되었습니다!', 'success');
      } else {
        showSnackbar('Google Calendar 인증에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('Google Calendar 연결 실패:', error);
      showSnackbar('Google Calendar 연결에 실패했습니다.', 'error');
    }
  };

  // Notion 연결
  const handleNotionConnect = async () => {
    if (notionConnected) {
      // 연결 해제
      notionService.disconnect();
      setNotionConnected(false);
      showSnackbar('Notion 연결이 해제되었습니다.', 'info');
    } else {
      // 설정 다이얼로그 열기
      setNotionConfigOpen(true);
    }
  };

  // Notion 설정 저장 및 연결
  const handleNotionConfigSave = async () => {
    try {
      if (!notionConfig.apiKey || !notionConfig.databaseId) {
        showSnackbar('API Key와 Database ID를 모두 입력해주세요.', 'error');
        return;
      }

      // 서비스 초기화
      notionService.initialize(notionConfig);

      // 로컬 스토리지에 저장
      localStorage.setItem('notionConfig', JSON.stringify(notionConfig));

      // 연결 테스트
      try {
        await notionService.getDatabases();
        setNotionConnected(true);
        setNotionConfigOpen(false);
        showSnackbar('Notion 연결이 완료되었습니다!', 'success');
      } catch (error) {
        showSnackbar('Notion 연결에 실패했습니다. API Key와 Database ID를 확인해주세요.', 'error');
      }
    } catch (error) {
      console.error('Notion 연결 실패:', error);
      showSnackbar('Notion 연결에 실패했습니다.', 'error');
    }
  };

  // 즉시 동기화
  const handleSyncNow = async () => {
    try {
      if (googleConnected) {
        // Google Calendar 동기화
        const events = await googleCalendarService.getEvents('primary');
        console.log('Google Calendar 동기화 완료:', events.length, '개 일정');
      }
      
      if (notionConnected) {
        // Notion 동기화
        const tasks = await notionService.getTasks(notionConfig.databaseId);
        console.log('Notion 동기화 완료:', tasks.length, '개 할 일');
      }
      
      showSnackbar('동기화가 완료되었습니다.', 'success');
    } catch (error) {
      console.error('동기화 실패:', error);
      showSnackbar('동기화에 실패했습니다.', 'error');
    }
  };

  // 알림 표시
  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        설정
      </Typography>

      <Grid container spacing={3}>
        {/* 연동 서비스 설정 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsIcon />
              연동 서비스
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <GoogleIcon color="primary" />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">Google Calendar</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Google Calendar와 일정을 동기화합니다
                      </Typography>
                    </Box>
                    <Chip
                      label={googleConnected ? '연결됨' : '연결 안됨'}
                      color={googleConnected ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant={googleConnected ? 'outlined' : 'contained'}
                    onClick={handleGoogleConnect}
                    startIcon={googleConnected ? <SyncIcon /> : <GoogleIcon />}
                  >
                    {googleConnected ? '연결 해제' : '연결하기'}
                  </Button>
                </CardActions>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <NotionIcon color="primary" />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">Notion</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Notion 데이터베이스와 동기화합니다
                      </Typography>
                    </Box>
                    <Chip
                      label={notionConnected ? '연결됨' : '연결 안됨'}
                      color={notionConnected ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant={notionConnected ? 'outlined' : 'contained'}
                    onClick={handleNotionConnect}
                    startIcon={notionConnected ? <SyncIcon /> : <NotionIcon />}
                  >
                    {notionConnected ? '연결 해제' : '연결하기'}
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                동기화 설정
              </Typography>
              <TextField
                label="동기화 간격 (분)"
                type="number"
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                helperText="자동 동기화 간격을 설정합니다"
              />
              <Button
                variant="outlined"
                startIcon={<SyncIcon />}
                onClick={handleSyncNow}
                fullWidth
                disabled={!googleConnected && !notionConnected}
              >
                지금 동기화
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* 앱 설정 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsIcon />
              앱 설정
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="알림"
                  secondary="일정 및 할 일 알림을 받습니다"
                />
                <Switch
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="다크 모드"
                  secondary="어두운 테마를 사용합니다"
                />
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                데이터 관리
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth>
                    데이터 내보내기
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth>
                    데이터 가져오기
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* 연동 상태 및 정보 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              연동 상태
            </Typography>
            
            {googleConnected && notionConnected ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                모든 서비스가 정상적으로 연동되어 있습니다.
              </Alert>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                일부 서비스가 연동되지 않았습니다. 연동을 통해 더 나은 경험을 제공받을 수 있습니다.
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Google Calendar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {googleConnected 
                    ? '연결됨 - 일정 동기화 가능' 
                    : '연결되지 않음 - Client ID와 API Key 설정 필요'
                  }
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Notion
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notionConnected 
                    ? '연결됨 - 할 일 동기화 가능' 
                    : '연결되지 않음 - API Key와 Database ID 설정 필요'
                  }
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Google Calendar 설정 다이얼로그 */}
      <Dialog open={googleConfigOpen} onClose={() => setGoogleConfigOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Google Calendar 연동 설정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>중요:</strong> Google Cloud Console에서 다음 설정이 필요합니다.
              </Typography>
            </Alert>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              1. <strong>Google Calendar API</strong> 활성화<br/>
              2. <strong>OAuth 2.0 클라이언트 ID</strong> 생성 (웹 애플리케이션)<br/>
              3. <strong>승인된 리디렉션 URI</strong>에 <code>{window.location.origin}</code> 추가
            </Typography>
            
            <TextField
              label="Client ID"
              value={googleConfig.clientId}
              onChange={(e) => setGoogleConfig({ ...googleConfig, clientId: e.target.value })}
              fullWidth
              placeholder="123456789-abcdefghijklmnop.apps.googleusercontent.com"
              helperText="Google Cloud Console > 사용자 인증 정보 > OAuth 2.0 클라이언트 ID"
              required
            />
            <TextField
              label="API Key"
              value={googleConfig.apiKey}
              onChange={(e) => setGoogleConfig({ ...googleConfig, apiKey: e.target.value })}
              fullWidth
              placeholder="AIzaSyB..."
              helperText="Google Cloud Console > 사용자 인증 정보 > API 키"
              required
            />
            
            <Alert severity="warning" sx={{ mt: 1 }}>
              <Typography variant="body2">
                <strong>팝업 차단 해제:</strong> 인증 과정에서 팝업 창이 열리므로 브라우저의 팝업 차단을 해제해주세요.
              </Typography>
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoogleConfigOpen(false)}>취소</Button>
          <Button 
            onClick={handleGoogleConfigSave} 
            variant="contained"
            disabled={!googleConfig.clientId || !googleConfig.apiKey}
          >
            저장 및 연결
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notion 설정 다이얼로그 */}
      <Dialog open={notionConfigOpen} onClose={() => setNotionConfigOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Notion 연동 설정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Notion Developers에서 Integration을 생성하고 API 키를 발급받아주세요.
            </Typography>
            <TextField
              label="API Key"
              value={notionConfig.apiKey}
              onChange={(e) => setNotionConfig({ ...notionConfig, apiKey: e.target.value })}
              fullWidth
              placeholder="secret_..."
            />
            <TextField
              label="Database ID"
              value={notionConfig.databaseId}
              onChange={(e) => setNotionConfig({ ...notionConfig, databaseId: e.target.value })}
              fullWidth
              placeholder="12345678-1234-1234-1234-123456789012"
              helperText="Notion 데이터베이스 URL에서 추출할 수 있습니다"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotionConfigOpen(false)}>취소</Button>
          <Button onClick={handleNotionConfigSave} variant="contained">
            저장 및 연결
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 스낵바 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;

