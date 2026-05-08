import axios from "axios";
import { BASE_URL } from "./api";


const API = axios.create({
  //baseURL: "http://localhost:8080/api/agent-renewal"
    baseURL: `${BASE_URL}/api/agent-renewal`

});

/* CREATE RENEWAL */
export const createRenewal = (data) =>
  API.post("/create", data);

/* SUBMIT RENEWAL */
export const submitRenewal = (renewalId) =>
  API.post(`/submit/${renewalId}`);

/* PAYMENT */
export const makePayment = (renewalId) =>
  API.post(`/payment/${renewalId}`);

/* UPLOAD DOCUMENT */
export const uploadDocument = (formData) =>
  API.post("/upload-doc", formData);

/* GET QUERIES */
export const getQueries = (renewalId) =>
  API.get(`/query/${renewalId}`);

/* GET STATUS */
export const getStatus = (renewalId) =>
  API.get(`/status/${renewalId}`);

/* GET AGENT DETAILS */
export const getAgentDetails = (applicationNo) =>
  API.get(`/agent-details/${applicationNo}`);

/* GET PREVIEW DETAILS */
export const getPreview = (renewalId) => {
  return API.get(`/${renewalId}/preview`);
};