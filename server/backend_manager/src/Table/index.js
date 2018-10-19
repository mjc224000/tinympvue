import React, {Component} from 'react';
import {Divider, Modal, Table} from 'antd';
import axios from './../request';

const {Column} = Table;

class BackEndTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            isConfirmModalShow: false,
            isAuthModalShow: false,
            openid: '',
            isConfirmLoading: false,
            nickName: '',
            msg: '',
            modalType: ''
        }
    }

    componentDidMount() {

        axios.get('api/users').then((res) => {
            let list = res.data.list;
            list.map((v) => v.key = v.personId)
            this.setState({list: res.data.list})
        }).catch((res) => console.log(res));
    }
    closeConfirm = () => {
        this.setState(
            {
                isConfirmModalShow: false,
                nickName: '',
                openid: '',
                isConfirmLoading: false,
                modalType:''
            })
    }

    showModal = (record, modalType) => {
        let {openid, nickName} = record;
        this.setState(
            {
                isConfirmModalShow: true,
                openid, nickName,
                msg: '',
                modalType
            });
    }
    confirm = () => {
        let {openid, modalType} = this.state;
        this.setState({isConfirmLoading: true});

        axios.get(modalType === 'auth' ? 'setRole' : 'unAuth', {params: {openid}}).then(res => {
            if (res.data === 'ok') {
                this.setState({msg: '设置成功'});
                let that = this;
                setTimeout(function () {
                    that.closeConfirm();
                }, 500)
            }
        })
    }
    unAuth = () => {
        let {openid} = this.state;
        this.setState({isConfirmLoading: true});
        axios.get('unAuth', {params: {openid}}).then(res => {
            if (res.data === 'ok') {
                this.setState({msg: '设置成功'});
                let that = this;
                setTimeout(function () {
                    that.closeConfirm();
                }, 500)
            }
        })
    }
    render() {
        let title,verb;
        switch (this.state.modalType) {
            case 'auth':title='授权';verb='给';break;
            case 'unAuth':title='撤销';verb='撤销';break;
            case 'delete':title='删除';verb='删除';break;
        }
        return (
            <React.Fragment>
                <Table dataSource={this.state.list}>

                    <Column
                        title="昵称"
                        dataIndex="nickName"
                        key="nickName"
                    />
                    <Column
                        title="头像"
                        dataIndex="avatarUrl"
                        key="avatarUrl"
                        render={url => <img style={{width: '65px', height: '65px', borderRadius: '10px'}} src={url}
                                            alt=""/>}
                    />
                    <Column
                        title="性别"
                        dataIndex="gender"
                        key="gender"
                    />
                    <Column
                        title="语言"
                        dataIndex="language"
                        key="language"
                    />
                    <Column
                        title="城市"
                        dataIndex="city"
                        key="city"
                    />
                    <Column
                        title="openid"
                        dataIndex="openid"
                        key="openid"
                    />
                    <Column
                        title="角色"
                        dataIndex="role_roleid"
                        key="role_roleid"
                        render={(text, record) => {
                            return (<span> {text === 1 ? '管理员' : '无'}</span>)
                        }}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => {
                            console.log(record, 'record');
                            return (
                                <span>
                                    {record.role_roleid === 1 ? <a href="javascript:;"
                                                                   onClick={() => this.showModal(record, 'unAuth')}>取消</a> : null}
                                    <Divider type="vertical"/>
          <a href="javascript:;" onClick={() => this.showModal(record, 'auth')}>授权</a>
        </span>
                            )
                        }}
                    />
                </Table>
                <Modal title={title}
                       visible={this.state.isConfirmModalShow}
                       onOk={this.confirm}
                       confirmLoading={this.state.isConfirmLoading}
                       onCancel={this.closeConfirm}
                >
                    {
                        this.state.msg === '' ? <p>授权确认，是否确定要{verb}openid 为{this.state.openid},昵称为 <span
                            style={{color: 'red'}}> {this.state.nickName}</span>
                            的用户授权
                        </p> : this.state.msg
                    }
                </Modal>
            </React.Fragment>
        )
    }
}

export default BackEndTable