"use client";
import React from "react";
import { BsCalendar4Week } from "react-icons/bs";
import Image from "next/image";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

type Props = {
  title?: string;
  date?: string | null;
  imgSrc?: string;
};

export default function EventCard({
  title = "",
  date = "2022-02-02",
  imgSrc = "https://www.publimetro.pe/resizer/xpubfLEAT1lrkFv3YTIfhrSTSp0=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/3EKLGEYFRFE4XGNADXDYPORPUQ.JPG",
}: Props) {
  return (
    <Card className="relative">
      <Image
        width={350.8}
        height={192}
        alt={title}
        className="h-full w-full object-cover"
        src={imgSrc}
      />
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-between rounded-t-xl bg-white px-4 py-2">
        <div>
          <h3 className="text-sm">{title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <BsCalendar4Week />
            <p className="font-normal">{date}</p>
          </div>
        </div>
        <Button className="border-myblack border">Buy</Button>
      </div>
    </Card>
  );
}
