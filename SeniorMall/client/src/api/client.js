import axios from 'axios';

// baseURL: '' → Vite proxy가 /api 를 백엔드로 라우팅
const api = axios.create({
  baseURL: '',
  withCredentials: false,
  timeout: 15000
});

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const tokenStore = {
  get access() { return localStorage.getItem(TOKEN_KEY); },
  get refresh() { return localStorage.getItem(REFRESH_KEY); },
  setTokens({ accessToken, refreshToken }) {
    if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
};

// 모든 요청에 access token 자동 첨부
api.interceptors.request.use((config) => {
  const token = tokenStore.access;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 응답 시 refresh → 1회 재시도. 동시 다발 401에 대비해 단일 refresh promise 공유.
let refreshPromise = null;

async function refreshAccessToken() {
  const refreshToken = tokenStore.refresh;
  if (!refreshToken) throw new Error('NO_REFRESH_TOKEN');
  const { data } = await axios.post('/api/auth/refresh', { refreshToken });
  tokenStore.setTokens({ accessToken: data.accessToken });
  return data.accessToken;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    // refresh 자체가 실패하면 다시 시도하지 않음
    if (!original || original.url?.includes('/api/auth/refresh')) {
      tokenStore.clear();
      return Promise.reject(error);
    }

    if (status === 401 && !original._retry) {
      original._retry = true;
      try {
        if (!refreshPromise) refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
        const newToken = await refreshPromise;
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        // refresh 실패: 로그아웃 신호. AuthContext 가 이를 감지하도록 storage 이벤트는 자동 발생.
        tokenStore.clear();
        // 라우터에서 가로채도록 location 변경 (StrictMode 대응 위해 replace)
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
          window.location.replace('/login');
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

// 백엔드의 표준 에러 응답({ error, code })을 사용자 친화적 메시지로 변환
export function getErrorMessage(error, fallback = '요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.') {
  return error?.response?.data?.error || error?.message || fallback;
}

export default api;
