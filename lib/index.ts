const brcode = require("../native");

export interface BrCodeJson {
    payload_version: number;
    merchant_account_information: string;
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
    postal_code: string;
    currency: string;
    amount: number;
    country_code: string;
    field_template: Array<{ reference_label: string }>;
    crc1610: string;
    templates: Array<{
        id: number;
        info: Array<{
            id: number;
            info: string;
        }>;
    }>;
}

export function jsonToBrcode(json: BrCodeJson): string {
  return brcode.jsonToBrcode(json);
}

export function brcodeToJson(code: string): BrCodeJson {
  return brcode.brcodeToJson(code);
}

export function crc16Ccitt(message: string): string {
  return brcode.crc16Ccitt(message);
}
