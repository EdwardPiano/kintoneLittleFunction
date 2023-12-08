/* eslint-disable react/prop-types */
import {Modal, Input, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import axios from 'axios';

function LoginComponent({onLogin}) {
  const [isModalVisible, setIsModalVisible] = useState(true); // 控制 Modal 是否可見
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 跟蹤使用者是否已登入
  const [username, setUsername] = useState(''); // 存儲用戶輸入的帳號
  const [password, setPassword] = useState(''); // 存儲用戶輸入的密碼

  //登入檢查、並設定登入cookie
  const handleLogin = async () => {
    try {
      if (!username && !password) {
        message.error('登入失敗!');
        return;
      }
      const response = await axios.get('http://localhost:5173/login', {
        params: {
          username: username,
          password: password,
        },
      });
      if (response.data.records.length > 0) {
        const respUser = response.data.records[0];
        setIsLoggedIn(true);
        setIsModalVisible(false); //關閉登入彈跳視窗
        const userData = {
          帳號: respUser['帳號'].value,
          使用者名稱: respUser['使用者名稱'].value,
          連絡電話: respUser['連絡電話'].value,
          性別: respUser['性別'].value,
          生日: respUser['生日'].value,
          所屬公司: respUser['所屬公司'].value,
          電子郵件: respUser['電子郵件'].value,
          地址: respUser['地址'].value,
        };
        message.success(`${userData.使用者名稱}，歡迎回來!~`);
        onLogin(userData); //呼叫App.jsx丟過來的function
        return;
      }
      message.error('登入失敗!');
      setUsername('');
      setPassword('');
      return;
    } catch (error) {
      message.error(error.toString());
      console.error('Failed to fetch data:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="登入"
        visible={isModalVisible}
        maskClosable={false} // 禁止點籍方塊以外的部分關閉視窗
        closable={false} // 禁止顯示關閉按鈕
        onOk={handleLogin}
        okText="登入"
        onCancel={handleCancel}
      >
        <br />
        <Input
          placeholder="帳號 : "
          prefix={<UserOutlined />}
          value={username}
          onChange={(e) => setUsername(e.target.value)} // 更新帳號
        />
        <br />
        <br />
        <Input
          placeholder="密碼 : "
          type="password"
          value={password}
          prefix={<UnlockOutlined />}
          onChange={(e) => setPassword(e.target.value)} // 更新密碼
        />
      </Modal>
    </div>
  );
}

export default LoginComponent;
