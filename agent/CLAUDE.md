# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Environment Setup

This repository contains multiple projects in different directories. Most projects use specific package managers:

- **Next.js projects** (google-calendar-scheduler, student-observation-system, student-performance-analyzer, cafa-grading-system): Use `npm install` and `npm run dev`
- **Python projects** (weather, backend): Use appropriate Python package managers
- **General projects**: Check individual README files

## Common Development Commands

### Next.js Projects
```bash
npm install          # Install dependencies
npm run dev          # Start development server (usually with --turbopack)
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run linting
```

### Python Projects
```bash
pip install -r requirements.txt    # For projects with requirements.txt
uv install                         # For projects using uv (like weather/)
python main.py                     # Start Python applications
```

### FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload          # Start FastAPI development server
```

## Project Architecture

### Multi-Project Repository Structure
This repository contains several independent projects:

1. **google-calendar-scheduler**: Next.js 15 app using React 19, Google Calendar API integration, Zustand for state management
2. **student-observation-system**: Next.js 14 education management system with Google Sheets integration, React Hook Form, and Zod validation
3. **student-performance-analyzer**: Next.js 14 app for student data analysis with Google APIs
4. **cafa-grading-system**: Node.js/Express system with PostgreSQL, Redis, and AI integration using Anthropic SDK
5. **backend**: FastAPI timetable scheduling system with in-memory data persistence
6. **weather**: Python MCP (Model Context Protocol) project using httpx and uv
7. **frontend**: Basic frontend directory structure

### Key Technology Patterns

#### Next.js Projects (Multiple)
- **Framework**: Next.js 14-15 with App Router
- **Styling**: Tailwind CSS 4 with PostCSS
- **State Management**: Zustand (google-calendar-scheduler) or React state
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Lucide React icons
- **APIs**: Google APIs (Sheets, Calendar, Auth)

#### Backend Services
- **FastAPI**: Used for timetable generation with CORS middleware
- **Express.js**: CAFA grading system with comprehensive middleware stack
- **Data Storage**: Mix of JSON files, PostgreSQL, Redis, and Google Sheets

#### Educational Domain Focus
Most projects are education-related:
- Student observation and grading systems
- Calendar scheduling for educational purposes  
- Performance analysis tools
- Automated grading systems

## Testing and Quality

### Linting
Most projects use ESLint with Next.js configurations:
```bash
npm run lint    # For JavaScript/TypeScript projects
```

### Testing  
Projects with Jest setup (like cafa-grading-system):
```bash
npm test        # Run tests
```

## Project-Specific Notes

### Google APIs Integration
Multiple projects integrate with Google services - ensure proper API credentials are configured:
- Google Sheets API (student-observation-system)
- Google Calendar API (google-calendar-scheduler)
- Google Auth Library (student-performance-analyzer)

### Database Migrations
For projects using database migrations (cafa-grading-system):
```bash
npm run migrate    # Run database migrations
npm run seed       # Run database seeds
```

### Korean Language Support
Several projects include Korean language content and documentation - ensure UTF-8 encoding is properly handled.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
