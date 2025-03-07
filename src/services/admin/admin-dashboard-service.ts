import { getAxiosInstance } from "@/utils/axios"; // Import your axiosInstance

const route = "admin"; // Define the route variable

export const dashboardService = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true);
  return axiosInstance.get(route);
};

export const getAllUsers = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true);
  return axiosInstance.get(route);
};

export const updateSingleUser = async (route: string, data: any) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.patch(route, data);
  return response.data; // Assuming the response returns the data object
};

export const addNewUser = async (route: string, data: any) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.post(route, data);
  return response.data; // Assuming the response returns the data object
};

export const deleteUsers = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.delete(route);
  return response.data; // Assuming the response returns the data object
};

export const getSingleUser = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true);
  return axiosInstance.get(route);
};

export const getAllCategories = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true);
  return axiosInstance.get(route);
};

export const updateSingleCategory = async (route: string, data: any) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.patch(route, data);
  return response.data; // Assuming the response returns the data object
};

export const addNewCategory = async (route: string, data: any) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.post(route, data);
  return response.data; // Assuming the response returns the data object
};

export const deleteCategory = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true); // Assuming this initializes the axios instance with authorization, etc.

  // Send a PUT request with the data in the body
  const response = await axiosInstance.delete(route);
  return response.data; // Assuming the response returns the data object
};

export const getSingleCategory = async (route: string) => {
  const axiosInstance = await getAxiosInstance(true);
  return axiosInstance.get(route);
};

