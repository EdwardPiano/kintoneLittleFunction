import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import axios from 'axios';

const {Meta} = Card;

const AnnounceTest = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('你的API網址').then((response) => {
      const newProducts = response.data.map((item) => ({
        image: `data:image/jpeg;base64,${item.image.toString('base64')}`,
        title: item.title,
        description: item.description,
      }));
      setProducts(newProducts);
    });
  }, []);

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

export default AnnounceTest;
