import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

export default class MenuW extends Component {
    constructor(props) {
        super(props);
        this.state = {current: ''}
    }

    handleClick = (e) => {
        this.setState({current: e.key})
    }

    render() {
        return (<Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
        >
            <Menu.Item key="Tmpl">
                <Link to={'/tpl'}> 模板编辑页面 </Link>
            </Menu.Item>
            <Menu.Item key={"vars"}>
                <Link to={"/vars"}>变量编辑页面</Link>
            </Menu.Item>
            <Menu.Item key="app" disabled>
                不能查看的页面
            </Menu.Item>
            <Menu.Item key="alipay">
                <Link to={'/'}>列表页面</Link>
            </Menu.Item>
        </Menu>)
    }

}