import React from "react";
import Button from "../UI/Button/Button";
import { BsCalendar4Week } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { CgMenuGridO } from "react-icons/cg";

export default function SearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form
      className="absolute bottom-0 left-0 right-0 mx-auto flex h-10 w-11/12 translate-y-2/4 items-center 
                    justify-between overflow-hidden rounded-full bg-white py-1 pr-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder={"Search..."}
        className="w-full pl-6 pr-4 text-xs outline-none"
      />
      <div className="flex h-full w-full sm:grid-cols-3">
        <div className="flex h-full items-center border-x px-2 text-xs md:gap-2">
          <BsCalendar4Week />
          <span className="hidden md:block">Date</span>
        </div>
        <div className="flex h-full items-center border-r px-2 text-xs md:gap-2">
          <SlLocationPin />
          <span className="hidden md:block">Location</span>
        </div>
        <div className="mr-4  flex h-full items-center px-2 text-xs md:gap-2">
          <CgMenuGridO />
          <span className="hidden md:block">Type of event</span>
        </div>
      </div>
      <Button type="submit" className="bg-mygreen">
        Search
      </Button>
    </form>
  );
}
