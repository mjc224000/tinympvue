import React from 'react';
import {Button, Form, Input, Popconfirm, Table} from 'antd';
import Addmodal from './TplModal';
import axios from "../request";
import './editableTable.css';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {

        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            record,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], editingKey: '', visible: false, newContent: '', vars: []};
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                width: '7%',
                editable: false,
            },
            {
                title: '内容',
                dataIndex: 'content',
                width: '50%',
                editable: true,
            },
            {
                title: 'compose',
                dataIndex: 'compose',
                editable: false
            }
            ,
            {
                title: 'operation',
                dataIndex: 'operation',
                width: '10%',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <div>
                                    <a onClick={() => this.edit(record.key)}>编辑</a> |
                                    <a onClick={() => this.handleDelete(record.key)}>删除</a>
                                </div>

                            )}
                        </div>
                    );
                },
            },
        ];
    }

    componentDidMount() {
        this.getList();
        this.getVars();
        axios.post('statistic',{type:'trucks',value:2}).then(res=>{
            console.log(res);
        })
    }

    getVars = () => {
        return axios.get('var').then(res => {
            console.log(res.data);
            this.setState({vars: res.data});
        })
    }
    getList = () => {
        axios.get('tpl').then((res) => {
            let data = res.data;
            data.map((item, index) => {
                item.index = index + 1;
                item.key = item.tplId
                return item
            })
            this.setState({data: res.data})
        })
    }
    handleDelete = (key) => {
        axios.delete('tpl', {
            params: {
                tplId: key
            }
        }).then((res) => {
            if (res.data === 'ok') {
                this.getList();
            }
        })
    }
    show = () => {
        this.getVars().then(() => this.setState({visible: true}))
    }
    closeModal = () => {
        this.setState({visible: false})
    }
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({editingKey: key});
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                console.log(item, row);
                axios.put('tpl', {
                    ...item,
                    ...row,
                }).then(() => {

                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    this.setState({data: newData, editingKey: ''});
                });

            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    }

    compose = (string, vars) => {
        console.log(string, vars);
        for (let i = 0; i < vars.length; i++) {
           string= string.replace(vars[i].symbol, vars[i].latest_value);
        }
        return string;
    }
    cancel = () => {
        this.setState({editingKey: ''});
    };

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        let tbList = this.state.data;
        tbList = tbList.map((item) => {
            let content = item.content;
            item.compose = this.compose(content, this.state.vars);
            return item
        })
        return (
            <div>
                <p className="top">模板编辑 <Button type={'primary'} onClick={this.show}>添加新的模板</Button></p>
                <Table
                    components={components}
                    bordered
                    dataSource={tbList}
                    columns={columns}
                    rowClassName="editable-row"
                />
                <Addmodal visible={this.state.visible} cancel={this.closeModal} getList={this.getList}
                          vars={this.state.vars}/>
            </div>

        );
    }
}

export default EditableTable;