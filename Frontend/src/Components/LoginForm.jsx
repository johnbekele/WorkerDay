import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";



const LoginForm = () => {

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

return (
    <div className="mx-auto w-full max-w-md rounded-none border border-gray-300 bg-white p-4 shadow dark:border-gray-800 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to TR PANALE
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to TR PANALE if you don't have account please register .
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <div className="flex w-full flex-col space-y-2">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First name
            </label>
            <input
              id="firstname"
              onChange={handleChange}
              placeholder="first name"
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div className="flex w-full flex-col space-y-2">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last name
            </label>
            <input
              id="lastname"
              placeholder="last name"
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4 flex w-full flex-col space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            id="email"
            placeholder="email"
            type="email"
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex w-full flex-col space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            placeholder="password "
            type="password"
            className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800"
            onChange={handleChange}
          />
        </div>

        <button
          className="group relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
          </button>
          <button
            className="group relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
