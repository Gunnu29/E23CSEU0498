const { Log, initLogger } = require('./dist/index.js');

// If you have a valid token for the API, add it here!
initLogger({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MDQ5OEBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ4Nzk1MSwiaWF0IjoxNzc4NDg3MDUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzZkMzQwOTMtNzVhNy00OTY5LWFjNzEtM2JmZTEyYmQwOTkxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2Fydml0YSBiYXRyYSIsInN1YiI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiJ9LCJlbWFpbCI6ImUyM2NzZXUwNDk4QGJlbm5ldHQuZWR1LmluIiwibmFtZSI6ImdhcnZpdGEgYmF0cmEiLCJyb2xsTm8iOiJlMjNjc2V1MDQ5OCIsImFjY2Vzc0NvZGUiOiJUZkR4Z3IiLCJjbGllbnRJRCI6IjZjNDE1NDRhLWU3YjUtNDU0ZC05M2Y0LWRmYWQzOTI1NjA2YiIsImNsaWVudFNlY3JldCI6IkhuZlBYeUpSckdadHdNV1QifQ.1jgV6LOqZL76K9WxwmDkwDbNlca5iAXGR64Msc7T33g' });

async function runTest() {
  console.log("Sending test log to the API...");
  
  // Example 1: Valid backend log
  await Log("backend", "info", "controller", "Testing the logger package from a Node script!");
  
  // Example 2: Valid frontend log
  await Log("frontend", "error", "component", "Simulated frontend component error");
  
  console.log("Log requests completed. Check the console output above for any API responses (like 401 Unauthorized if the token is invalid).");
}

runTest();
