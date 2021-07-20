import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import { GetStaticProps } from 'next';
import fs from 'fs/promises'
import path from 'path'

export interface IProduct {
  id: string,
  title: string,
  description: string
}

export interface IArrayProducts {
  products: Array<IProduct>
}

interface IHomePageProps extends IArrayProducts {
}

function HomePage({ products }: IHomePageProps) {

  return (
    <div className={styles.container}>
      <ul key={1}>
        {products.map((element) => (
          <div key={`${element.id}`}>
            <Link
              href={`/${element.id}`}
              key={element.id}>
              {element.title}
            </Link>
          </div>)
        )}

      </ul>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  console.log(`Re-generete index page...`)

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

  const jsonData = await fs.readFile(filePath)

  const data: IArrayProducts = JSON.parse(jsonData.toString())

  if (!data) {
    return {
      props: {
        redirect: {
          destination: '/no-data'
        }
      }
    }
  }

  if (data.products.length === 0) {
    return {
      props: {
        noFoud: true
      }
    }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 15 //regenrete page after 15 seconds (revalid read data again)
  }
}


export default HomePage;
