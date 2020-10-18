use neon::prelude::*;
use brcode::{BrCode, str_to_brcode, crc16_ccitt};
use neon_serde::export;

export! {
    fn jsonToBrcode(json: BrCode) -> String {
        json.to_string()
    }

    fn isPix(json: BrCode) -> bool {
        json.is_pix()
    }

    fn brcodeIsPix(brcode: String) -> bool {
        str_to_brcode(&brcode).is_pix()
    }

    fn brcodeToJson(brcode: String) -> BrCode {
        str_to_brcode(&brcode)
    }

    fn crc16Ccitt(code: String) -> String {
        crc16_ccitt(&code)
    }

    fn getJsonTransactionId(json: BrCode) -> String {
        json.get_transaction_id().unwrap_or(String::new())
    }

    fn getBrcodeTransactionId(brcode: String) -> String {
        str_to_brcode(&brcode).get_transaction_id().unwrap_or(String::new())
    }

    fn getJsonAliases(json: BrCode) -> Vec<String> {
        json.get_alias().unwrap_or(Vec::new())
    }

    fn getBrcodeAliases(brcode: String) -> Vec<String> {
        str_to_brcode(&brcode).get_alias().unwrap_or(Vec::new())
    }

    fn getJsonMessages(json: BrCode) -> Vec<String> {
        json.get_message().unwrap_or(Vec::new())
    }

    fn getBrcodeMessages(brcode: String) -> Vec<String> {
        str_to_brcode(&brcode).get_message().unwrap_or(Vec::new())
    }

    fn jsonToSvgString(json: BrCode) -> String {
        json.to_svg_standard_string()
    }

    fn brcodeToSvgString(brcode: String) -> String {
        str_to_brcode(&brcode).to_svg_standard_string()
    }

    fn jsonToSvgFile(json: BrCode, path: String) -> () {
        if path.ends_with(".svg") {
            json.to_standard_svg_file(&path);
        } else {
            println!("Path should end with .svg");
        }
    }

    fn brcodeToSvgFile(brcode: String, path: String) -> () {
        if path.ends_with(".svg") {
            str_to_brcode(&brcode).to_standard_svg_file(&path);
        } else {
            println!("Path should end with .svg");
        }
    }
}
