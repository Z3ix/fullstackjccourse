import api from "./servicesApi";

const baseURL = "/api/users";

const getAll = async () => {
  const response = await api.get(baseURL);
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`${baseURL}/${id}`);
  return response.data;
};

export default { getAll, getById };
