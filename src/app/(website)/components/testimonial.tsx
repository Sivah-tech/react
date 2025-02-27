import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Card from "./ui/card";
import CardContent from "./ui/CardContent";
import Avatar from "./ui/Avatar";
import Image from "next/image"; // Ensure you import Image if using Next.js
import { testimonaildata } from "@/services/admin/admin-service";
import 'font-awesome/css/font-awesome.min.css';

const TestimonialSwiper: React.FC = () => {
    const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTestimonialData = async () => {
            try {
                const response = await testimonaildata(""); // Pass any query parameter if necessary
                const testimonials = response.data.map((testimonial: any) => ({
                    name: testimonial.name,
                    position: testimonial.position,
                    text: testimonial.text,
                    avatar: testimonial.avatar,
                }));
                setTestimonialsList(testimonials);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching testimonial data:", error);
                setLoading(false);
            }
        };

        fetchTestimonialData();
    }, []); // Empty array ensures this only runs once when the component mounts

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="max-w-6xl mx-auto py-12 text-center">
            <h3 className="text-xl font-bold text-green-500">Testimonials</h3>
            <br />
            <h2 className="text-3xl font-bold">Jobseeker reviews through Jobzilla.</h2>

            {/* Card containing image and swiper */}
            <Card className="shadow-lg p-6 rounded-xl mt-8">
                <CardContent>
                    <div className="flex items-center justify-between">
                        {/* Image section */}

                        <div className="w-1/3 justify-center items-center">
                            {/* Circle container with custom bounce animation */}
                            <div className="relative w-80 h-80 bg-green-500 rounded-full bounce-delay">
                                <Image
                                    src="https://thewebmax.org/react/jobzilla/assets/images/home-8/testimonial-3d-pic.png"
                                    alt="User Image"
                                    width={500}
                                    height={500}
                                    className="rounded-full w-full h-full object-cover shadow-lg"
                                />
                            </div>
                            <span className="outlined-text-second ">Jobseeker</span>{' '}<br></br>
                        </div>



                        {/* Swiper section inside the Card */}
                        <div className="w-1/2 pl-8">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 2000, // Autoplay delay set to 2 seconds
                                    disableOnInteraction: false, // Ensures autoplay continues even after user interaction
                                }}
                                className="mt-8"
                            >
                                {testimonialsList.map((testimonial, index) => (
                                    <SwiperSlide key={index}>
                                        <Card className="shadow-lg p-6 rounded-xl">
                                            <CardContent>
                                                <div className="t-quote">
                                                    <i className="fa fa-quote-left"></i>
                                                </div>

                                                <p className="text-lg italic">{testimonial.text}</p>
                                                <div className="flex items-center justify-center mt-4">
                                                    <Avatar className="w-12 h-12 rounded-full mr-3">
                                                        <Image
                                                            src={testimonial.avatar} // Use dynamic avatar URL directly
                                                            alt={testimonial.name}
                                                            width={50} // Set an appropriate width
                                                            height={50} // Set an appropriate height
                                                        />

                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                                                        <p className="text-sm text-gray-500">{testimonial.position}</p> {/* Replace with actual position if available */}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TestimonialSwiper;
