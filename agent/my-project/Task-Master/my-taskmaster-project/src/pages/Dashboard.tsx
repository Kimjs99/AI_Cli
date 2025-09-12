import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import {
  Event as EventIcon,
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  Schedule as UpcomingIcon,
} from '@mui/icons-material';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

const Dashboard: React.FC = () => {
  const today = new Date();
  const upcomingEvents = [
    {
      id: 1,
      title: '팀 미팅',
      time: '14:00',
      type: 'meeting',
    },
    {
      id: 2,
      title: '프로젝트 마감',
      time: '17:00',
      type: 'deadline',
    },
    {
      id: 3,
      title: '운동',
      time: '19:00',
      type: 'personal',
    },
  ];

  const recentTasks = [
    { id: 1, title: '이메일 확인', completed: true },
    { id: 2, title: '보고서 작성', completed: false },
    { id: 3, title: '코드 리뷰', completed: false },
    { id: 4, title: '회의 준비', completed: true },
  ];

  const stats = [
    { label: '오늘 일정', value: '5', icon: <EventIcon />, color: 'primary' },
    { label: '진행중인 할 일', value: '3', icon: <TaskIcon />, color: 'warning' },
    { label: '완료된 할 일', value: '8', icon: <CompletedIcon />, color: 'success' },
    { label: '이번 주 일정', value: '12', icon: <UpcomingIcon />, color: 'info' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        안녕하세요! 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {format(today, 'yyyy년 M월 d일 EEEE', { locale: ko })} - 오늘의 일정을 확인해보세요
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* 통계 카드들 */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* 오늘의 일정 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              오늘의 일정
            </Typography>
            <List>
              {upcomingEvents.map((event) => (
                <ListItem key={event.id} divider>
                  <ListItemIcon>
                    <EventIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.title}
                    secondary={event.time}
                  />
                  <Chip
                    label={event.type === 'meeting' ? '미팅' : event.type === 'deadline' ? '마감' : '개인'}
                    size="small"
                    color={event.type === 'meeting' ? 'primary' : event.type === 'deadline' ? 'error' : 'default'}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 최근 할 일 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              최근 할 일
            </Typography>
            <List>
              {recentTasks.map((task) => (
                <ListItem key={task.id} divider>
                  <ListItemIcon>
                    {task.completed ? (
                      <CompletedIcon color="success" />
                    ) : (
                      <TaskIcon color="action" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

