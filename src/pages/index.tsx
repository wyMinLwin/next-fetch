import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

export type fetchRawData = {
  "id": number,
  "title": string,
  "price": number,
  "description": string,
  "category": string,
  "image": string,
  "rating": {
  "rate": number,
  "count": number
  }
}
export type data = {
  products: fetchRawData[];
}

const index = ({products}:data) => {
  return (
    <div className='w-screen'>
      <h1 className='font-light text-base text-center mb-5'>For each button I fetch data from backend api and used getStaticProps</h1>
      <div className='mx-auto flex flex-row flex-wrap'>
        {
          products.map(item => 
            (
              <Link href={`/products/${item.id}`} className='border-2 rounded-md border-black p-1 m-2'>Go To Product {item.id}</Link>
            ))
        }
      </div>
    </div>
  )
}

export default index

export const getStaticProps:GetStaticProps<data> = async () => {
  console.log('fetching...')
  const res = await fetch(`https://fakestoreapi.com/products`)
  const products = await res.json()
  return {
    props: {
      products
    }
  }
}