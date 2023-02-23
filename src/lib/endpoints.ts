const PREFIX = 'api';
export const API_ENDPOINTS = {
  USERS: `${PREFIX}/users`,
  LOCATIONS: `${PREFIX}/locations`,
  POSITIONS: `${PREFIX}/positions`,
  SCANNER_START: `${PREFIX}/jobs-agent/start`,
  SCANNER_DOWNLOAD: `${PREFIX}/jobs-agent/download`,
  GET_JOBS: `${PREFIX}/jobs-agent/jobs`
};
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
