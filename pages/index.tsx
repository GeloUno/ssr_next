import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs/promises'
import path from 'path'

interface IProduct {
  id: string,
  title: string
}

interface IHomePageProps {
  products: Array<IProduct>
}

function HomePage({ products }: IHomePageProps) {

  return (
    <div className={styles.container}>
      <ul key={1}>
        {products.map((element) => (
          <li key={element.id}>{element.title}</li>)
        )}

      </ul>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  console.log(`Re-generete index page...`)

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  const jsonData = await fs.readFile(filePath)

  const data: IHomePageProps = JSON.parse(jsonData.toString())

  return {
    props: {
      products: data.products
    },
    revalidate: 15
  }
}


export default HomePage;
