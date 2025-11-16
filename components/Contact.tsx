import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button';
import AnimatedTitle from './AnimatedTitle';

interface ImageClipBoxInt {
    src: string;
    clipClass: string
}

const ImageClipBox = ({ src, clipClass }: ImageClipBoxInt) => {
  return (
    <div className={`${clipClass} relative`}>
      <Image
        src={src}
        alt={src}
        width={1000}     // resolusi asli gambar
        height={1400}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};


const Contact = () => {
  return (
    <div id='contact' className='my-20 min-h-96 w-screen px-10'>
        <div className='relative rounded-lg bg-black py-32 text-blue-50 sm:overflow-hidden'>
            <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
                <ImageClipBox clipClass='contact-clip-path-1' src='/img/contact-1.webp'/>
                <ImageClipBox clipClass='contact-clip-path-2 lg:translate-y-20 translate-y-60' src='/img/contact-2.webp'/>
            </div>

            <div className="-top-45 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 absolute">
                
                {/* base image */}
                <ImageClipBox
                    src="/img/swordman.webp"
                    clipClass="sword-man-clip-path md:scale-125 object-cover"
                />

                {/* overlay */}
                <ImageClipBox
                    src="/img/swordman-partial.webp"
                    clipClass="absolute inset-0 md:scale-125 z-10 hidden md:block"
                />

            </div>


            <div className='flex flex-col items-center text-center'>
                <p className='font-teko text-lg uppercase'>
                    Join Zentry
                </p>
                <AnimatedTitle
                    title="let&#39;s b<b>u</b>ild the <br/> new era of <br/> g<b>a</b>ming t<b>o</b>gether."
                    containerClass="font-teko uppercase !md:text-[6.2rem] w-full tracking-tight text-5xl! font-black! leading-[.9]!"
                />
                <Button className='px-8! bg-blue-50 hover:bg-blue-100 duration-200 uppercase text-primary mt-5'>
                    Contact Us
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Contact
