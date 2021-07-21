import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IParamsSSRP extends ParsedUrlQuery {
    userId: string
}
interface IPropsSSRP {
    id: string
}

interface IUserIdPageProps extends IPropsSSRP {
}



function UserIdPage({ id }: IUserIdPageProps) {
    return (
        <div>
            userId {id}
        </div>
    );
}

export default UserIdPage;

export const getServerSideProps: GetServerSideProps<IPropsSSRP, IParamsSSRP> = async (context) => {

    console.log(`getServerSideProps`)
    const { req, res, params } = context
    const userId = params?.userId
    return {
        props: {
            id: `userId-${userId}`
        }
    }
}