import React from "react";
import Image from "next/image";
const blogs = [
  {
    id: 1,
    title: "How to convince recruiters.",
    author: "Mark Petter",
    date: "March 05, 2023",
    image: "https://thewebmax.org/react/jobzilla/assets/images/blog/latest/bg10.jpg",
  },
  {
    id: 2,
    title: "5 things to know about the March.",
    author: "David Wish",
    date: "March 05, 2023",
    image: "https://thewebmax.org/react/jobzilla/assets/images/blog/latest/bg11.jpg",
  },
  {
    id: 3,
    title: "Job Board is the most important",
    author: "Mike Doe",
    date: "March 05, 2023",
    image: "https://thewebmax.org/react/jobzilla/assets/images/blog/latest/bg12.jpg",
  },
];

  const BlogCard = ({blog}:{[key:string]:any}) => {
  return (
    <div className="">
        <Image className="w-full h-90 object-cover"
                        src={blog.image}
                        alt="User Image"
                        width={50}   // Set an appropriate width
                        height={50}  // Set an appropriate height
                      />
      <div className="p-4">
        <p className="text-gray-600 text-sm">{blog.date} <span className="text-green-600 font-bold">By {blog.author}</span></p>
        <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
     
      </div>
    </div>
  );
};

const BlogList = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-green-600 uppercase">Our Blogs</h2>
        <h1 className="text-3xl font-bold">Latest Article</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto px-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
