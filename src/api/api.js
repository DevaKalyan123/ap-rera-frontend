// src/api/api.js


const isProduction = import.meta.env.MODE === "production";

/**
 * Backend Base URL
 * - Dev: DevTunnel backend (8080)
 * - Prod: real domain
 */
export const DEV_BACKEND_URL = "https://zrnwpbn5-5000.inc1.devtunnels.ms/";

//const DEV_BACKEND_URL = "http://localhost:8080";

const PROD_BACKEND_URL = "https://your-production-domain.com";

export const BASE_URL = isProduction
  ? PROD_BACKEND_URL
  : DEV_BACKEND_URL;

// ================================
// 🔁 API FETCH WRAPPER
// ================================
export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

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

  // Detect tunnel HTML error
  if (raw.startsWith("<!DOCTYPE html>")) {
    throw new Error("Backend not reachable or DevTunnel expired");
  }

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
// API HELPERS
// ================================
export const apiGet = (url) =>
  apiFetch(url, { method: "GET" });

export const apiPost = (url, body) =>
  apiFetch(url, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

export const apiPut = (url, body) =>
  apiFetch(url, {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });

export const apiDelete = (url) =>
  apiFetch(url, { method: "DELETE" });

// ================================
// SPECIFIC API ENDPOINTS FOR NEW USER REGISTRATION
// ================================

// Get all states
export const getStates = () => apiGet("/api/states");

// Get districts by state ID
export const getDistricts = (stateId) => {
  if (!stateId) return Promise.resolve([]);
  return apiGet(`/api/districts/${stateId}`);
};

// Get mandals by district ID
export const getMandals = (districtId) => {
  if (!districtId) return Promise.resolve([]);
  return apiGet(`/api/mandals/${districtId}`);
};

// Get villages by mandal ID
export const getVillages = (mandalId) => {
  if (!mandalId) return Promise.resolve([]);
  return apiGet(`/api/villages/${mandalId}`);
};

// Submit new promoter registration
export const submitPromoterRegistration = (formData) => {
  return apiPost("/api/promoter/registration", formData);
};

// Optional: Check if PAN already exists
export const checkPanExists = (panNumber) => {
  return apiGet(`/api/check-pan/${panNumber}`);
};

export const getProjectByPan = (panNumber) => {
  return apiGet(`/api/project/basic-details-by-pan?pan=${panNumber}`);
};

// Submit Change Request (FormData)
export const submitChangeRequest = (formData) => {
  return apiPost("/api/change-request", formData);
};

