import React from 'react'

const ListCustomerComponent = () => {
    return (
        <div className="container">ListCustomerComponent
            <h2 className='text-center'>Listado de empleados</h2>
            <button className='btn-primary'></button>
            <table className='table table-striped table-dark table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>FirstName</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
export default ListCustomerComponent
