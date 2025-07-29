export function logEvent(eventName, data = {}) {
  const timestamp = new Date().toISOString();
  const log = { event: eventName, data, timestamp };

  const logs = JSON.parse(localStorage.getItem('appLogs')) || [];
  logs.push(log);
  localStorage.setItem('appLogs', JSON.stringify(logs));
}