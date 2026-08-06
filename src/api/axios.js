import axios from "axios";

export const TOKEN_KEY = "moiltae.accessToken";
export const MEMBER_KEY = "moiltae.member";

const defaultBaseURL = import.meta.env.DEV
  ? "http://localhost:8889/api/v1"
  : "/api/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseURL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(MEMBER_KEY);
      window.dispatchEvent(new Event("moiltae:unauthorized"));
    }
    return Promise.reject(error);
  },
);

export function getApiError(error) {
  if (!error.response) {
    return "서버에 연결할 수 없습니다. 백엔드 실행 상태를 확인해 주세요.";
  }

  const body = error.response.data;
  if (Array.isArray(body?.errors) && body.errors.length > 0) {
    return body.errors.map((item) => item.reason).join(" ");
  }
  return body?.message || "요청을 처리하지 못했습니다.";
}

export default api;
