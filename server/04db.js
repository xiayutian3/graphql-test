const express = require('express');
const {buildSchema} = require("graphql")
const {graphqlHTTP} = require('express-graphql');
/**
 * 连接数据库
 */
const mongoose = require('./db')
var FilmModel =  mongoose.model('film', new mongoose.Schema({
  name:String,
  poster:String,
  price:Number
}))
// FilmModel.create
// FilmModel.find
// FilmModel.update
// FilmModel.delete

// 构建模型
// type Query 是查询数据(get)   type Mutation 是修改数据(post)

// type Film 也可以自定义类型
// input FilmInput 创建输入数据，类型要用input来定义
// deleteFilm(id: Int!)，  ! 表示必传字段
var Schema = buildSchema(`
  type Film {
    id: String,
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
    updateFilm(id: String!, filmInput: FilmInput): Film,
    deleteFilm(id: String!):Int
  }
`)


// 执行的操作 处理器
const root = {
  // 查询
  getNowplayingList(){
    return FilmModel.find()
  },
  // 创建数据
  createFilm({filmInput}){  //接受的是一个对象，所以解构
    /**
     * 1.创建模型
     * 2.操作数据库
     * 3.支持返回promise
     */
    return FilmModel.create({...filmInput})
    
  },
  // 修改数据
  updateFilm({id, filmInput}){
    return FilmModel.updateOne(
      {_id:id},
      {...filmInput}
    ).then(res=>FilmModel.find({_id:id})).then(res=>res[0])
  },
  // 删除数据
  deleteFilm({id}){
    //假设删除成功返回1，失败返回0
    if(id){
      return FilmModel.deleteOne({_id:id}).then(res=>1)
    }
  }
}

// http://localhost:3000/graphql
// # query {
//   #   getNowplayingList {
//   #     id,
//   #     name
//   #   }
//   # }
  
//   mutation {
//     # createFilm(filmInput:{
//     #   name:"1",
//     #   poster:"http://1",
//     #   price:100
//     # }) {
//     #   id,
//     #   name
//     # }
    
//     # updateFilm(id:"649542e4fc8443f58e3791f1",filmInput:{
//     #   name:"hello修改"
//     # }) {
//     #   id
//     # }
    
//     deleteFilm(id:"649542ecfc8443f58e3791f3")
//   }
  



const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: root,
  graphiql: true  //开启调试器
}))

// 配置静态资源文件夹
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('http://localhost:3000/home');
});