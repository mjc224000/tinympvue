import React from 'react';
import {Button, Form, Input, Popconfirm, Table} from 'antd';
import Addmodal from './TplModal';
import axios from "../request";
import './editableTable.css';

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i.toString(),
        id: ` ${i}`,
        content: 'nei rong'
    });
}
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
        this.state = {data, editingKey: '', visible: false, newContent: ''};
        this.columns = [
            {
                title: 'id',
                dataIndex: 'tplId',
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
                                    <a onClick={() => this.edit(record.key)}>编辑</a> | <a>删除</a>
                                </div>

                            )}
                        </div>
                    );
                },
            },
        ];
    }

    componentDidMount() {
        axios.get('tpl').then((res) => {
            let data = res.data;
            data.map((item) => {
                item.key = item.tplId
                return item
            })
            this.setState({data: res.data})
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
                axios.put('tpl', {...item}).then(()=>{

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
                <p className="top">模板编辑 <Button type={'primary'} onClick={this.show}>添加新的模板</Button></p>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                />
                <Addmodal visible={this.state.visible} cancel={this.closeModal}/>
            </div>

        );
    }
}

export default EditableTable;