import React, {Component} from 'react';
import BackEndTable from './Table';
import {Layout} from 'antd';
import AuthModal from './AuthModal';
import Menu from './Menu';
import VarsTable from './Variable';
import TplTable from './Tpl';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css'
import axios from "./request";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {

    }

    getList = () => {
        axios.get('api/users').then((res) => {
            let list = res.data.list;
            list.map((v) => v.key = v.personId)
            this.setState({list: res.data.list})
        }).catch((res) => console.log(res));
    }

    render() {
        return (<Router>
                <Layout>
                    <Menu/>
                    <Route path={'/'} exact component={() => <BackEndTable list={this.state.list}/>}/>
                    <Route path={'/vars'} component={VarsTable}/>
                    <Route path={'/tpl'} component={TplTable} />

                    <AuthModal getList={this.getList}/>
                </Layout>
            </Router>
        );
    }
}

export default App;
