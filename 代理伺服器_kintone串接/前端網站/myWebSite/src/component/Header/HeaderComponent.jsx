/* eslint-disable react/prop-types */
import React, {useContext} from 'react';
import {Layout} from 'antd';
import logo from '../../image/logo_kintone.png'; // 引入你的圖片
import './HeaderComponent.css';
// 定義事件處理器
const handleIconClick = () => {
  console.log('Icon clicked!');
};

function HeaderComponent({user}) {
  const {Header} = Layout;
  const userTitle = user ? `歡迎回來 : ${user['使用者名稱']}` : '';

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        border: '1px solid #FFCBB3',
        backgroundColor: '#FFF3EE',
      }}
    >
      <div style={{paddingTop: '15px'}}>
        <img
          src={logo}
          alt="Logo"
          style={{marginRight: '25px', width: '200px'}}
          onClick={handleIconClick}
        />
        <span className="header-text-left">{`網站測試...`}</span>
      </div>
      <span className="header-text-right">{`${userTitle}`}</span>
    </Header>
  );
}
export default HeaderComponent;
