import React, {Component} from 'react';
import EditableTable from '../EditableTable';

import './Tpl.css';

export default class Tpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tpls: [],
        }
    }
    handleAdd=()=>{
        let {tpls}=this.state;
        tpls.push({ id:tpls.length+1, content:''});
    }
    render() {
        return (
                <EditableTable data={this.state.tpls}/>
        )

    }
}

