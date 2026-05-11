export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type BackendPackage = 
  | "cache" | "controller" | "cron_job" | "db" 
  | "domain" | "handler" | "repository" | "route" | "service";

export type FrontendPackage = 
  | "api" | "component" | "hook" | "page" | "state" | "style";

export type SharedPackage = 
  | "auth" | "config" | "middleware" | "utils";

export type ValidPackage<S extends Stack> = 
  S extends "backend" ? BackendPackage | SharedPackage :
  S extends "frontend" ? FrontendPackage | SharedPackage : never;

let authenticationToken: string | undefined;

/**
 * Provisions the logging module with necessary security credentials to authorize upstream transmissions.
 */
export function initLogger(config: { token?: string }): void {
  if (!config.token) return;
  authenticationToken = config.token;
}

/**
 * Transmits structured diagnostic telemetry to the centralized evaluation service for system monitoring.
 */
export async function Log<S extends Stack>(
  stack: S,
  level: Level,
  pkg: ValidPackage<S>,
  message: string
): Promise<void> {
  const logPayload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authenticationToken) {
      requestHeaders["Authorization"] = `Bearer ${authenticationToken}`;
    }

    const networkResponse = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(logPayload),
    });

    if (networkResponse.ok) return;

    const errorResponseBody = await networkResponse.text();
    console.warn(`Logging failed with status ${networkResponse.status}. Response: ${errorResponseBody}`);
  } catch (executionError) {
    console.error("Failed to execute log API call:", executionError);
  }
}
