import React from 'react';

//Info window of event
const InfoWindowEvent = ({
    event,
    dateString,
    addressString,
    isFinished,
    handleSelectEvent,
    removeChosenPlace,
    index,
}) =>
{
    const { 
        name, 
        description, 
        price, 
        start_date, 
        end_date,
        settlement,
        street,
        street_number,
        isChosen,
        chosenIndex
        } = event;

    return (<div>
          <h4>Event</h4>
          <span>{`Name: ${name}`}</span>
          <br />
          <span>{`Description: ${description}`}</span>
          <br />
          <span>{`Price: ${price} $`}</span>
          <br />
          <span>{`Start Date: ${dateString(start_date)}`}</span>
          <br />
          <span>{`End Date: ${dateString(end_date)}`}</span>
          <br />
          <span>{`Address: ${addressString({
            settlement: settlement,
            street: street,
            street_number: street_number
             })}`}</span>
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
                  onClick={() => {handleSelectEvent(index)}}
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
          </div>
        </div>); 
};

export default InfoWindowEvent;