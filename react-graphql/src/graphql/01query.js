// eslint-disable-next-line no-unused-vars
import react, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// 创建客户端连接
const client = new ApolloClient({
  // uri: "http://localhost:3003/graphql",
  uri: "/graphql",
});

class App extends Component {
  // 也可以把state写在这里
  state = {
    a: 123,
  };
  add = () => {
    this.setState({
      a: this.state.a + 1,
    });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <QueryComponent></QueryComponent>
        </div>
      </ApolloProvider>
    );
  }
}

class QueryComponent extends Component {
  query = gql`
    query {
      getNowplayingList {
        id
        name
        poster
        price
      }
    }
  `;
  render() {
    return (
      <Query query={this.query}>
        {({ loading, error, data }) => {
          // 因为是异步组件，所以会执行两次
          // console.log("data: ", data);
          return loading ? (
            <div>loading...</div>
          ) : (
            <div>
              {data.getNowplayingList.map((item) => (
                <div key={item.id}>
                  <div>名称:{item.name}</div>
                  <div>价格:{item.price}</div>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

// class App extends Component {
//   // 也可以把state写在这里
//   state = {
//     a:123
//   }
//   add = () => {
//     this.setState({
//       a:this.state.a+1
//     })
//   }
//   render() {
//     return (
//       <div>
//         hello App
//         <button onClick={this.add}>增加</button>
//         <p>{this.state.a}</p>
//       </div>
//     );
//   }
// }

export default App;
