import { GetServerSideProps } from "next";

function UserProfilePage(props: { name: string }) {


    return (
        <div>
            User data: {props.name}
        </div>
    );
}



export default UserProfilePage;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, req, res, } = context


    return {
        props: {
            name: "ja"
        }
    }
}