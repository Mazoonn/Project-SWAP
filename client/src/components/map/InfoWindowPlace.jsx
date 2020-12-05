import React from 'react';

const InfoWindowPlace = (
    {
    place, 
    isFinished, 
    handleSelectPlace, 
    removeChosenPlace, 
    indexPlaces,
    }) =>
{
    const {name, rating, user_ratings_total, vicinity, isChosen, chosenIndex } = place;

    return (<div>
          <span>{`Name: ${name}`}</span>
          <br />
          <span>{`Rating: ${rating}`}</span>
          <br />
          <span>{`Total user ratings: ${user_ratings_total}`}</span>
          <br />
          <span>{`Address: ${vicinity}`}</span>
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
                  onClick={() => {handleSelectPlace(indexPlaces)}}
                >
                  Select
                </button>
              )) || (
                <button
                  onClick={() => {
                    removeChosenPlace(chosenIndex);
                  }}
                  type="button"
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              ))}
          </div>
        </div>);
};

export default InfoWindowPlace;