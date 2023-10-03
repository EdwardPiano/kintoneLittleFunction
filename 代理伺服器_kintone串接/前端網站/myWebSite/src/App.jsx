import {useState} from 'react';
import {CookiesProvider, useCookies} from 'react-cookie';
import {Layout} from 'antd';
import SliderCompoenet from './component/Slider/SliderComponent';
import AnnouncementComponent from './component/Announce/AnnounceComponent';
import HeaderComponent from './component/Header/HeaderComponent';
import RepairFormComponent from './component/RepairForm/RepairFormComponent';
import RepairHistoryTable from './component/RepaireHistory/RepaireHistoryComponent';
import LoginComponent from './component/Login/LoginComponent';
import './App.css';
const {Content} = Layout;

const App = () => {
  //設定登入者cookie
  const [cookies, setCookie] = useCookies(['user']);

  //處理登入
  const handleLogin = (user) => {
    setCookie('user', user, {path: '/'});
  };

  const [selectedKey, setSelectedKey] = useState('1'); // 初始設定為 '1'

  //處理menu選擇
  const handleMenu = (e) => {
    console.log(e.key);
    setSelectedKey(e.key); // 更新當前選擇的menu item
  };

  return (
    <CookiesProvider>
      <Layout style={{minHeight: '100vh', margin: 0, padding: 0}}>
        {/*判斷cookies 是否有值，沒有就登入*/}
        {!cookies.user && <LoginComponent onLogin={handleLogin} />}
        <HeaderComponent user={cookies.user} />
        <Layout>
          <SliderCompoenet onMenuSelect={handleMenu} />
          <Layout
            style={{
              padding: '24px',
              backgroundColor: '#FFC78E',
            }}
          >
            <Content
              style={{
                padding: 39,
                margin: 0,
                minHeight: 480,
                backgroundColor: '#FFE4CA',
              }}
            >
              {selectedKey === '1' && (
                <AnnouncementComponent selectedKey={selectedKey} />
              )}
              {selectedKey === '2' && (
                <RepairFormComponent user={cookies.user} />
              )}
              {selectedKey === '3' && (
                <RepairHistoryTable
                  user={cookies.user}
                  selectedKey={selectedKey}
                />
              )}
              {selectedKey === '4' && <div>購買設備的內容</div>}
              {/*...其他的內容*/}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </CookiesProvider>
  );
};
export default App;
