import React from 'react';
import {Button, Form, Input, Popconfirm, Table,InputNumber,Checkbox } from 'antd';
import Addmodal from './VarModal';
import axios from "../request";
import './vars.css';
class MyCheck extends React.Component{
    render(){
        return <Checkbox checked={this.props.value} {...this.props}/>
    }
}
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
// 判定在可编辑状态下的component是啥
class EditableCell extends React.Component {
    getInput = () => {

        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        if(this.props.dataIndex==='isshow'){
            return <MyCheck/>
        }
        return <Input />;
    }

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
        this.state = {data: [], editingKey: '', visible: false, newContent: ''};
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                width: '7%',
                editable: false,
            },
            {
                title: '类型',
                dataIndex: 'type',
                width: '15%',
                editable: true,
            },
            {
                title:'描述',
                dataIndex:'disc',
                width: '40%',
                editable: true,
            },  {
                title:'是否显示',
                dataIndex:'isshow',
                with:'5%',
                editable:true ,
           render:(text,record)=>{

                    const editable = this.isEditing(record);
                   return ( editable?undefined
                       :<Checkbox checked={text} disabled/>  )
                }
            }, {
                title:'表征符号',
                dataIndex:'symbol',
                width: '15%',
                editable: true,
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
    }

    getList = () => {
        axios.get('var').then((res) => {
            let data = res.data;

            data.map((item,index) => {
                    item.index=index+1;
                    item.key = item.varId
                    return item
                })
                this.setState({data: res.data})
        })
    }
    handleDelete = (key) => {
        axios.delete('var', {
            params: {
                varId: key
            }
        }).then((res) => {
            if (res.data === 'ok') {
                this.getList();
            }
        })
    }
    show = () => {
        this.setState({visible: true});
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

                axios.put('var', {
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

        return (
            <div>
                <p className="top">变量编辑 <Button type={'primary'} onClick={this.show}>添加新的变量</Button></p>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                />
                <Addmodal visible={this.state.visible} cancel={this.closeModal} getList={this.getList}/>
            </div>

        );
    }
}

export default EditableTable;