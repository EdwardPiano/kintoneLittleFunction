/* eslint-disable import/no-extraneous-dependencies */
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

const showDataTables = () => {
  // 獲取客製清單的div
  const myDiv = document.getElementById('myDiv')
  // 建立table元素
  const table = document.createElement('table')
  // 設定table元素的風格
  table.className = 'table table-striped table-bordered'

  // 將table放入div中
  myDiv.appendChild(table)

  // data的內容之後從其應用程式獲取後整理成以下格式
  // 表身
  $(table).DataTable({
    data: [
      ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
      ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
      ['John Doe', 'Software Engineer', 'New York', '1234', '2012/05/21', '$150,000'],
      ['Jane Smith', 'Data Analyst', 'London', '5678', '2013/08/15', '$200,000'],
      ['Robert Johnson', 'Project Manager', 'Paris', '9101', '2014/11/30', '$250,000'],
      ['Michael Brown', 'Database Administrator', 'Berlin', '1213', '2015/02/20', '$180,000'],
      ['William Davis', 'Network Engineer', 'Sydney', '1415', '2016/05/25', '$220,000'],
      ['David Miller', 'Web Developer', 'Toronto', '1617', '2017/08/10', '$190,000'],
      ['Richard Wilson', 'UX Designer', 'Dublin', '1819', '2018/11/15', '$210,000'],
      ['Charles Moore', 'QA Tester', 'Madrid', '2021', '2019/02/05', '$160,000'],
      ['Joseph Taylor', 'DevOps Engineer', 'Rome', '2223', '2020/05/01', '$230,000'],
      ['Thomas Anderson', 'Security Analyst', 'Copenhagen', '2425', '2021/08/20', '$240,000'],
      ['Patricia Jackson', 'Data Scientist', 'Beijing', '2627', '2012/05/30', '$260,000'],
      ['Linda Harris', 'Mobile Developer', 'Bangalore', '2829', '2013/08/25', '$270,000'],
      ['Barbara Clark', 'System Administrator', 'Cairo', '3031', '2014/11/05', '$280,000'],
      ['Elizabeth Lewis', 'Frontend Developer', 'Athens', '3233', '2015/02/15', '$290,000'],
      ['Jennifer Robinson', 'Backend Developer', 'Istanbul', '3435', '2016/05/10', '$300,000'],
      ['Maria Hall', 'AI Specialist', 'Rio de Janeiro', '3637', '2017/08/05', '$310,000'],
      ['Susan Allen', 'Cloud Consultant', 'Moscow', '3839', '2018/11/25', '$320,000'],
      ['Margaret Nelson', 'IT Support', 'Lisbon', '4041', '2019/02/10', '$330,000'],
      ['Dorothy Baker', 'IT Manager', 'Budapest', '4243', '2020/05/15', '$340,000'],
      ['Lisa Carter', 'Full Stack Developer', 'Wellington', '4445', '2021/08/30', '$350,000'],
      ['Nancy Adams', 'Cyber Security Specialist', 'Helsinki', '4647', '2012/05/05', '$360,000'],
      ['Karen Perez', 'Product Manager', 'Oslo', '4849', '2013/08/20', '$370,000'],
      ['Betty Young', 'Scrum Master', 'Stockholm', '5051', '2014/11/10', '$380,000'],
      ['Helen Hernandez', 'Business Analyst', 'Vienna', '5253', '2015/02/25', '$390,000'],
      ['Sandra King', 'IT Consultant', 'Brussels', '5455', '2016/05/15', '$400,000'],
    ],
    // 表頭
    columns: [
      { title: 'Name' },
      { title: 'Position' },
      { title: 'Office' },
      { title: 'Extn.' },
      { title: 'Start date' },
      { title: 'Salary' },
    ],
  })
}

kintone.events.on('app.record.index.show', showDataTables)
