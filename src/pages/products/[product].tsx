import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { data,fetchRawData } from '..'
import Image from 'next/image';
import Link from 'next/link';
type Params = {
    product: string;
  };
  
const product = (props:fetchRawData) => {
    
  return (
    <div className='h-screen w-screen overflow-hidden m-auto'>
        <div className='flex flex-col justify-center items-center'>
            <p>Id: {props.id}</p>
            <p>Title: {props.title}</p>
            <img src={props.image} className='w-20' />
            {/* <Image width={100} height={100} src={props.image} alt={'fdfds'} /> */}
            <Link className='text-center border-2 border-blue-400 p-2 py-1 rounded-md mt-2' href={'/'}>Go Back</Link>
        </div>
    </div>
  )
}

export default product

export const getStaticPaths:GetStaticPaths =async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const pathsData:fetchRawData[] = await res.json()
    const paths =  await pathsData.map(item => ({params:{product: item.id.toString()}}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps:GetStaticProps<fetchRawData,Params> = async (context) => {
    const {params} = context
    const res = await fetch(`https://fakestoreapi.com/products/${params?.product}`)
    const product = await res.json()
    return {
        props: product
    }
}

