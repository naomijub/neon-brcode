use neon::prelude::*;
use brcode::{BrCode, str_to_brcode, crc16_ccitt};
use neon_serde::export;

export! {
    fn jsonToBrcode(json: BrCode) -> String {
        json.to_string()
    }

    fn brcodeToJson(brcode: String) -> BrCode {
        str_to_brcode(&brcode)
    }

    fn crc16Ccitt(code: String) -> String {
        crc16_ccitt(&code)
    }
}
