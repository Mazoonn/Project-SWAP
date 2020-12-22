import React from 'react';


//new product raw
const NewProductRaw = (
    {
        product,
        handleOnChangeProduct,
        length,
        isNotValidProduct,
        handleAddNewProduct
    }) =>
{
    return (<tr>
                        <td>
                          <input
                            value={product.name || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            placeholder="Name"
                            name="name"
                            type="text"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={product.description || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            placeholder="Description"
                            name="description"
                            type="text"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={product.price || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            name="price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="$"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={product.discount || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            placeholder="Discount"
                            name="discount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            max="100"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={product.discount_start_date || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            name="discount_start_date"
                            type="date"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={product.discount_end_date || ""}
                            onChange={(event) => {
                              handleOnChangeProduct(event, length);
                            }}
                            name="discount_end_date"
                            type="date"
                            className="form-control"
                          />
                        </td>
                        <td className="text-center">
                          <div>
                            <input
                              onChange={(event) => {
                                handleOnChangeProduct(event, length);
                              }}
                              type="checkbox"
                              checked={product.is_active || false}
                              name="is_active"
                            />
                          </div>
                        </td>
                        <td colSpan={2} className="text-center">
                          <button
                            disabled={isNotValidProduct()}
                            onClick={handleAddNewProduct}
                            type="button"
                            className="btn btn-primary btn-sm"
                          >
                            Add
                          </button>
                        </td>
                      </tr>);
};

export default NewProductRaw;