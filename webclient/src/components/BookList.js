import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import {Table} from 'antd'
import {Link} from "react-router-dom";
import {getBooks, removeBook, searchMytext, _getTotal} from "../actions/books";
import {Button, Popconfirm, Input, Icon} from 'antd';
import '../styles/App.css';
import Highlighter from 'react-highlight-words';

{ /*
    const BookList = ({books}) => (
        <div>

            <div>
                {books.map(book => {
                    return (
                        <div key={book.id}>
                            <Book {...book} />
                        </div>
                    );
                })}
            </div>

        </div>
    );
  */ }

  const BookList = ({total,mytext,books,dispatch}) => {


        let searchInput;
      const getColumnSearchProps  = (dataIndex)=> ({
          filterDropdown: ({
                               setSelectedKeys, selectedKeys, confirm, clearFilters,
                           }) => (
              <div className="custom-filter-dropdown">
                  <Input
                      ref={node => { searchInput = node; }}
                      placeholder={`Search ${dataIndex}`}
                      value={selectedKeys[0]}
                      onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                      onPressEnter={() => handleSearch(selectedKeys, confirm)}
                      style={{ width: 188, marginBottom: 8, display: 'block' }}
                  />
                  <Button
                      type="primary"
                      onClick={() => handleSearch(selectedKeys, confirm)}
                      icon="search"
                      size="small"
                      style={{ width: 90, marginRight: 8 }}
                  >
                      Search
                  </Button>
                  <Button
                      onClick={() => handleReset(clearFilters)}
                      size="small"
                      style={{ width: 90 }}
                  >
                      Reset
                  </Button>
              </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
          onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                   setTimeout(() => searchInput.select());
              }
          },
          render: (text) => (
              <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[mytext]}
                  autoEscape
                  textToHighlight={text.toString()}
              />
          ),
      })

      const handleSearch = (selectedKeys, confirm) => {
          confirm();
          dispatch(searchMytext(selectedKeys[0])  );
      }

     const  handleReset = (clearFilters) => {
          clearFilters();
          dispatch(searchMytext(''));
      }

      const columns = [{
          title: 'title',
          dataIndex: 'title',
          key: 'title',
          width:'30%',
          ...getColumnSearchProps('title'),

          render: (text,record )=> <Link to={`/book/${record.id}`}>
              <h4>{text}</h4>
          </Link>,
      }, {
          title: 'published',
          dataIndex: 'published',
          key: 'published',
          width : '10%',

      }, {
          title: 'author',
          dataIndex: 'author',
          key: 'author',
          width : '10%',
      }, {
          title: 'description',
          dataIndex: 'description',
          key: 'description',
          width : '35%',
     /*
      }, {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          width:'5%',
      */
      }, {
          title: 'action',
          key: 'action',
          width:'10%',

          render: (record,index) => (
              <div>
                    <Popconfirm title="Delete?" onConfirm={() => {
                        dispatch(removeBook(index)).then(()=> {

                            if((total - 1)% 5 != 0) {
                                dispatch(_getTotal(total - 1));
                                console.log("if");
                            }else{
                                dispatch(getBooks((total-1)/5));
                                console.log("else");
                            }
                        });


                    }
                    }>
                  <Button

                      type="primary"

                  >remove</Button>
                    </Popconfirm>


        </div>
          ) ,


      }];

      return (<Table columns={columns} dataSource={books} bordered = {true} pagination={{pageSize:5,
      onChange:(page = 1,pageSize)=>{

          dispatch(getBooks(page))
      },
          total:total
      }}/>);


  };

const mapStateToProps = (state) => {
    return {
        books: state.books,
        mytext:state.mytext,
        total: state.page.total
    };
}

export default connect(mapStateToProps)(BookList);