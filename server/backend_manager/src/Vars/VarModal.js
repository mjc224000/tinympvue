import React from 'react'
import {Modal} from 'antd';
import axios from '../request';

class AddTempleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''};

    }

    handleOk = () => {
        let {content} = this.state;
        if(content.trim()==''){
            return;
        }
        axios.post('var', {content}).then((res) => {
            console.log(res);
        }).then(() => {
            this.props.cancel();
            this.props.getList();
        });
    }
    handleChange=(e)=>{
        this.setState({content:e.target.value});
    }

    render() {
        return (
            <div>

                <Modal
                    title="Basic Modal"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.props.cancel}
                >
                    <p>请输入变量参数:</p>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li></ul>
                    <p><input type="text" size={30} value={this.state.content} onChange={this.handleChange}/></p>

                </Modal>
            </div>
        );
    }
}

export default AddTempleModal;