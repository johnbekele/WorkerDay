import React from "react";

const Hero = () => {
  return (
    <div
      className="hero H-image mx-20 rounded  item-start"
      style={{
        backgroundImage:
          "url(https://www.searchenginejournal.com/wp-content/uploads/2024/07/ai-in-search-572.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60 "></div>
      <div className="hero-content text-neutral-content text-center ">
        <div className="space-x-20 space-y-20">
          <h1 className="mr-20 mt-5 text-5xl TR">TR Panel</h1>
          {/* <h2>No credit card required, no software to install.</h2> */}
          <div className="py-4"></div>
          <ul className="list-none my-20 flex justify-start ">
            <li className="item text-gray-50 ">
              Guided content, how-tos, and best practices{" "}
            </li>
            <li className="item text-gray-50">
              Pre-configured processes, reports, and dashboards
            </li>
            <li className="item text-gray-50">
              To upload your data in a few clicks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
