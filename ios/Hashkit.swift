import CryptoSwift

@objc(Hashkit)
class Hashkit: NSObject {
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    @objc(hmacSHA256:withKey:withResolver:withRejecter:)
    func hmacSHA256(message: String, key: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        HMACHandler(message: message, key: key, variant: .sha2(SHA2.Variant.sha256), resolve: resolve, reject: reject)
    }
    @objc(sha256:withResolver:withRejecter:)
    func sha256(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha256()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
}

func HMACHandler(message: String, key: String, variant: HMAC.Variant, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    
        do {
            let hmac = try HMAC(key: key, variant: variant).authenticate(message.bytes)
            let hexString: String = uInt8ArrayToHex(data: hmac)
            resolve(hexString)
        } catch {
            let err = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_HMAC", "HMAC Generation Error", err)
        }
    }

func uInt8ArrayToHex(data: Array<UInt8>) -> String {
    var hexString: String = ""
    for byte in data {
        hexString.append(String(format:"%02X", byte))
    }
    return hexString;
}
