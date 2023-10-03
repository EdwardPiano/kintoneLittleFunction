import Cookies from 'js-cookie';

// 設定cookie
function setUserData(userData) {
  Cookies.set('userData', JSON.stringify(userData));
}

// 獲取cookie
function getUserData() {
  const userData = Cookies.get('userData');
  return userData ? JSON.parse(userData) : null;
}

// 使用範例
setUserData({
  使用者名稱: 'John',
  連絡電話: '12345678',
  性別: '男',
  生日: '2000-01-01',
  所屬公司: 'ABC Corp',
  電子郵件: 'john@example.com',
});

const userData = getUserData();
console.log(userData);
