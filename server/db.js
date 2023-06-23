
// 连接数据库（mongodb的服务端）
// 获取mongoose插件
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'maizuo'

// 连接数据库
mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 获取当前的连接对象
const conn = mongoose.connection;

// 监听错误
conn.on('error', err => {
    console.error('mongoose连接出错', err)
})
//监听连接成功
conn.once('open', function() {
  console.log('数据库连接成功');
});

module.exports = mongoose;