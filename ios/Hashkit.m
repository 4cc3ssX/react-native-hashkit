#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Hashkit, NSObject)

RCT_EXTERN_METHOD(hmacSHA256:(NSString)message withKey:(NSString)key
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(sha256:(NSString)data
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
