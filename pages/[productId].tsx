import { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IProduct } from '.';
import { ParsedUrlQuery } from 'querystring'
import fs from 'fs/promises';
import path from 'path';
import { IArrayProducts } from './index';


interface IContextProps {
    product?: IProduct
}

interface ProductDetailsProps extends IContextProps {
}


interface IStaticParams extends ParsedUrlQuery {
    productId: string
}
interface IStaticPaths extends ParsedUrlQuery {
    productId: string | string[]
}


function ProductDetailPage(
    { product }: ProductDetailsProps
) {

    // if fallback is blocking in get static paths this in no needed
    if (!product) {
        return (
            <h1>Loading ...</h1>
        )
    }

    return (
        <Fragment>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <span>{product?.id}</span>
        </Fragment>
    );
}


async function getDataProducts() {
    const filePath = path.join(process.cwd(), "data", 'dummy-backend.json')

    const fileReader = await fs.readFile(filePath)

    const data: IArrayProducts = await JSON.parse((fileReader).toString())

    return data
}

export const getStaticProps: GetStaticProps<IContextProps, IStaticParams> = async ({ params }) => {

    const paramProductId = params?.productId

    const data = await getDataProducts()


    const product = data.products.find(element => {
        return (element.id === paramProductId)
    })

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product: product!,
        },
        revalidate: 15
    }
}

export const getStaticPaths: GetStaticPaths<IStaticPaths> = async () => {

    const data = await getDataProducts()
    const params: Array<{ params: { productId: string } }> = data.products.map((element) => { return { params: { productId: element.id } } })

    return {
        paths: params,
        fallback: 'blocking',
    }
}


export default ProductDetailPage;
