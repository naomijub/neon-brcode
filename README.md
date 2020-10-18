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

### Types and functions:

```ts

export interface BrCodeJson {
    payload_version: number;
    initiation_method?: number;
    merchant_account_information?: string;
    merchant_information: Array<{
        id: number;
        info: Array<{
            id: number;
            info: string;
        }>;
    }>;
    merchant_category_code: number;
    merchant_name: string;
    merchant_city: string;
    postal_code?: string;
    convenience?: String;
    convenience_fee_fixed?: String;
    convenience_fee_percentage?: String;
    currency: string;
    amount?: number;
    country_code: string;
    field_template: Array<{ reference_label: string }>;
    crc1610?: string;
    templates?: Array<{
        id: number;
        info: Array<{
            id: number;
            info: string;
        }>;
    }>;
}

function jsonToBrcode(json: BrCodeJson): string
function brcodeToJson(code: string): BrCodeJson
function brcodeIsPix(code: String): boolean 
function jsonIsPix(json: BrCodeJson): boolean
function crc16Ccitt(message: string): string
function getJsonTransactionId(json: BrCodeJson): String
function getBrcodeTransactionId(code: String): String
function getJsonAliases(json: BrCodeJson): Array<String> 
function getBrcodeAliases(code: String): Array<String> 
function getJsonMessages(json: BrCodeJson): Array<String>
function getBrcodeMessages(code: String): Array<String> 
function jsonToSvgFile(json: BrCodeJson, path: String) 
function brcodeToSvgFile(code: String, path: String)
function jsonToSvgString(json: BrCodeJson): String
function brcodeToSvgString(code: String): String 
```

### Functions descriptions:
* `jsonToBrcode(json: BrCodeJson): string`: converts a `BrCodeJson` into a BR Code String.
* `brcodeToJson(code: string): BrCodeJson`: converts a BR Code String into a `BrCodeJson`.
* `brcodeIsPix(code: String): boolean`: checks if BR Code String is of type Pix.
* `jsonIsPix(json: BrCodeJson): boolean`: checks if `BrCodeJson` is of type Pix.
* `crc16Ccitt(message: string): string`: generates a CRC16_CCITT for the inserted information.
* `getJsonTransactionId(json: BrCodeJson): String`: returns the `transactionId` of a `BrCodeJson`.
* `getBrcodeTransactionId(code: String): String`: returns the `transactionId` of a BR Code String.
* `getJsonAliases(json: BrCodeJson): Array<String>`: returns all Pix aliases of a `BrCodeJson`.
* `getBrcodeAliases(code: String): Array<String>`: returns all Pix aliases of a BR Code String.
* `getJsonMessages(json: BrCodeJson): Array<String>`: returns all Pix messages of a `BrCodeJson`.
* `getBrcodeMessages(code: String): Array<String>`: returns all Pix messages of a BR Code String.
* `jsonToSvgFile(json: BrCodeJson, path: String)`: generates a SVG file at path (must end with `.svg`) for `BrCodeJson`.
* `brcodeToSvgFile(code: String, path: String)`: generates a SVG file at path (must end with `.svg`) for BR Code String.
* `jsonToSvgString(json: BrCodeJson): String`: generates a SVG string for `BrCodeJson`.
* `brcodeToSvgString(code: String): String`: generates a SVG string for BR Code String.


### Example usage
* Test file has more usages.

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
