/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
  notification,
} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';

const {Option} = Select;
const {TextArea} = Input;

//登記報修資訊
const RepairForm = ({user}) => {
  const [form] = Form.useForm();
  //上傳報修資訊
  const onFinish = async (values) => {
    try {
      form.resetFields(); //清空欄位或設定回預設值
      console.log('Received values of form: ', values);
      const response = await axios.post(
        'http://localhost:5173/createRepair',
        {
          登記人帳號: {value: user['帳號']},
          公司名: {value: values.companyName},
          維修填寫人: {value: values.reporter},
          電話: {value: values.phone},
          地址: {value: values.address},
          欲預約時間: {value: values.appointmentTime.toDate().toISOString()},
          維修機台: {value: values.machineType},
          報修內容: {value: values.repairContent},
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // 顯示通知
      notification.success({
        message: '表單送出成功',
        description: '您的申請已經成功送出，我們將會盡快處理您的請求。',
      });
    } catch (error) {
      message.error(error.toString());
    }
  };
  //設定登入者預設資料至表單
  const defaultUserName = user ? user['使用者名稱'] : '';
  const defaultCompany = user ? user['所屬公司'] : '';
  const defaultPhoneNum = user ? user['連絡電話'] : '';
  const defaultAddress = user ? user['地址'] : '';

  return (
    <Form
      form={form}
      name="repair_form"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{
        reporter: defaultUserName,
        companyName: defaultCompany,
        phone: defaultPhoneNum,
        address: defaultAddress,
      }}
    >
      <Input.Group compact>
        <Form.Item
          name="companyName"
          label="公司名"
          rules={[{required: true}]}
          style={{width: '25%', marginRight: '10px'}}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="reporter"
          label="維修填寫人"
          rules={[{required: true}]}
          style={{width: '16%'}}
        >
          <Input />
        </Form.Item>
      </Input.Group>

      <Input.Group compact>
        <Form.Item
          name="phone"
          label="電話"
          rules={[{required: true}]}
          style={{width: '13%', marginRight: '10px'}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="地址"
          rules={[{required: true}]}
          style={{width: '26%', marginRight: '10px'}}
        >
          <Input />
        </Form.Item>
      </Input.Group>

      <Input.Group compact>
        <Form.Item
          name="appointmentTime"
          label="欲預約時間"
          rules={[{required: true}]}
          style={{width: '17%', marginRight: '10px'}}
        >
          <DatePicker
            showTime={{
              format: 'HH:mm',
            }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item
          name="machineType"
          label="維修機台"
          rules={[{required: true}]}
          style={{width: '15%'}}
        >
          <Select>
            <Option value="A類型機台">A類型機台</Option>
            <Option value="B類型機台">B類型機台</Option>
            <Option value="C類型機台">C類型機台</Option>
          </Select>
        </Form.Item>
      </Input.Group>

      <Form.Item
        name="repairContent"
        label="報修內容"
        rules={[{required: true}]}
        style={{width: '45%'}}
      >
        <TextArea style={{height: '130px'}} />
      </Form.Item>
      <Form.Item
        name="upload"
        label="附件上傳"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>點擊上傳</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

function normFile(e) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

export default RepairForm;
