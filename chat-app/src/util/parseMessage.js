
const parseMessage = (message) =>{
    const temp = message.split("<br>");
    return temp[0];
}

export default parseMessage;