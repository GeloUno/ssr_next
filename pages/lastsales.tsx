import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { GetStaticProps } from 'next';

interface ISeleData {
    userName: string,
    value: number
}
interface ISelesData {
    selses: Array<ISeleData>
}
interface ISelesUserDataServer {
    [key: string]: {
        userName: string, value: number
    }
}

const URL_SELES_USERS = 'https://nextclients-default-rtdb.europe-west1.firebasedatabase.app/sales.json'


const fecher = async (url: string): Promise<ISelesUserDataServer> => {

    const dataFache = await fetch(url)
    const dataResponse: ISelesUserDataServer = await dataFache.json();

    return dataResponse
}


const getArraySelesFromObjectSelesServer = (dataResponse: ISelesUserDataServer) => {

    let data: Array<ISeleData> = [];

    for (const key in dataResponse) {
        data.push({ userName: dataResponse[key].userName, value: dataResponse[key].value })
    }
    return data;
}


function LastSalesPage({ selses }: ISelesData) {


    const [selesData, setSelesData] = useState<ISeleData[]>(selses)

    const { data, error } = useSWR(URL_SELES_USERS)

    useEffect(() => {
        if (data && !data?.error) {
            const selesNewData = getArraySelesFromObjectSelesServer(data)
            setSelesData(selesNewData)
        }
        return () => {
            // cleanup
        }
    }, [data])

    return (
        <div>
            {selesData.map((element) => (
                <div key={element.userName}>
                    <h1>{element.userName}</h1>
                    <p>{element.value}</p>
                </div>
            ))}
        </div>
    )
};

export default LastSalesPage;


export const getStaticProps: GetStaticProps<ISelesData> = async () => {
    console.log(`Regenerate`)

    const dataSelesFromServer = await fecher(URL_SELES_USERS)

    if (dataSelesFromServer?.error) {
        return {
            notFound: true
        }
    }
    const data = getArraySelesFromObjectSelesServer(dataSelesFromServer)
    return {
        props: { selses: data },
    }
}