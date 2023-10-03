/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Table, message} from 'antd';
import axios from 'axios';
import './RepaireHistoryComponent.css';

const columns = [
  {
    title: '狀態',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '公司名',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: '報修人',
    dataIndex: 'reporter',
    key: 'reporter',
  },
  {
    title: '維修者',
    dataIndex: 'repairer',
    key: 'repairer',
  },
  {
    title: '維修機台',
    dataIndex: 'repairerTarget',
    key: 'repairerTarget',
  },
  {
    title: '預約時間',
    dataIndex: 'appointmentTime',
    key: 'appointmentTime',
  },
  {
    title: '完成時間',
    dataIndex: 'completionTime',
    key: 'completionTime',
  },
];

function RepairHistoryTable({user, selectedKey}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedKey === '3') {
      // "報修履歷" 的 key 是 '3'
      const getRepairData = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5173/getRepairData',
            {
              params: {
                帳號: user['帳號'],
              },
            }
          );
          const showFormat = response.data.records.map((record) => {
            return {
              key: record.$id.value,
              company: record['公司名'].value,
              reporter: record['維修填寫人'].value,
              repairer: record['維修工程師'].value,
              repairerTarget: record['維修機台'].value,
              appointmentTime: record['欲預約時間'].value
                ? moment(record['欲預約時間'].value).format('YYYY-MM-DD HH:mm')
                : '',
              completionTime: record['維修完成時間'].value
                ? moment(record['維修完成時間'].value).format(
                    'YYYY-MM-DD HH:mm'
                  )
                : '',
              status: record['狀態'].value,
            };
          });
          setData(showFormat);
        } catch (error) {
          message.error(error.toString());
          console.error('Failed to fetch data:', error);
        }
      };
      getRepairData();
    }
  }, selectedKey);

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 50,
      }}
      bordered // 讓表格之間有分隔線
    />
  );
}

export default RepairHistoryTable;
