import axios from "axios";

const BASE_URL =
  "https://student-database-backend-q7gm.onrender.com/api/students";

const api = {
  getAll: () => axios.get(BASE_URL),
  getById: (id) => axios.get(`${BASE_URL}/${id}`),
  create: (student) => axios.post(BASE_URL, student),
  update: (id, student) => axios.put(`${BASE_URL}/${id}`, student),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`),
  search: (keyword) => axios.get(`${BASE_URL}/search?keyword=${keyword}`),
  sort: (sortBy, order) =>
    axios.get(`${BASE_URL}/sort?sortBy=${sortBy}&order=${order}`),
  filterByDept: (dept) => axios.get(`${BASE_URL}/filter?department=${dept}`),
  getDepartments: () => axios.get(`${BASE_URL}/departments`),
  getCount: () => axios.get(`${BASE_URL}/count`),
};

export default api;
