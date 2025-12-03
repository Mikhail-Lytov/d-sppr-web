import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    AreaChartOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg?react';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

// ключи = пути роутера
const items: MenuItem[] = [
    getItem('СППР', 'process', <AreaChartOutlined />, [
        getItem('ПРОЦЕСС', '/process/parser', <PlayCircleOutlined />),
    ]),
    getItem('Files', '/files', <FileOutlined />),
];

// для хлебных крошек
const breadcrumbNameMap: Record<string, string> = {
    '/process/parser': 'parser',
    '/files': 'Files',
};

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    // активный пункт меню = текущий путь
    const selectedKeys = [location.pathname];

    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: breadcrumbNameMap[url],
        };
    });

    const breadcrumbItems =
        location.pathname === '/'
            ? [{ title: breadcrumbNameMap['/'] }]
            : [{ title: 'Home' }, ...extraBreadcrumbItems];

    const onMenuClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key.toString());
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo">
                    <LogoIcon style={
                        { width: collapsed ? 74 : 192  }
                    } />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={items}
                    onClick={onMenuClick}
                />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <title>СППР</title>
                </Header>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />

                    <div
                        style={{
                            padding: 24,                // вместо 240
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            minHeight: 360,             // можно вообще убрать
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;