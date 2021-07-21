import useSWR from 'swr';

interface ISaleData {
    userName: string,
    value: number
}

const getDataArray = (dataparam: { [key: string]: { userName: string, value: number } }) => {

    let data: Array<ISaleData> = [];

    for (const key in dataparam) {
        data.push({ userName: dataparam[key].userName, value: dataparam[key].value })
    }

    return data;
}

function LastSalesPage() {
    const URL = 'https://nextclients-default-rtdb.europe-west1.firebasedatabase.app/sales.json'
    const { data, error } = useSWR(URL)

    if (data?.error) {
        return (<h1>Error ...</h1>)
    }

    if (!data) {
        return (<h1>Loading ...</h1>)
    }

    if (data && !error) {
        const dataUsers = getDataArray(data)
        return (
            <div>
                {dataUsers.map((element) => (
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