import React from "react";
import { RiMenu5Line } from "react-icons/ri";
import Button from "../UI/Button/Button";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

ReactModal.setAppElement("#__next");

export default function NavBar() {
  const navUrls = [
    { name: "Search", path: "/" },
    { name: "Favorites", path: "/favorites" },
    { name: "Calendar", path: "/calendar" },
    { name: "My Tickets", path: "/tickets" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen, setIsModalOpen]);
  return (
    <nav>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-base font-bold">Raver.</div>
        <ul className="hidden gap-2 md:flex">
          {navUrls.map((url) => (
            <li key={url.name}>
              <Link href={url.path}>{url.name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <Button className="bg-myblack text-white">Buy Tickets</Button>
          <RiMenu5Line className="cursor-pointer" onClick={openModal} />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          Techno. Dance. <br /> Buy Tickets
        </h1>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        preventScroll={true}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.5)] flex justify-end items-center absolute top-0 left-0 h-screen w-screen"
        className="h-full w-2/4 bg-white pt-6 outline-none"
      >
        <div className="flex h-8 w-full items-center justify-end pr-4">
          <RiMenu5Line
            className={
              clsx(
                " cursor-pointer transition-all duration-500",
                isModalOpen && " rotate-90 ",
              ) as string
            }
            onClick={closeModal}
          />
        </div>
        <ul>
          {navUrls.map((url) => (
            <Link key={url.name} href={url.path}>
              <li className="hover:bg-mygreen px-6 py-1" key={url.name}>
                {url.name}
              </li>
            </Link>
          ))}
        </ul>
      </ReactModal>
    </nav>
  );
}
