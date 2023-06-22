const express = require('express');
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require('express-graphql');

// 构建模型
var Schema = buildSchema(`
  type Query {
    hello: String,
    getName: String,
    getAge: Int
  }
`)

// 执行的操作 处理器
const root = {
  hello: () => {
    //通过数据库查询
    var str = 'Hello World!';
    return str;
  },
  getName: () => {
    var str = 'xxxo';
    return str;
  },
  getAge: () => {
    return 100
  }
}

const app = express();

app.get('/home', (req, res) => {
  res.send('Hello World!');
});
app.get('/list', (req, res) => {
  res.send('list data');
});

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true  //开启调试器
}))

app.listen(3000, () => {
  console.log('http://localhost:3000/home');
});