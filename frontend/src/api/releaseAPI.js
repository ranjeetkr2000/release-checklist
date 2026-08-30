import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchReleases = () => axios.get(`${BASE_URL}/releases`);
export const createRelease = (data) => axios.post(`${BASE_URL}/releases`, data);
export const updateRelease = (id, data) => axios.put(`${BASE_URL}/releases/${id}`, data);
export const deleteRelease = (id) => axios.delete(`${BASE_URL}/releases/${id}`);

export const fetchSteps = () => axios.get(`${BASE_URL}/steps`);