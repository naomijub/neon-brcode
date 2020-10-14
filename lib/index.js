const brcode = require('../native');

const jsonToBrcode = (json) => brcode.jsonToBrcode(json);
const brcodeToJson = (code) => brcode.brcodeToJson(code);
const crc16Ccitt = (message) => brcode.crc16Ccitt(message);

module.exports =  {
    brcodeToJson, jsonToBrcode, crc16Ccitt
}