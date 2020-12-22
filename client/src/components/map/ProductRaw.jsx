import React from 'react';

//calculate price after discount
const calculateSalePrice = (price, discount) => Math.ceil((price*(1 - discount/100)*100))/100;


//add zero prefix to number between 0 to 9
const zeroPrefixNumber = number =>
{
    if(number < 10 && number >= 0) return `0${number}`;
    return number;
};

//date formated string
const dateString = date =>
{
    const d = new Date(date);
    const string = `${zeroPrefixNumber(d.getDate())}/${zeroPrefixNumber(d.getMonth() + 1)}/${d.getFullYear()}`;
    return string;
};

//product raw
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