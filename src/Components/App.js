import React, { Component } from 'react';
import './../App.css';
import AddUser from './AddUser';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import DataUser from './Data.json';

const { v4: uuidv4 } = require('uuid');
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hienThiForm: false,
      data: [],
      searchText: '',
      editUserStatus: false,
      userEditObject: {}
    }
  }
  
  componentWillMount() {
    // kiểm tra
    if(localStorage.getItem('userData') === null){
      localStorage.setItem('userData', JSON.stringify(DataUser));
    } else {
      var temp = JSON.parse(localStorage.getItem('userData'));
      this.setState({
        data: temp
      })
    }
  }
  
  doiTrangThai = () => {
    this.setState({
      hienThiForm: !this.state.hienThiForm
    })
  }
  getTextSearch = (dl) => {
    this.setState({
      searchText: dl
    })
  }
  getNewUserData = (name, tel, permission) => {
    var item = {};
    item.id =uuidv4();
    item.name = name;
    item.tel = tel;
    item.permission = permission;
    var items = this.state.data;
    items.push(item);
    this.setState({
      data: items
    })
    localStorage.setItem('userData', JSON.stringify(items));
  }
  editUser = (user) => {
    this.setState({
      userEditObject: user
    })
  }
  changeEditUserStatus = () =>{
    this.setState({
      editUserStatus: !this.state.editUserStatus
    })
  }
  getEditUserInfoApp = (info) =>{
    this.state.data.forEach((value, key) => {
      if(value.id === info.id){
        value.name = info.name;
        value.tel = info.tel;
        value.permission = info.permission;
      } 
    })
    localStorage.setItem('userData', JSON.stringify(this.state.data));
  }
  deleteUser = (idUser) =>{
    var tempData = this.state.data;
    tempData = tempData.filter(item => item.id !== idUser);
    this.setState({
      data: tempData
    })
    localStorage.setItem('userData', JSON.stringify(tempData));
  }
  render() {
    var ketqua = [];
    this.state.data.forEach((item) =>{
      if(item.name.indexOf(this.state.searchText) !== -1){
        ketqua.push(item);
      }
    })
    return (
      <div>
          <Header/>
          <div className="searchForm">
              <div className="container">
                  <div className="row">
                      <Search getEditUserInfoApp={(info) => this.getEditUserInfoApp(info)}
                        userEditObject={this.state.userEditObject}
                        getTextSearchProps={(dl) => this.getTextSearch(dl)}
                        ketNoi={() => this.doiTrangThai()} hienThiForm={this.state.hienThiForm}
                        editUserStatus={this.state.editUserStatus}
                        changeEditUserStatus={() => this.changeEditUserStatus()}
                        />
                      <TableData deleteUser={(idUser) => this.deleteUser(idUser)}
                        editFun={(user)=> this.editUser(user)} dataUserProps={ketqua}
                        changeEditUserStatus={() => this.changeEditUserStatus()}/>
                      <AddUser add={(name, tel, permission) => this.getNewUserData(name, tel, permission)} hienThiForm={this.state.hienThiForm}/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
