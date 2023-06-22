const express = require('express');
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require('express-graphql');

// 构建模型
// type Query 是查询数据   type Mutation 是修改数据

// type Film 也可以自定义类型
// getFilmDetail(id: Int!)  获取详情传参，! 表示必传字段
var Schema = buildSchema(`
  type Account {
    name: String,
    age: Int,
    location: String
  }
  type Film {
    id: Int,
    name: String,
    poster: String,
    price: Int
  }

  type Query {
    hello: String,
    getName: String,
    getAge: Int,
    getAllNames: [String],
    getAllAges: [Int],
    getAccountInfo: Account,
    getNowplayingList: [Film],
    getFilmDetail(id: Int!):Film
  }
`)

// 模拟假数据
var faskeDb = [
  {
    id:1,
    name:'1111',
    poster:"http://11111",
    price:100
  },
  {
    id:2,
    name:'222',
    poster:"http://2222",
    price:200
  },
  {
    id:3,
    name:'333',
    poster:"http://333",
    price:300
  },
]

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
  },
  getAllNames: () => {
    return ['aaa', 'bbb', 'ccc']
  },
  getAllAges: () => {
    return [1, 2, 3]
  },
  getAccountInfo(){
    return {
      name: 'xxx',
      age: 100,
      location: 'xxx1202'
    }
  },
  getNowplayingList(){
    return faskeDb
  },
  getFilmDetail({id}){ //查找id，接受的是一个对象，所以解构
    console.log('id: ', id);
    return faskeDb.find(item => item.id === id)
  }
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true  //开启调试器
}))

app.listen(3000, () => {
  console.log('http://localhost:3000/home');
});