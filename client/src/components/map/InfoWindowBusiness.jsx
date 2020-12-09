import React from 'react';

const InfoWindowBusiness = (
  {
    business,
    addressString,
    handleSelectBusiness,
    removeChosenPlace,
    index,
    openModal
    }
) =>
{
  const { 
    name, 
    description, 
    opening_hours, 
    closing_hours, 
    street, 
    street_number, 
    settlement,
    isFinished,
    isChosen,
    chosenIndex,
   } = business 

  return(<div>
          <h4>Business</h4>
          <span>{`Name: ${name}`}</span>
          <br />
          <span>{`Description: ${description}`}</span>
          <br />
          <span>{`Address: ${addressString({
            settlement: settlement,
            street: street,
            street_number: street_number
             })}`}
          </span>
          <br />
          <span>{`Opening Hour: ${opening_hours}`}</span>
          <br />
          <span>{`Closing Hour: ${closing_hours}`}</span>
          <br />
          <br />
          <div className="text-center">
            {!isFinished &&
              ((!(isChosen !== undefined
                ? isChosen
                : false) && (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => {handleSelectBusiness(index)}}
                >
                  Select
                </button>
              )) || (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    removeChosenPlace(chosenIndex);
                  }}
                >
                  Remove
                </button>
              ))}
              <button hidden={business.products.length === 0} onClick={()=>{openModal(business)}} className="btn btn-sm btn-primary ml-2">Products</button>
          </div>
        </div>);
};

export default InfoWindowBusiness;