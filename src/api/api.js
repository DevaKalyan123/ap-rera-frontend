// src/api/api.js

const isProduction = import.meta.env.MODE === "production";

/**
 * Backend Base URL
 */
export const DEV_BACKEND_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const PROD_BACKEND_URL =
  import.meta.env.VITE_API_URL || "https://ap-rera-backend.onrender.com";

export const BASE_URL = isProduction
  ? PROD_BACKEND_URL
  : DEV_BACKEND_URL;

// ================================
// API FETCH WRAPPER
// ================================
export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  console.log("API URL:", url);

  const isFormData = options.body instanceof FormData;

  const res = await fetch(url, {
    mode: "cors",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    ...options,
  });

  const raw = await res.text();

  let data;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      (data && (data.error || data.message)) ||
        `HTTP ${res.status}`
    );
  }

  return data;
}

// ================================
// COMMON METHODS
// ================================
export const apiGet = (url) =>
  apiFetch(url, { method: "GET" });

export const apiPost = (url, body) =>
  apiFetch(url, {
    method: "POST",
    body: body instanceof FormData
      ? body
      : JSON.stringify(body),
  });

export const apiPut = (url, body) =>
  apiFetch(url, {
    method: "PUT",
    body: body instanceof FormData
      ? body
      : JSON.stringify(body),
  });

export const apiDelete = (url) =>
  apiFetch(url, { method: "DELETE" });

// ================================
// API ENDPOINTS
// ================================

// STATES
export const getStates = () =>
  apiGet("/api/states");

// DISTRICTS
export const getDistricts = (stateId) => {
  if (!stateId) return Promise.resolve([]);
  return apiGet(`/api/districts/${stateId}`);
};

// MANDALS
export const getMandals = (districtId) => {
  if (!districtId) return Promise.resolve([]);
  return apiGet(`/api/mandals/${districtId}`);
};

// VILLAGES
export const getVillages = (mandalId) => {
  if (!mandalId) return Promise.resolve([]);
  return apiGet(`/api/villages/${mandalId}`);
};

// PROMOTER REGISTRATION
export const submitPromoterRegistration = (formData) => {
  return apiPost("/api/promoter/registration", formData);
};

// CHECK PAN
export const checkPanExists = (panNumber) => {
  return apiGet(`/api/check-pan/${panNumber}`);
};

// PROJECT BY PAN
export const getProjectByPan = (panNumber) => {
  return apiGet(
    `/api/project/basic-details-by-pan?pan=${panNumber}`
  );
};

// CHANGE REQUEST
export const submitChangeRequest = (formData) => {
  return apiPost("/api/change-request", formData);
};