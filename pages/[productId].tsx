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


interface IStaticPathParams extends ParsedUrlQuery {
    productId: string
}

function ProductDetailPage(
    { product }: ProductDetailsProps
) {
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


export const getStaticProps: GetStaticProps<IContextProps, IStaticPathParams> = async ({ params }) => {

    const paramProductId = params?.productId

    const filePath = path.join(process.cwd(), "data", 'dummy-backend.json')

    const fileReader = await fs.readFile(filePath)

    const data: IArrayProducts = await JSON.parse((fileReader).toString())



    const product = data.products.find(element => {
        return (element.id === paramProductId)
    })

    return {
        props: {
            product: product!,
        },
        revalidate: 15
    }
}

export const getStaticPaths: GetStaticPaths<IStaticPathParams> = async () => {
    return {
        paths: [
            { params: { productId: 'p1' } }
        ],
        fallback: true,
    }
}


export default ProductDetailPage;
