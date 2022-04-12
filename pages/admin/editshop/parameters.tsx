import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { withAdminLayout } from "../../../layout/AdminLayout/AdminLayout";

// export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {
//     let isAdmin = false;
//     if ("session" in req) {
//         const session = req["session"];
//         if ("isAdmin" in session) {
//             isAdmin = session["isAdmin"] as boolean;
//         }
//     }
//     if (!isAdmin) {
//         return {
//             redirect: {
//                 destination: '/admin/login',
//                 permanent: false,
//             },
//         };
//     }
//     return {
//         props: { isAdmin },
//     };
// };

const EditParameters: NextPage = (): JSX.Element => {
    return (
        <>Редактирование параметров</>
    );
};

export default withAdminLayout(EditParameters);