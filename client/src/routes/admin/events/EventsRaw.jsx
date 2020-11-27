import React from 'react';

const values = ["name", "price"];

const areChanged = event =>
{
    let result = true;
      values.forEach(value => 
    {
        const newValue = `${value}_new`;
        if(value === "price") result = result && (event[newValue] > 0);
        result = result && event[newValue] && (event[value] !== event[newValue])
    });
    return result;
};



const EventRaw = ({ event, handleValuesOnChange })=>
{

    return (<tr>
        <td>
        <input
              onChange={e =>{handleValuesOnChange(event, e)}}  
              name="name"
              type="text"
              className="form-control"
              value={event["name_new"] !== undefined ? event["name_new"] : event["name"]}
          />
        </td>
        <td className="pt-2">
            {event["country"]}
        </td>
        <td className="pt-2">
            {event["settlement"]}
        </td>
        <td className="pt-2">
        {`${event["street"]} ${event["street_number"]}`}
        </td>      
        <td className="pt-2 text-center">
              <button className="btn btn-sm btn-info">
                  <span>Description</span>
              </button>
        </td>
        <td className="pt-2">
          <span>
            {event["start_date"]}
          </span>
        </td>
        <td className="pt-2">
            <span>
                {event["end_date"]}
            </span>
        </td>
        <td>
              <input
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="$"
                  required
                  className="form-control"
                  onChange={e=>{handleValuesOnChange(event, e)}}
                  value={event["price_new"] !== undefined ? event["price_new"] : event["price"]}              />
        </td>
        <td className="pt-2 text-center">
              <button 
                className="btn btn-sm btn-success"
                disabled={!areChanged(event)}
              >
                  <span>Save</span>
              </button>
        </td>
        <td className="pt-2 text-center">
              <button className="btn btn-sm btn-danger">
                  <span>Remove</span>
              </button>
        </td>
    </tr>);
}

export default EventRaw;