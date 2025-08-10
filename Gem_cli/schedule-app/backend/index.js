
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// Access tokens will be stored here in-memory for this example
let tokens;

// Scopes define the level of access you are requesting
const scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'
];

// Route to start the OAuth 2.0 flow
app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.redirect(url);
});

// Route to handle the OAuth 2.0 callback
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens: newTokens } = await oauth2Client.getToken(code);
    tokens = newTokens;
    oauth2Client.setCredentials(tokens);
    
    // Redirect to the frontend app after successful authentication
    // In a real app, you'd pass a token to the frontend
    res.redirect('http://localhost:3000?auth_success=true'); 
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Error retrieving access token');
  }
});

// Route to check if the user is authenticated
app.get('/api/is_authenticated', (req, res) => {
  res.json({ isAuthenticated: !!tokens });
});

// Route to list calendar events
app.get('/api/calendar/events', async (req, res) => {
  if (!tokens) {
    return res.status(401).send('You need to log in first.');
  }
  
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(response.data.items);
  } catch (error) {
    console.error('The API returned an error: ' + error);
    res.status(500).send('Failed to fetch calendar events');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
