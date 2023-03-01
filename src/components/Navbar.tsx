import React, {FC} from 'react';
import {Layout, Menu, Row} from 'antd';
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useNavigate} from 'react-router-dom'

const Navbar: FC = () => {
    const {Header} = Layout;
    const navigate = useNavigate();
    const {isAuth, user} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions()
    const USERNAME = user.username

    return (
        <Layout className="layout">
            <Header>
                {isAuth
                    ?
                    <Row justify="end">
                        <Menu theme="dark" mode="horizontal" selectable={false}
                              items={[
                                  {
                                      key: '1',
                                      label: USERNAME
                                  },
                                  {
                                      key: '2',
                                      label: 'logout',
                                      onClick: logout
                                  }
                              ]}
                        />
                    </Row>
                    :
                    <Row justify="end">
                        <Menu theme="dark" mode="horizontal" selectable={false}
                              items={[
                                  {
                                      key: '3',
                                      label: 'Login',
                                      onClick: () => navigate(RouteNames.LOGIN)
                                  }
                              ]}
                        />
                    </Row>
                }
            </Header>
        </Layout>
    );
};

export default Navbar;

