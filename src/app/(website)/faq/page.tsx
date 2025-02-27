'use client'

import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
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

}

const FaqComponent: React.FC = () => {
  const [faqList, setFaqList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await faqdata(""); // Pass any query parameter if necessary
        const faqs = response.data.map((faq: any) => ({
          title: faq.question,
          content: faq.answer,
        }));
        setFaqList(faqs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        setLoading(false);
      }
    };

    fetchFaqData();
  }, []); // Empty array ensures this only runs once when the component mounts

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const data = {
    title: "FAQ (How it works)",
    rows: faqList, // Use the fetched FAQ data
  };

  return (
    <div>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default FaqComponent;
