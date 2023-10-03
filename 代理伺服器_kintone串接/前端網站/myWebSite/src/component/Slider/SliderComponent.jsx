/* eslint-disable react/prop-types */
import {Layout, Menu} from 'antd';
import {useState} from 'react';
import './SliderComponent.css';
import {
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
const {Sider} = Layout;

//登入者資料
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('公告', '1', <NotificationOutlined />),
  getItem('申請報修', '2', <PieChartOutlined />),
  getItem('報修履歷', '3', <DesktopOutlined />),
  getItem('購買設備', '4', <DesktopOutlined />),
  getItem('使用者資訊', 'sub1', <UserOutlined />, [
    getItem('個人資訊', '5'),
    getItem('更變密碼', '6'),
    getItem('刪除帳號', '7'),
  ]),
  getItem('回報問題', '8', <FileOutlined />),
];

function SliderCompoenet({onMenuSelect}) {
  function handleMenuClick(e) {
    onMenuSelect(e);
  }

  return (
    <Sider width={250}>
      <Menu
        theme="dark"
        mode="inline"
        items={items.map((item) => ({
          ...item,
          className: 'menu-item', // 添加類別到每一個Menu item
        }))}
        onClick={handleMenuClick} // 當menu item被點擊時，更新state
      />
    </Sider>
  );
}

export default SliderCompoenet;
