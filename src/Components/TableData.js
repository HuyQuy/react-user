import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {
    deleteButtonClick = (idUser) =>{
        this.props.deleteUser(idUser);
    }
    mappingDataUser = () => this.props.dataUserProps.map((value, key) => (
        <TableDataRow editFunClick={(user) => this.props.editFun(value)} 
                        userName={value.name} 
                        stt={key} key={key} 
                        tel={value.tel} 
                        permission={value.permission} 
                        id={value.id}
                        deleteButtonClick={(idUser) => this.deleteButtonClick(idUser)}
                        changeEditUserStatus={() => this.props.changeEditUserStatus()}/>
    ))

    render() {
        return (
            <div className="col">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Điện thoại</th>
                        <th>Quyền</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.mappingDataUser()}                                                         
                    </tbody>
                </table>
                </div>

        );
    }
}

export default TableData;
