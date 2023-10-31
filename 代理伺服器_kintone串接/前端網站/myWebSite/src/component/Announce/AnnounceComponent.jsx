/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import {Card, message} from 'antd';
import axios from 'axios';

const {Meta} = Card;

const AnnouncementComponent = ({selectedKey}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAnnouncePics = async () => {
      try {
        //獲取kintone公告資料
        const params = {
          params: {
            query: '公告狀態 not in ("停用")',
          },
        };
        const resp = await axios.get(
          'http://54.234.56.197:5173/getAnnouncePics',
          params
        );
        console.log('公告資料', resp);
        //設定顯示資訊
        setProducts(
          resp.data.records.map((record) => {
            const {圖片連結: picUrl, 標題: title, 內文: content} = record;
            return {
              image: picUrl.value,
              title: title.value,
              description: content.value,
            };
          })
        );
        console.log(products);
      } catch (error) {
        message.error(error.toString());
        console.error('Failed to fetch data:', error);
      }
    };
    if (selectedKey === '1') {
      getAnnouncePics();
    }
  }, [selectedKey]);

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {products.map((product, index) => (
        <Card
          key={index}
          hoverable
          style={{width: 240, margin: '10px'}}
          cover={<img alt="example" src={product.image} />}
        >
          <Meta title={product.title} description={product.description} />
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementComponent;
