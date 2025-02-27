"use client";

import React from "react";
import Image from "next/image";
import banner from "@/assets/images/banner-img1.png";
import about1 from "@/assets/images/img8.png";
import about2 from "@/assets/images/img9.png";

const dataSlider = [
  {
    id: 1,
    title: "I was skeptical about therapy initially, but Black Therapy Network proved me wrong. The therapists' expertise and compassionate approach made every session valuable. Therapy here not only helped me cope but also flourish in my personal and professional life. It's been an incredible journey, and I'm thankful for their support.",
    tagline: "Athlete",
    image: about1,
    name: "Leon Jean",
  },
  {
    id: 2,
    title: "I was skeptical about therapy initially, but Black Therapy Network proved me wrong. The therapists' expertise and compassionate approach made every session valuable. Therapy here not only helped me cope but also flourish in my personal and professional life. It's been an incredible journey, and I'm thankful for their support.",
    tagline: "Client",
    image: about2,
    name: "Alesha Martin",
  },
];

const Page: React.FC = () => {

  return (
    <div className="container">
      <div className="class-body">
        <section className="about-section">
          <div className="container">
            <div className="row clearfix">
              {/* Content Column */}
              <div className="content-column col-md-6 col-sm-12 col-xs-12">
                <div className="inner-column">
                  <div className="sec-title">
                    <div className="title">About Us</div>
                    <h2>
                      We Are The Leader In <br /> The Interiores
                    </h2>
                  </div>
                  <div className="text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries
                  </div>
                  <div className="email">
                    Request Quote:{" "}
                    <span className="theme_color">freequote@gmail.com</span>
                  </div>
                 
                </div>
              </div>

              {/* Image Column */}
              <div className="image-column col-md-6 col-sm-12 col-xs-12">
                <div
                  className="inner-column"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                >
                  <div className="image">
                    <Image
                      src="https://thewebmax.org/react/jobzilla/assets/images/gir-large.png"
                      alt="About Us"
                      width={300}   // Set an appropriate width
                height={300}  // Set an appropriate height
                    />
                    <div className="overlay-box">
                      <div className="year-box">
                        <span className="number">5</span>Years <br /> Experience <br /> Working
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
