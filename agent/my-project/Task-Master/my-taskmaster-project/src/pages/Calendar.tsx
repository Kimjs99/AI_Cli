import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  type: 'meeting' | 'deadline' | 'personal' | 'other';
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: '팀 미팅',
      date: new Date(),
      time: '14:00',
      description: '주간 진행상황 공유',
      type: 'meeting',
    },
    {
      id: 2,
      title: '프로젝트 마감',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '17:00',
      description: '프로젝트 완료 및 제출',
      type: 'deadline',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    description: '',
    type: 'other' as Event['type'],
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '',
      description: '',
      type: 'other',
    });
    setOpenDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: format(event.date, 'yyyy-MM-dd'),
      time: event.time,
      description: event.description,
      type: event.type,
    });
    setOpenDialog(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      // 기존 이벤트 수정
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...formData, date: new Date(formData.date) }
          : event
      ));
    } else {
      // 새 이벤트 추가
      const newEvent: Event = {
        id: Date.now(),
        ...formData,
        date: new Date(formData.date),
      };
      setEvents([...events, newEvent]);
    }
    setOpenDialog(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'primary';
      case 'deadline': return 'error';
      case 'personal': return 'success';
      default: return 'default';
    }
  };

  const getTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return '미팅';
      case 'deadline': return '마감';
      case 'personal': return '개인';
      default: return '기타';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">캘린더</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          일정 추가
        </Button>
      </Box>

      {/* 월 네비게이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <Button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        >
          이전 달
        </Button>
        <Typography variant="h5" sx={{ mx: 3 }}>
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </Typography>
        <Button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
        >
          다음 달
        </Button>
      </Box>

      {/* 캘린더 그리드 */}
      <Paper sx={{ p: 2 }}>
        <Grid container>
          {/* 요일 헤더 */}
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Grid item xs key={day} sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {day}
              </Typography>
            </Grid>
          ))}

          {/* 날짜 셀들 */}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <Grid
                item
                xs
                key={day.toString()}
                sx={{
                  minHeight: 120,
                  border: '1px solid #e0e0e0',
                  p: 1,
                  backgroundColor: isToday(day) ? '#f0f8ff' : 'white',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isToday(day) ? 'bold' : 'normal',
                    color: isToday(day) ? 'primary.main' : 'text.primary',
                  }}
                >
                  {format(day, 'd')}
                </Typography>
                
                {dayEvents.map((event) => (
                  <Box key={event.id} sx={{ mt: 1 }}>
                    <Chip
                      label={`${event.time} ${event.title}`}
                      size="small"
                      color={getTypeColor(event.type)}
                      sx={{ fontSize: '0.7rem', height: 20 }}
                    />
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditEvent(event)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* 일정 추가/수정 다이얼로그 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? '일정 수정' : '새 일정 추가'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="제목"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="날짜"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="시간"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              fullWidth
              placeholder="14:00"
            />
            <TextField
              label="설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>유형</InputLabel>
              <Select
                value={formData.type}
                label="유형"
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
              >
                <MenuItem value="meeting">미팅</MenuItem>
                <MenuItem value="deadline">마감</MenuItem>
                <MenuItem value="personal">개인</MenuItem>
                <MenuItem value="other">기타</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSaveEvent} variant="contained">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;

