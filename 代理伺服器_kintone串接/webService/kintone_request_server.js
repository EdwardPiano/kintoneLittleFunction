const express = require('express');
const KintoneAPI = require('./reference/kintoneAPI')
const Constants = require('./constants/constants')
const app = express();
const port = 5000;

app.use(express.json());

app.use((request, resopnse, next) => {
  const requestFrom = request.get('Host')
  const requestAddress = request.url
  console.log(`已被請求，來自${requestFrom}，請求地址${requestAddress}`)
  next()
})

app.post('/createRepair', async (req, res) => {
  try {
    console.log('req', req.body);
    const resp = await KintoneAPI.addRecord(Constants.REPAIRE_APP_ID, req.body)
    res.json(resp);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: error.toString() });
  }
});

//獲取報修數據
app.get('/getRepairData', async (req, res) => {
  try {
    console.log('req.query', req.query);
    const resp = await KintoneAPI.getRecords(Constants.REPAIRE_APP_ID, `登記人帳號 =  "${req.query['帳號']}"`)
    res.json(resp);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: error.toString() });
  }
});

//獲取公告數據
app.get('/getAnnouncePics', async (req, res) => {
  try {
    console.log('req.query', req.query['query']);
    const resp = await KintoneAPI.getRecords(Constants.Announce_APP_ID, `${req.query['query']}`)
    res.json(resp);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: error.toString() });
  }
});

//登入檢查帳密
app.get('/login', async (req, res) => {
  try {
    console.log('req.query', req.query); // { username: '123', password: 'abc' }
    const username = req.query.username;
    const password = req.query.password;
    const resp = await KintoneAPI.getRecords(Constants.USER_APP_ID, `帳號 = "${username}" and 密碼 = "${password}"`)
    console.log('resp', resp)
    res.json(resp);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: error.toString() });
  }
});

//監聽
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});