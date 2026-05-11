import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Layout } from './components/Layout';
import { AllNotifications } from './pages/AllNotifications';
import { PriorityNotifications } from './pages/PriorityNotifications';
import { initLogger } from 'logger-middleware';

// Initialize the logger for frontend usage
initLogger({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDQ5OEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4Nzk1MSwiaWF0IjoxNzc4NDg3MDUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzZkMzQwOTMtNzVhNy00OTY5LWFjNzEtM2JmZTEyYmQwOTkxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2Fydml0YSBiYXRyYSIsInN1YiI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiJ9LCJlbWFpbCI6ImUyM2NzZXUwNDk4QGJlbm5ldHQuZWR1LmluIiwibmFtZSI6ImdhcnZpdGEgYmF0cmEiLCJyb2xsTm8iOiJlMjNjc2V1MDQ5OCIsImFjY2Vzc0NvZGUiOiJUZkR4Z3IiLCJjbGllbnRJRCI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiIsImNsaWVudFNlY3JldCI6IkhuZlBYeUpSckdadHdNV1QifQ.1jgV6LOqZL76K9WxwmDkwDbNlca5iAXGR64Msc7T33g' });

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AllNotifications />} />
            <Route path="priority" element={<PriorityNotifications />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
