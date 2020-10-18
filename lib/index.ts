const brcode = require("../native");

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
    crc1610: string;
    templates?: Array<{
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

export function brcodeIsPix(code: String): boolean {
  return brcode.brcodeIsPix(code); 
}

export function jsonIsPix(json: BrCodeJson): boolean {
  return brcode.isPix(json); 
}

export function crc16Ccitt(message: string): string {
  return brcode.crc16Ccitt(message);
}

export function getJsonTransactionId(json: BrCodeJson): String {
  return brcode.getJsonTransactionId(json);
}

export function getBrcodeTransactionId(code: String): String {
  return brcode.getBrcodeTransactionId(code);
}

export function getJsonAliases(json: BrCodeJson): Array<String> {
  return brcode.getJsonAliases(json);
}

export function getBrcodeAliases(code: String): Array<String> {
  return brcode.getBrcodeAliases(code);
}

export function getJsonMessages(json: BrCodeJson): Array<String> {
  return brcode.getJsonMessages(json);
}

export function getBrcodeMessages(code: String): Array<String> {
  return brcode.getBrcodeMessages(code);
}

export function jsonToSvgString(json: BrCodeJson): String {
  return brcode.jsonToSvgString(json)
}

export function brcodeToSvgString(code: String): String {
  return brcode.brcodeToSvgString(code)
}