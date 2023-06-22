const express = require('express');
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require('express-graphql');

// 构建模型
// type Query 是查询数据(get)   type Mutation 是修改数据(post)

// type Film 也可以自定义类型
// input FilmInput 创建输入数据，类型要用input来定义
// deleteFilm(id: Int!)，  ! 表示必传字段
var Schema = buildSchema(`
  type Film {
    id: Int,
    name: String,
    poster: String,
    price: Int
  }
  input FilmInput {
    name: String,
    poster: String,
    price: Int
  }

  type Query {
    getNowplayingList: [Film],
  }

  type Mutation {
    createFilm(filmInput: FilmInput): Film,
    updateFilm(id: Int!, filmInput: FilmInput): Film,
    deleteFilm(id: Int!):Int
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
  getNowplayingList(){
    return faskeDb
  },
  // 创建数据
  createFilm({filmInput}){  //接受的是一个对象，所以解构
    var obj = {...filmInput,id:faskeDb.length+1}
    faskeDb.push(obj)
    return obj
  },
  // 修改数据
  updateFilm({id, filmInput}){
    var current = null
    faskeDb = faskeDb.map(item=>{
      if(item.id == id){
        current = {...item,...filmInput}
        return current
      }
      return  item
    })
    return current
  },
  // 删除数据
  deleteFilm({id}){
    faskeDb = faskeDb.filter(item=>item.id !== id)
    //假设删除成功返回1，失败返回0
    return 1
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