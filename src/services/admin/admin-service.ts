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


export const fetchProductsByCategory = async (categoryId: string) => {
  try {
    // Make sure to append the categoryId in the URL as part of the endpoint
    const response = await axiosInstance.get(`/admin/productbycategory/${categoryId}`, {
      headers: {
        'role': 'admin', // Include the role if necessary
        'Authorization': `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiN3g5RFVNVmFFVTZnaWFiMGwwT1dEdDRlNFNzUkhfY2J3TW9mMkV6RXl5Nm9uSzVvOHhTUFBCNzk5UlZvcW0ydjZ6Njc0a1FDdjlqb20yVDhTLWExZFEifQ..YryO-OaHHVH_FLqa57Im9Q.bF6clBadG6dHS9xDCRH7U7Epr-sNWwK5gKFUnIdQ0NJ0daTzqil3ruOFfmgb8e3g0A_HR7So9k0EoOtsO9RtK_mLDgDIYlN3Y4G8Q3ONewleT-Dr7GXXZcKUkjTtrz-4Od3wlk7VhoR3n50t74ditDPfnPFpwBf1zob_CktlV302WKhaSr6TbsW9bahumLIkQxIcWQW3KVicY08NCAZ7GLCAXSkJ-BEvE5MJk3DPS8HS87Uba1tyFguhk1N1dAcOl5_iVVE-OXJ2XoBYoPAQQZGOlXj3nL8_84jRt3IH3UNQqTgZ36KJJVZ9qcnrx2ES.CDOqfRBGonzhhEcjK70sB0SSzhpD8piEZs3_9q47g-Y`, // Include the authorization token
      },
    });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Error fetching products by category");
  }
};
