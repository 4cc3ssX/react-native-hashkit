import CryptoSwift

@objc(Hashkit)
class Hashkit: NSObject {
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    @objc(md5:withResolver:withRejecter:)
    func md5(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.md5()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(sha1:withResolver:withRejecter:)
    func sha1(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha1()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(sha224:withResolver:withRejecter:)
    func sha224(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha224()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(sha256:withResolver:withRejecter:)
    func sha256(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha256()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(sha384:withResolver:withRejecter:)
    func sha384(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha384()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(sha512:withResolver:withRejecter:)
    func sha512(data: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        let hash = data.bytes.sha512()
        let hexString: String = uInt8ArrayToHex(data: hash)
        resolve(hexString)
    }
    @objc(hmacSHA256:withKey:withResolver:withRejecter:)
    func hmacSHA256(message: String, key: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
        HMACHandler(message: message, key: key, variant: .sha2(SHA2.Variant.sha256), resolve: resolve, reject: reject)
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
