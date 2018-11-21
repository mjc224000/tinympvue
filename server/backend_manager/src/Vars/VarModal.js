import React from 'react'
import {Modal} from 'antd';
import axios from '../request';

class AddTempleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: '', disc: "", symbol: "", title: "提交新的变量"};

    }

    handleChange = (key, value) => {
        this.setState({[key]: value});
    }
    handleOk = () => {
        let {type, disc, symbol} = this.state;
        console.log(this.state);


        axios.post('var', {type, disc, symbol}).then((res) => {
            if (res.data !== 'ok') {
                return Promise.reject('not ok')
            }
            this.setState({title: '提交成功'});
        }).then(() => {
            this.props.getList();
            setTimeout(() => {
                this.props.cancel();
                this.setState({type: '', disc: "", symbol: "",title:'提交新的变量'});
            },1000)
        });
    }


    render() {
        let {type, disc, symbol} = this.state;
        return (
            <div>

                <Modal
                    title={this.state.title}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.props.cancel}
                >
                    <p>请输入变量参数:</p>
                    <ul className={'vars-form'}>
                        <li>输入变量类型:<input type="text" value={type}
                                          onChange={(e) => this.handleChange('type', e.target.value)}/></li>
                        <li>输入变量的描述:<input type="text" value={disc} size={30}
                                           onChange={(e) => this.handleChange('disc', e.target.value)}/></li>
                        <li>输入变量的表征符号:<input type="text"
                                             value={symbol}
                                             onChange={e => this.handleChange('symbol', e.target.value)}/></li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default AddTempleModal;