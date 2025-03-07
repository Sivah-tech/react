import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

const jobCategories = [
  { title: "Retail & Products1", jobs: 95, color: "#f2eb07", icon: "🛒" },
  { title: "Security Analyst", jobs: 35, color: "#FF4500", icon: "🔧" },
  { title: "Content Writer", jobs: 200, color: "#6A5ACD", icon: "📄" },
  { title: "Market Research", jobs: 140, color: "#FFA500", icon: "📊" },
  { title: "Marketing & Sale", jobs: 80, color: "#DC143C", icon: "💼" },
  { title: "Customer Help", jobs: 160, color: "#1E90FF", icon: "👩‍💼" },
  { title: "Market Research", jobs: 140, color: "#FFA500", icon: "📊" },
  { title: "Marketing & Salel", jobs: 80, color: "#DC143C", icon: "💼" },
  { title: "Marketing & Sale", jobs: 80, color: "#DC143C", icon: "💼" },
  { title: "Customer Help", jobs: 160, color: "#1E90FF", icon: "👩‍💼" },
  { title: "Market Research", jobs: 140, color: "#FFA500", icon: "📊" },
  { title: "Marketing & Salel", jobs: 80, color: "#DC143C", icon: "💼" },
  { title: "Marketing & Sale", jobs: 80, color: "#DC143C", icon: "💼" },
  { title: "Customer Help", jobs: 160, color: "#1E90FF", icon: "👩‍💼" },
  { title: "Market Research", jobs: 140, color: "#FFA500", icon: "📊" },
  { title: "Marketing & Salel", jobs: 80, color: "#DC143C", icon: "💼" },

  // (Repeat as needed for more categories)
];

const CardSlider = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Swiper
        slidesPerView={1} // Default to 1 slide per view
        grid={{ rows: 1, fill: "row" }} // 2 rows grid
        spaceBetween={20}
        navigation
        modules={[Navigation, Grid]}
        loop={true}
        className="mySwiper"
        breakpoints={{
          // When the viewport is >= 640px (sm)
          640: {
            slidesPerView: 2, // Show 2 slides on small screens
          },
          // When the viewport is >= 768px (md)
          768: {
            slidesPerView: 3, // Show 3 slides on medium screens
          },
          // When the viewport is >= 1024px (lg)
          1024: {
            slidesPerView: 4, // Show 4 slides on large screens
          },
          // When the viewport is >= 1280px (xl)
          1280: {
            slidesPerView: 6, // Show 6 slides on extra-large screens
          },
        }}
      >
        {jobCategories.map((job, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl"
                style={{ backgroundColor: job.color }}
              >
                {job.icon}
              </div>
              <h3 className="font-semibold mt-4">{job.title}</h3>
              <p className="text-gray-500">{job.jobs} Jobs Available</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
