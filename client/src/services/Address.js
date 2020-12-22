//Get address object from google place (Google Maps Places API)
//Return: formated address object

const getAddress = place =>
{
    const componentForm = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      };
    const addressForm =
    {
        street_number: "street_number",
        country: "country",
        postal_code: "post_code",
        locality: "settlement",
        administrative_area_level_1: "state",
        route: "street"
    };
    const newPlace = {};

    for (const component of place.address_components) 
    {
        const addressType = component.types[0];

    if (componentForm[addressType]) 
     newPlace[addressForm[addressType]] = component[componentForm[addressType]];
    }

     return newPlace;
};

export default getAddress;