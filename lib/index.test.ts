import * as brcode from './index';

const code = "00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490062190515RP12345678-201980390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304AD38";
const unchecked_code = "00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490062190515RP12345678-201980390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304";
const json: brcode.BrCodeJson = {
    payload_version:1,
    merchant_account_information: "12345678901234",
    merchant_information:[
        {id:26,info:[
            {id:0,info:"BR.GOV.BCB.PIX"},
            {id:1,info:"123e4567-e12b-12d1-a456-426655440000"}
        ]},
        {id:27,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123456789"}
        ]}
    ],
    merchant_category_code:0,
    merchant_name:"NOME DO RECEBEDOR",
    merchant_city:"BRASILIA",
    postal_code:"70074900",
    currency:"986",
    amount:123.45,
    country_code:"BR",
    field_template:[{reference_label:"RP12345678-2019"}],
    crc1610:"AD38",
    templates:[
        {id:80,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123.ABCD.3456.WXYZ"}
        ]}
    ]
};

const notBrcodeJson: brcode.BrCodeJson = {
    payload_version:1,
    merchant_account_information: "12345678901234",
    merchant_information:[
        {id:26,info:[
            {id:0,info:"BR.USA.FR.FIX"},
            {id:1,info:"123e4567-e12b-12d1-a456-426655440000"}
        ]},
        {id:27,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123456789"}
        ]}
    ],
    merchant_category_code:0,
    merchant_name:"NOME DO RECEBEDOR",
    merchant_city:"BRASILIA",
    postal_code:"70074900",
    currency:"986",
    amount:123.45,
    country_code:"BR",
    field_template:[{reference_label:"RP12345678-2019"}],
    crc1610:"AD38",
    templates:[
        {id:80,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123.ABCD.3456.WXYZ"}
        ]}
    ]
};

const jsonWithMessage: brcode.BrCodeJson = {
    payload_version:1,
    merchant_account_information: "12345678901234",
    merchant_information:[
        {id:26,info:[
            {id:0,info:"BR.GOV.BCB.PIX"},
            {id:1,info:"123e4567-e12b-12d1-a456-426655440000"},
            {id:2,info:"This is a message"}
        ]},
        {id:27,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123456789"}
        ]},
        {id:28,info:[
            {id:0,info:"BR.GOV.BCB.PIX"},
            {id:1,info:"555199998877"},
            {id:2,info:"This is another message"}
        ]},
    ],
    merchant_category_code:0,
    merchant_name:"NOME DO RECEBEDOR",
    merchant_city:"BRASILIA",
    postal_code:"70074900",
    currency:"986",
    amount:123.45,
    country_code:"BR",
    field_template:[{reference_label:"RP12345678-2019"}],
    crc1610:"AD38",
    templates:[
        {id:80,info:[
            {id:0,info:"BR.COM.OUTRO"},
            {id:1,info:"0123.ABCD.3456.WXYZ"}
        ]}
    ]
};

test('Parses and Emit BR Codes', () => {
    expect(brcode.brcodeToJson(code)).toEqual(json);
    expect(brcode.jsonToBrcode(json)).toEqual(code);
});

test('Crc16 CCITT', () => {
    expect(brcode.crc16Ccitt("biscuit")).toEqual("B8CE");
    expect(brcode.crc16Ccitt(unchecked_code)).toEqual("AD38");
});

test('Code and json are pix', () => {
    expect(brcode.brcodeIsPix(code)).toBeTruthy();
    expect(brcode.jsonIsPix(json)).toBeTruthy();
    expect(brcode.jsonIsPix(notBrcodeJson)).toBeFalsy();
});

test('Get code and json transaction id', () => {
    expect(brcode.getBrcodeTransactionId(code)).toEqual("RP12345678-2019");
    expect(brcode.getJsonTransactionId(json)).toEqual("RP12345678-2019");
});

test('Get pix code and json aliases', () => {
    expect(brcode.getBrcodeAliases(code)).toEqual(["123e4567-e12b-12d1-a456-426655440000"]);
    expect(brcode.getJsonAliases(json)).toEqual(["123e4567-e12b-12d1-a456-426655440000"]);
    expect(brcode.getJsonAliases(jsonWithMessage)).toEqual(["123e4567-e12b-12d1-a456-426655440000", "555199998877"]);
});

test('Get pix code and json messages', () => {
    expect(brcode.getBrcodeMessages(code)).toEqual([]);
    expect(brcode.getJsonMessages(jsonWithMessage)).toEqual(["This is a message","This is another message"]);
});

test('Can generate svg', () => {
    expect(brcode.jsonToSvgString(json)).toContain('<svg');
});