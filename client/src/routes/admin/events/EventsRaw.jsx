import React from 'react';

const values = ["name", "price"];

const dateString = date =>
{
    const d = new Date(date);
    const string = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${(d.getMinutes() === 0) && "00" || d.getMinutes()}`;
    return string;
};

const areChanged = event =>
{
    let b1 = true, b2 = false;
      values.forEach(value => 
    {
        const newValue = `${value}_new`;
        b1 = b1 && event[newValue] !== "";
        b2 = b2 || event[newValue] !== event[value];
        if(value === "price") b1 = b1 && (event[newValue] > 0);
    });
    return b1 && b2;
};



const EventRaw = ({ event, handleSaveEvent, handleDeleteEvent, handleValuesOnChange, handleClickOnDescription })=>
{

    return (<tr>
        <td>
        <input
              onChange={e =>{handleValuesOnChange(event, e)}}  
              name="name"
              type="text"
              className="form-control"
              value={event["name_new"]}
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
              <button onClick={()=>{handleClickOnDescription(event)}} className="btn btn-sm btn-info">
                  <span>Description</span>
              </button>
        </td>
        <td className="pt-2">
          <span>
            {dateString(event["start_date"])}
          </span>
        </td>
        <td className="pt-2">
            <span>
                {dateString(event["end_date"])}
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
                  value={event["price_new"]}              />
        </td>
        <td className="pt-2 text-center">
              <button 
                className="btn btn-sm btn-success"
                disabled={!areChanged(event)}
                onClick={()=>{handleSaveEvent(event)}}
              >
                  <span>Save</span>
              </button>
        </td>
        <td className="pt-2 text-center">
              <button onClick={()=>{handleDeleteEvent(event)}} className="btn btn-sm btn-danger">
                  <span>Remove</span>
              </button>
        </td>
    </tr>);
}

export default EventRaw;