'use client';

import React from "react";
import Faq from "react-faq-component";
import useSWR from 'swr';
import { faqdata } from "@/services/admin/admin-service"; // Assuming this is your service

const styles = {
  titleTextColor: "black",
  rowTitleColor: "blue",
};

const config = {
  animate: true,
  arrowIcon: "V",
  openOnload: 0,
  expandIcon: "+",
  collapseIcon: "-",
};

const FaqComponent: React.FC = () => {
  // SWR hook to fetch data
  const { data, error } = useSWR('/faq', faqdata, {
    onErrorRetry: (error) => {
      console.error("Error fetching FAQ data:", error);
    }
  });

  // Handle loading state (SWR automatically tracks this for us)
  if (!data) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error fetching FAQ data</div>;
  }

  // Check if 'data' contains the 'data' property and is an array
  const faqList = Array.isArray(data.data)
    ? data.data.map((faq: any) => ({
        title: faq.question,
        content: faq.answer,
      }))
    : []; // Fallback to an empty array if 'data' is not an array

  const faqData = {
    title: "FAQ (How it works)",
    rows: faqList,
  };

  return (
    <div>
      <Faq data={faqData} styles={styles} config={config} />
    </div>
  );
};

export default FaqComponent;
