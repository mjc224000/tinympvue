import React, {Component} from 'react';
import EditableTable from '../EditableTable';
import './tmpl.css';

export default class Tmpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmpls: [],
        }
    }
    render() {
        return (
              <div>
                  <p>变量</p>
                  <EditableTable/>
              </div>
           )

    }
}


// rowSelection object indicates the need for row selection
