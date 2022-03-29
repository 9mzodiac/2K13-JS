const API_ROOT = process.env.API_URL;

let token: string | null = null;

const getHeaders = (secured: boolean) => {
  let headers = {};
  if (token && secured) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  return headers;
};

export const API = {
  get: async (url: string, secured: boolean = false) => {
    return fetch(`${API_ROOT}${url}`, {
      method: "GET",
      headers: getHeaders(secured),
    });
  },
  setToken: (newToken: string) => (token = newToken),
};
