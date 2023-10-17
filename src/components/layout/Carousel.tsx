import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image'
import React from 'react'

export default function Carousel({ images, reverse = false }: { images: { alt: string; src: string }[], reverse?: boolean }) {


    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden">
            <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-3 ${reverse ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll'} animate-infinite-scroll`}>
                {images?.map((logo, index) => (
                    <li className='w-60' key={index}>
                        <AspectRatio ratio={1 / 1}>

                            <Image objectFit='cover' fill src={logo.src} alt={logo.alt} />
                        </AspectRatio>
                    </li>
                ))}
            </ul>
            <ul className={`flex items-center justify-center md:justify-start [&_li]:mx-3 ${reverse ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll'} animate-infinite-scroll`} aria-hidden="true">
                {images?.map((logo, index) => (
                    <li className='w-60' key={index}>
                        <AspectRatio ratio={1 / 1}>

                            <Image objectFit='cover' fill src={logo.src} alt={logo.alt} />
                        </AspectRatio>
                    </li>
                ))}
            </ul>
        </div>
    )
}
