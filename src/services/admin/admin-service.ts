// apiService.ts
import { axiosInstance } from "@/utils/axios"; // Import your axiosInstance



export const loginService = async (payload: any) => await axiosInstance.post(`/login`, { username: payload.username, password: payload.password });
// Service for fetching search suggestions
export const getSearchSuggestions = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/suggestions?query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching suggestions');
  }
};

// Service for submitting the form data
export const submitForm = async (payload: { searchQuery: string, selectedOption: string, submissionTime: string }) => {
  try {
    const response = await axiosInstance.post('/submit', payload);
    return response.data;
  } catch (error) {
    throw new Error('Error submitting form');
  }
};


// Service for faq 
export const faqdata = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/faq`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching faq');
  }
};

export const testimonaildata = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/testimonail`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching testimonail');
  }
};
