"use client";

import Image from "next/image";

import React, { useState, useEffect } from "react";
import { getSearchSuggestions, submitForm } from "@/services/admin/admin-service";
import CardSlider from "@/app/(website)/components/Cardslider";
import CounterComponent from "@/app/(website)/components/counter";
import KCounterComponent from "@/app/(website)/components/kcounter";
import BlogList from "./components/blogs";
import { useRouter } from 'next/navigation';
import TestimonialSwiper from "./components/testimonial";


export default function Home() {

  return (
    <div className="main">
      <FirstSection />
      <SecondSection /> 
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <LastSection />
      
    </div>
  );
}


const FirstSection: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [count, setCount] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle suggestion click to fill input
  const handleSuggestionClick = (suggestionText:any) => {
    setSearchQuery(suggestionText); // Set the input field to the selected suggestion
    setSuggestions([]); // Optionally clear suggestions once one is selected
    // Optionally, trigger a search here if needed
  };

  // Fetch suggestions when the search query changes
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      setError(null);
      getSearchSuggestions(searchQuery) // Call the service to fetch suggestions
        .then((data) => {
          setSuggestions(data.data); // Ensure the response data is used correctly
        })
        .catch((err) => {
          setError("Error fetching suggestions.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSuggestions([]); // Clear suggestions when query is less than 3 characters
    }
  }, [searchQuery]);



  // Handle select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Assuming searchQuery is a string
    const payload = { searchQuery };
    console.log("payload", payload);
  
    try {
      // Pass only the searchQuery to getSearchSuggestions, not the entire payload
      const response = await getSearchSuggestions(searchQuery);  // Pass just the search query string
      console.log('Form submitted successfully:', response);
      
      // Navigate to the product page on success
      router.push('/productpage');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  



  return (
    <div className="container-fluid">
                  <div> 
      
    </div>
      <div className="flex items-center pb-3 md:pb-0 justify-start md:justify-center gap-[45px] mt-[100px] overflow-x-auto">
        <div className="bg-[#f7f7f7]-700">
          <div className="twm-bnr-text-lg">
          <h1>
        <span className="outlined-text">Its Easy to Find Your</span>{' '}<br></br>
        <span className="bold-text">Dream Job</span>
      </h1>   
            <p className="text-1xl font-bold text-[#26463B] test">You dream job is waiting for you.</p>
          </div>
          <form className = "flex"
            onSubmit={handleSubmit}
          >
            {/* Search Bar */}
            <div className="mb-4 w-1/2">
              <input
                type="text"
                id="search"
               className="flex-grow p-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
              {isLoading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <ul className="mt-2">
                {suggestions.length > 0 &&
                  suggestions.map((suggestion:any, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-200 p-2"
                      onClick={() => handleSuggestionClick(suggestion.text)} // When a suggestion is clicked
                    >
                      {suggestion.text}
                    </li>
                  ))}
              </ul>


            </div>

            {/* Select Box */}
            {/* <div className="mb-4 w-1/4">
              <select
                id="select"
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div> */}

            {/* Submit Button */}
            <div className="mb-4 w-1/2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>




          <div className="mt-2 p-2">
            <span className="twm-title">Our More Candidates</span>
            <div className="flex mt-2 pt-2 ">
            <span>
              <Image
                src="https://thewebmax.org/react/jobzilla/assets/images/main-slider/slider1/user/u-1.jpg"
                alt="User Image"
                width={30}   // Set an appropriate width
                height={30}  // Set an appropriate height
              />
            </span>

            <span>
              <Image
                src="https://thewebmax.org/react/jobzilla/assets/images/main-slider/slider1/user/u-2.jpg"
                alt="User Image"
                width={30}   // Set an appropriate width
                height={30}  // Set an appropriate height
              />
            </span>

            <span>
              <Image
                src="https://thewebmax.org/react/jobzilla/assets/images/main-slider/slider1/user/u-3.jpg"
                alt="User Image"
                width={30}   // Set an appropriate width
                height={30}  // Set an appropriate height
              />
            </span>


            <div className="counters mt-2 ps-2 ">
              <CounterComponent targetCount={5000} />
            </div>
          </div>
          </div>


        </div>

        <div className="bg-white-700">

          <div className="">
            <Image
              src="https://thewebmax.org/react/jobzilla/assets/images/home-11/banner-bg/right-pic1.jpg"
              alt="User Image"
              width={500}   // Set an appropriate width
              height={500}  // Set an appropriate height
            />
          </div>

        </div>

      </div>
    </div>
  );
};





const SecondSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [count, setCount] = useState(0);
  const items = ['Full lifetime access', '20+ downloadable resources', 'Certificate of completion', 'Free Trial 7 Days'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };



  return (
    <div className="container-fluid bg-white">
      <div className="flex items-center pb-3 md:pb-0 justify-start md:justify-center gap-[45px] mt-[100px] overflow-x-auto">
        <div className="bg-white-700">

          <div className="">
            <Image
              src="https://thewebmax.org/react/jobzilla/assets/images/home-11/about-pic1.png"
              alt="User Image"
              width={500}   // Set an appropriate width
              height={500}  // Set an appropriate height
            />
          </div>

        </div>
        <div className="bg-[#f7f7f7]-700">
          <div className="twm-bnr-text-lg">
            <p className="about text-lg mt-2 font-bold text-500 mb-2 text-[#63C29F]">About</p>
            <p className="text">
              <span className="text-lg mt-2 font-bold text-500 mb-2">Millions of jobs. Find the </span>
              <br></br>
              <span className="text-lg mt-2 font-bold text-500 mb-2"> one that’s right for you.
              </span></p>

          </div>
          <ul  className="list-disc pl-5  mt-5">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="flex space-x-4 p-4 ">
      {/* First Div */}
      <div className="flex items-center bg-blue-500 text-white p-6 ">
      <Image
                  src="https://thewebmax.org/react/jobzilla/assets/images/main-slider/slider2/icon-2.png"
                  alt="User Image"
                  width={30}   // Set an appropriate width
                  height={30}  // Set an appropriate height
                />
        <div className="flex flex-col">
          <p className="text-lg"> <CounterComponent targetCount={98} /></p>
          <p className="text-sm">Job For Countries</p>
        </div>
      </div>

      {/* Second Div */}
      <div className="flex items-center bg-blue-500 text-white p-6">
      <Image
                  src="https://thewebmax.org/react/jobzilla/assets/images/main-slider/slider2/icon-1.png"
                  alt="User Image"
                  width={30}   // Set an appropriate width
                  height={30}  // Set an appropriate height
                />  
        <div className="flex flex-col">
          <p className="text-lg">    <KCounterComponent targetCount={80} />   </p>
          <p className="text-sm">Companies Jobs</p>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>

  );
};




const ThirdSection: React.FC = () => {
  return (
    <div className="third-section mt-5 bg-[#F7F7F7]">
      <CardSlider />
    </div>
  );
};


const FourthSection: React.FC = () => {
  return (
    <div className="third-section">
      <BlogList />
    </div>
  );
};


const FifthSection: React.FC = () => {
  return (
    <div className="fifth-section mt-5 bg-[#F7F7F7]">
      <TestimonialSwiper />
    </div>
  );
};



const LastSection: React.FC = () => {
  return (
    <div className="last-section">
      <div className="map-container">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              className="gmap_iframe"
              title="Google Map"

              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Elante mall&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
        <style>
          {`
          .mapouter {
            position: relative;
            text-align: right;
            width: 600px;
            height: 400px;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none !important;
            width: 600px;
            height: 400px;
          }
          .gmap_iframe {
            width: 600px !important;
            height: 400px !important;
          }
        `}
        </style>
      </div>
    </div>






  );
};

