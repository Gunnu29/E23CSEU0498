import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { Log, initLogger } from 'logger-middleware';

initLogger({ token: process.env.LOG_TOKEN || 'test-token-123' });

const application = express();
const LISTENING_PORT = 3000;

application.use(express.json());

/**
 * Intercepts incoming network requests to generate foundational audit trails.
 */
application.use((incomingRequest: Request, outgoingResponse: Response, nextMiddleware: NextFunction) => {
  Log("backend", "info", "middleware", `Incoming request: ${incomingRequest.method} ${incomingRequest.url}`);
  nextMiddleware();
});

/**
 * Provides a reliable liveness probe for orchestration systems to verify service availability.
 */
application.get('/api/health', (incomingRequest: Request, outgoingResponse: Response) => {
  Log("backend", "debug", "route", "Health check endpoint called");
  outgoingResponse.json({ status: "ok" });
});

/**
 * Processes and validates incoming client payloads to ensure data integrity before further domain logic.
 */
application.post('/api/data', (incomingRequest: Request, outgoingResponse: Response) => {
  const { data: requestPayload } = incomingRequest.body;
  
  if (!requestPayload) {
    Log("backend", "warn", "controller", "Received POST without data");
    return outgoingResponse.status(400).json({ error: "No data provided" });
  }

  Log("backend", "info", "controller", `Received valid data: ${JSON.stringify(requestPayload)}`);
  return outgoingResponse.json({ status: "success", data: requestPayload });
});

/**
 * Verifies system error handling patterns by artificially triggering a critical execution failure.
 */
application.get('/api/error', (incomingRequest: Request, outgoingResponse: Response) => {
  Log("backend", "error", "service", "Simulated service failure");
  return outgoingResponse.status(500).json({ error: "Internal Server Error" });
});

application.listen(LISTENING_PORT, () => {
  Log("backend", "info", "config", `Server is running on port ${LISTENING_PORT}`);
  console.log(`Backend listening on port ${LISTENING_PORT}`);
});
