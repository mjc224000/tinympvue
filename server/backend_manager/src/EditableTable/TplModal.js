import React from 'react'
import {Modal,Button} from 'antd';
import axios from '../request';

class AddTempleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''};
    }

    handleOk = () => {
        let {content} = this.state;
        if (content.trim() == '') {
            return;
        }
        axios.post('tpl', {content}).then((res) => {
            if (res.data === 'ok') {
                this.setState({content: ''});
            }
        }).then(() => {
            this.props.cancel();
            this.props.getList();
        });
    }
    handleChange = (e) => {
        this.setState({content: e.target.value});
    }
    handleSymbolClick=(symbol)=>{
        let content=this.state.content;
        content+=symbol;
        this.setState({content});
    }
    render() {
        let vars = this.props.vars;
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.props.cancel}
                >
                    <ul className={'vars'}>{vars.map((item) => {
                        return <li key={item.varId}> <Button onClick={()=>this.handleSymbolClick(item.symbol)}> {item.symbol}</Button></li>
                    })}</ul>
                    <p>请输入模板内容:</p>
                    <p><input type="text" size={35} value={this.state.content} onChange={this.handleChange}/></p>

                </Modal>
            </div>
        );
    }
}

export default AddTempleModal;