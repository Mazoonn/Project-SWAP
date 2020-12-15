import React from 'react';

const ProductRaw = (
    {
        product,
        index,
        handleOnChangeProduct,
        handleOnChangeIsActiveProducts,
        handleOnClickSaveProduct,
        isProductChanged,
        handleDeleteProduct
    }) =>
{
    return (<tr>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="name"
            type="text"
            className="form-control"
            value={product.name_new}
          />
        </td>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="description"
            type="text"
            className="form-control"
            value={product.description_new}
          />
        </td>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            className="form-control"
            value={product.price_new}
          />
        </td>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="discount"
            type="number"
            min="0.01"
            step="0.01"
            max="100"
            className="form-control"
            value={product.discount_new}
          />
        </td>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="discount_start_date"
            type="date"
            className="form-control"
            value={product.discount_start_date_new}
          />
        </td>
        <td>
          <input
            onChange={(event) => {
              handleOnChangeProduct(event, index);
            }}
            name="discount_end_date"
            type="date"
            className="form-control"
            value={product.discount_end_date_new}
          />
        </td>
        <td className="text-center">
          <div>
            <input
              onChange={() => {
                handleOnChangeIsActiveProducts(index);
              }}
              type="checkbox"
              checked={product.is_active_new}
            />
          </div>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => {
              handleOnClickSaveProduct(index);
            }}
            disabled={!isProductChanged(index)}
          >
            Save
          </button>
        </td>
        <td className="text-center">
          <button
            onClick={() => {
              handleDeleteProduct(index);
            }}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
};

export default ProductRaw;