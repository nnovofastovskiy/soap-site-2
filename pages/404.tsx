import { NextPage } from 'next';
import { withLayout } from '../layout/ClientLayout/Layout';

const ErrorPage: NextPage = () => {
    return (
        <>
            Страница не найдена 404
        </>
    );
};

export default withLayout(ErrorPage);