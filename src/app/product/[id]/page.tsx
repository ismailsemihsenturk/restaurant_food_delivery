import Price from '@/components/Price';
import { singleProduct } from '@/data';
import Image from 'next/image';
import React from 'react';

const SingleProduct = () => {
  return (
    <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center'>
      {/** Image Container */}
      {singleProduct.img && (
        <div className='relative w-full md:h-[70%] h-1/2'>
          <Image src={singleProduct.img} alt='' className='object-contain' fill />
        </div>
      )}
      {/** Text Container */}
      <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
        <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
        <h2 className=''> {singleProduct.desc}</h2>
        <Price price={singleProduct.price} id={singleProduct.id} options={singleProduct.options}></Price>
      </div>
    </div>
  )
}

export default SingleProduct