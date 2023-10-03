import React, {useState} from 'react';
import axios from 'axios';
import './FetchDataComponent.css';

function FetchDataComponent() {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5173/api');
      setData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      <button className="fetchDataButton" onClick={fetchData}>
        獲取數據
      </button>
      <textarea defaultValue={data} readOnly={true} rows={20} cols={100} />
    </div>
  );
}

export default FetchDataComponent;
