"use client"

import React, { useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti';

const BentoTilt = ({ children, className }: { children: React.ReactNode, className: string }) => {
    const [transformStyle, settransformStyle] = useState("");
    const itemRef = useRef<HTMLDivElement | null>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!itemRef.current) return;

        const {left, top, width, height} = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5; // Adjust the multiplier for more/less tilt
        const tiltY = (relativeX - 0.5) * -5; // Adjust the multiplier for more/less tilt

        const newTransform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.97, 0.97, 0.97)`;

        settransformStyle(newTransform)
    }

    const handleMouseLeave = () => {
        settransformStyle("");
    }

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{transform: transformStyle}}>
            {children}
        </div>
    )
}

const Bentocard: React.FC<{
  src: string;
  title: React.ReactNode;
    description: string;
    isComingSoon?: boolean;
}> = ({ src, title, description }) => {
    return (
        <div className='size-full relative'>
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-100'>
                <div>
                    <h1 className='font-bold text-6xl uppercase -tracking-widest'>{title}</h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs md:text-base'>
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Features = () => {
  return (
    <section className='bg-black pb-52'>
        <div className='container mx-auto md:px-10'>
            <div className='px-5 py-32'>
                <p className='font-teko text-xl text-blue-100'>
                    Into the Metagame Layer
                </p>
            <p className='max-w-md font-teko text-lg text-blue-100 opacity-50'>
                Immerse yourself in a universe where gaming meets the metaverse. Our platform offers a seamless integration of cutting-edge technology and engaging gameplay, allowing you to explore new dimensions and connect with fellow gamers like never before.
            </p>
            <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                <Bentocard
                    src="/videos/feature-1.mp4"
                    title={
                        <>radia<b>n</b>t</>
                    }
                    description="A cross-platform gaming hub that unites players from around the world."
                    isComingSoon
                    />
            </BentoTilt>
            <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
                <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1! md:row-span-2'>
                    <Bentocard
                        src="/videos/feature-2.mp4"
                        title={
                            <>zig<b>m</b>a</>
                        }
                        description='An anime and gaming Inspired NFT colletion - the IP Primed for expansion.'
                        />
                </BentoTilt>
                <BentoTilt className='bento-tilt_1 ms-14 md:col-span-1! md:ms-0'>
                    <Bentocard
                        src="/videos/feature-3.mp4"
                        title={<>n<b>e</b>xus</>}
                        description='A gamified social hub, adding a new dimension of play to social interaction for web3 communities.'
                        />
                </BentoTilt>
                <BentoTilt className='bento-tilt_1 me-14 md:col-span-1! md:me-0'>
                    <Bentocard
                        src="/videos/feature-4.mp4"
                        title={<>az<b>u</b>l</>}
                        description='A cross-world AI Agent - elevating your gameplay to be more fun and productive.'
                        />
                </BentoTilt>
                <BentoTilt className='bento-tilt_2'>
                    <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                        <h1 className='bento-title font-bebas max-w-64'>
                            M<b>o</b>re co<b>m</b>ing soon!
                        </h1>
                        <TiLocationArrow className='m-5 scale-[5] self-end'/>
                    </div>
                </BentoTilt>

                <BentoTilt className='bento-tilt_2'>
                    <video
                        src="/videos/feature-5.mp4"
                        loop
                        muted
                        autoPlay
                        className='size-full object-cover object-center'
                        />
                </BentoTilt>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Features
