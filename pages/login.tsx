import { Layout, withLayout } from '../layout/ClientLayout/Layout';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { RegistrationForm, Tab } from '../components/';
import { TabItemInterfase } from '../components/Tab/Tab.props';
import styles from '../styles/Login.module.css';

const tabItems: TabItemInterfase[] = [
    {
        id: 'login',
        text: 'Вход',
        checked: true
    },
    {
        id: 'signUp',
        text: 'Регистрация',
    },
];

const Login: NextPage = (): JSX.Element => {
    let defaultChecked = 0;
    tabItems.map((item, index) => {
        // console.log(item, index);
        if (item.checked) {
            defaultChecked = index;
            return;
        }
    });

    const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultChecked);


    return (
        <Layout>
            <div className={styles.wrapper}>
                <Tab items={tabItems} changeHandler={setActiveTabIndex} activeIndex={activeTabIndex} />
                {activeTabIndex == 0 ? <LoginForm /> : <RegistrationForm />}
            </div>
        </Layout>
    );
};

export default Login;