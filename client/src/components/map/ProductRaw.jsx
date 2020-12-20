import React from 'react';

const calculateSalePrice = (price, discount) => Math.round((price*(1 - discount/100)*100))/100;

const zeroPrefixNumber = number =>
{
    if(number < 10 && number >= 0) return `0${number}`;
    return number;
};

const dateString = date =>
{
    const d = new Date(date);
    const string = `${zeroPrefixNumber(d.getDate())}/${zeroPrefixNumber(d.getMonth() + 1)}/${d.getFullYear()}`;
    return string;
};

const ProductRaw = ({ product }) =>
{
    const { name, price, discount, discount_end_date } = product;

    return (<tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>{calculateSalePrice(price, discount)}</td>
        <td>{dateString(discount_end_date)}</td>
    </tr>);
};

export default ProductRaw;