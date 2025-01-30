import React from "react";

const Form = () => {
  return (
    <div>
      {" "}
      <form className="ml-auo space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
        />
        <textarea
          placeholder="Message"
          rows="6"
          className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
        ></textarea>
        <button
          type="button"
          className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Form;
