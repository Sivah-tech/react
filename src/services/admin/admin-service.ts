// apiService.ts
import { axiosInstance } from "@/utils/axios"; // Import your axiosInstance

export const loginService = async (payload: any) =>
  await axiosInstance.post(`/login`, {
    username: payload.username,
    password: payload.password,
  });

export const contactusService = async (payload: any) =>
  await axiosInstance.post(`/contact-us`, payload);

export const forgotPasswordService = async (payload: any) =>
  await axiosInstance.post(`/forgot-password`, { username: payload.username });

export const sendOtpService = async (payload: any) =>
  await axiosInstance.post(`/verify-otp`, { otp: payload.otp });

export const resetUserPassword = async (payload: any) =>
  await axiosInstance.post(`/new-password-otp-verified`, {
    otp: payload.otp,
    password: payload.password,
  });

// Service for fetching search suggestions
export const getSearchSuggestions = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/suggestions?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching suggestions");
  }
};

// Service for submitting the form data
export const submitForm = async (payload: {
  searchQuery: string;
  selectedOption: string;
  submissionTime: string;
}) => {
  try {
    const response = await axiosInstance.post("/submit", payload);
    return response.data;
  } catch (error) {
    throw new Error("Error submitting form");
  }
};

// Service for faq
export const faqdata = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/faq`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching faq");
  }
};

export const testimonaildata = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/testimonail`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching testimonail");
  }
};





export const categorydata = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching categorydata");
  }
};


// Service for fetching search suggestions
export const fetchProductsByCategory = async (categoryId: string) => {
  try {
    const response = await axiosInstance.get(`/productbycategory/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching category");
  }
};


