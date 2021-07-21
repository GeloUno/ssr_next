import React, { useEffect, useState } from 'react'

interface ISaleData {
    userName: string,
    value: number
}
interface ISalesData {
    salses: Array<ISaleData>
}


const getData = async (): Promise<Array<ISaleData>> => {

    const dataFache = await fetch('https://nextclients-default-rtdb.europe-west1.firebasedatabase.app/sales.json', {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json' })
    });
    const dataResponse = await dataFache.json();

    let data: Array<ISaleData> = [];

    for (const key in dataResponse) {
        data.push({ userName: dataResponse[key].userName, value: dataResponse[key].value })
    }

    return data;
}

function LastSalesPage() {

    const [sales, setSales] = useState<Array<ISaleData> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getData().then(data => {
            setSales(data);
            setLoading(false)
        }).catch(() => {
            setSales(null);
            setLoading(false)
        }
        );
        return () => {
        }
    }, [])
    if (loading && !sales) {
        return (<h1>Loading ...</h1>)
    }

    if (!loading && sales) {
        return (
            <div>
                {sales.map((element) => (
                    <div key={element.userName}>
                        <h1>{element.userName}</h1>
                        <p>{element.value}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <h1>no data</h1>
        </div>
    );
}

export default LastSalesPage;