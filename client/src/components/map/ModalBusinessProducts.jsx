import React from 'react';
import Pagination from '../../routes/admin/AdminPagination';
import "../../routes/admin/users/UserModal.css"
import ProductRaw from './ProductRaw';
import { paginate } from "../../services/AdminServices";

const ModalBusinessProducts = ({ business, closeModal }) =>
{
    const closeModalFromOutSite = event =>
    {
        if(event.target === modal.current) closeModal();
    };

    const handlePaginationOnChange = page =>
    {
        const paginate = {...pagination};
        paginate.currentPage = page;
        setPagination(paginate);
    }

    if(Object.keys(business).length === 0) return null;

    const modal = React.useRef(null);
    const [pagination, setPagination] = React.useState(
        {
            currentPage: 1,
            pageSize: 5
        });
    const { products } = business;
    const paginateProducts = paginate(products, pagination.currentPage, pagination.pageSize);

    return (   
        <div ref={modal} onClick={event => {closeModalFromOutSite(event)}} className="user-modal modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Products</h5>
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal" 
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <table className="table table-sm mb-0">
                    <thead>
                        <tr className="align-top">
                            <th className="border-top-0">Name</th>
                            <th className="border-top-0">Original price [$]</th>
                            <th className="border-top-0">Sale price [$]</th>
                            <th className="border-top-0">End date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateProducts.map(product => <ProductRaw key={product.product_id} product={product} />)}
                    </tbody>
                </table>

            </div>
            <div className="modal-footer d-block">
                <div className="float-left">                
                <Pagination
                    currentPage={pagination.currentPage}
                    itemsCount={products.length}
                    onPageChange={handlePaginationOnChange}
                    pageSize={pagination.pageSize}
                 />
                 </div>
                 <div>
                    <button 
                        type="button" 
                        className="btn btn-secondary float-right"
                        onClick={closeModal}
                    >
                        Close
                     </button>
                 </div>
            </div>
          </div>
        </div>
      </div>
     );;
};

export default ModalBusinessProducts;