export const zeroPrefixNumber = number =>
{
    if(number < 10 && number >= 0) return `0${number}`;
    return number;
};

export const dateString = date =>
{
    const d = new Date(date);
    const string = `${zeroPrefixNumber(d.getDate())}/${zeroPrefixNumber(d.getMonth() + 1)}/${d.getFullYear()}`;
    return string;
};