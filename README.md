# neon-brcode

Node wrapper of brcode to parse and emit [PIX BR Code](https://www.bcb.gov.br/content/estabilidadefinanceira/spb_docs/ManualBRCode.pdf).

## Usage

1. Install rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# or access https://rustup.rs/
```

2. Install [neon](https://neon-bindings.com/)
```
npm install --global neon-cli
# OR
yarn global add neon-cli
```

3. Install `neon-code`
```
npm install neon-brcode --save
```


**Parse**
```js
const brcode = require('neon-brcode');
const code = "00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490062190515RP12345678-201980390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304AD38";

brcode.brcodeToJson(code)
```

Output:

```json
{
    "payload_version":1,
    "initiation_method":null,
    "merchant_information":[
        {"id":26,"info":[
            {"id":0,"info":"BR.GOV.BCB.PIX"},
            {"id":1,"info":"123e4567-e12b-12d1-a456-426655440000"}
        ]},
        {"id":27,"info":[
            {"id":0,"info":"BR.COM.OUTRO"},
            {"id":1,"info":"0123456789"}
        ]}
    ],
    "merchant_category_code":0,
    "merchant_name":"NOME DO RECEBEDOR",
    "merchant_city":"BRASILIA",
    "postal_code":"70074900",
    "currency":"986",
    "amount":123.45,
    "country_code":"BR",
    "field_template":[{"reference_label":"RP12345678-2019"}],
    "crc1610":"AD38",
    "templates":[
        {"id":80,"info":[
            {"id":0,"info":"BR.COM.OUTRO"},
            {"id":1,"info":"0123.ABCD.3456.WXYZ"}
        ]}
    ]
}
```

**Emit**
```js
const brcode = require('neon-brcode');
const json = {
    "payload_version":1,
    "initiation_method":null,
    "merchant_information":[
        {"id":26,"info":[
            {"id":0,"info":"BR.GOV.BCB.PIX"},
            {"id":1,"info":"123e4567-e12b-12d1-a456-426655440000"}
        ]},
        {"id":27,"info":[
            {"id":0,"info":"BR.COM.OUTRO"},
            {"id":1,"info":"0123456789"}
        ]}
    ],
    "merchant_category_code":0,
    "merchant_name":"NOME DO RECEBEDOR",
    "merchant_city":"BRASILIA",
    "postal_code":"70074900",
    "currency":"986",
    "amount":123.45,
    "country_code":"BR",
    "field_template":[{"reference_label":"RP12345678-2019"}],
    "crc1610":"AD38",
    "templates":[
        {"id":80,"info":[
            {"id":0,"info":"BR.COM.OUTRO"},
            {"id":1,"info":"0123.ABCD.3456.WXYZ"}
        ]}
    ]
};

brcode.jsonToBrcode(json)
```

Output:

```json
"00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490062190515RP12345678-201980390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304AD38"
```

**crc16Ccitt**
```js
const brcode = require('neon-brcode');
const unchecked_code = "00020104141234567890123426580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-42665544000027300012BR.COM.OUTRO011001234567895204000053039865406123.455802BR5917NOME DO RECEBEDOR6008BRASILIA61087007490062190515RP12345678-201980390012BR.COM.OUTRO01190123.ABCD.3456.WXYZ6304";

brcode.crc16Ccitt(unchecked_code)
// "AD38"
```
