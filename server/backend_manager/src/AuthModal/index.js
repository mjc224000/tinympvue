import React, {Component} from 'react';
import {Modal} from 'antd';
import axios, {store} from "../request";

export default class AuthModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true,
            pw: ''
        }
    }
  componentDidMount(){
        if(store('token')){
            this.props.getList();
            this.setState({isShow:false});
        }
  }
    handlePwChange = (e) => {
        this.setState({pw: e.target.value});
    }
    loginConfirm = () => {
        const {pw} = this.state;
        let that = this;
        axios.get('login', {
            params: {
                pw
            }
        }).then(function (res) {
            if (res.statusText === 'OK') {
                store('token', res.data)
                that.props.getList();
                that.setState({isShow: false})
            }
        })
    }

    render() {
        return (<Modal title={'登录'}
                       visible={this.state.isShow}
                       onOk={this.loginConfirm}
                       onCancel={this.handleLoginModalCancel}>
            <div>
                密码:<input style={{marginLeft: '20px'}} type="text" value={this.state.pw}
                          onChange={this.handlePwChange}/>
            </div>
        </Modal>)
    }
}