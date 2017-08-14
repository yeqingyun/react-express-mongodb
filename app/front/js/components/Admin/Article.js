/*
 * @Author: leo 
 * @Date: 2017-08-14 11:38:37 
 * @Last Modified by: leo
 * @Last Modified time: 2017-08-14 14:18:35
 */

import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// const { ColumnGroup } = Table;

import * as actions from '../../actions'
@connect(
  state => ({users: state.users}),
  dispatch => bindActionCreators({...actions}, dispatch)
)

export class Article extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    receiveUsers: PropTypes.func
  }

  componentDidMount() {
    this.props.receiveUsers('/api/admin/users')
  }

  render() {
    const { isFetching, users } = this.props.users;
    const columns = [
      { title: '用户ID', dataIndex: '_id', key: '_id' },
      { title: '用户名', dataIndex: 'username', key: 'username' },
      { title: '密码', dataIndex: 'password', key: 'password' },
      { title: '是否是管理员', dataIndex: 'admin', key: 'admin' },
      { title: '操作',
        dataIndex: '',
        key: 'x',
        render: () =>
          <span>
            <a href="#">查看</a>
            <span className="ant-divider" />
            <a href="#">删除</a>
          </span>
      }
    ];
    if (!isFetching) {
      for (let i=0; i<users.length; i++) {
        Object.keys(users[i]).forEach(key => {
          if (key !== 'admin') {
            users[i].admin = users.isAdmin ? '是' : '否';
          }
        });
      }
    }
    return (
      <div>
        {
          !isFetching ? <Table columns={columns} dataSource={users} rowKey={users => users._id} style={{textAlign: 'center'}} bordered /> : null
        }
      </div>
    )
  }
}