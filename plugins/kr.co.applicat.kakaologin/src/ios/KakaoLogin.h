#import <Cordova/CDV.h>
#import <KakaoOpenSDK/KakaoOpenSDK.h>
#import <UIKit/UIKit.h>

@interface KakaoLogin : CDVPlugin

- (void) login:(CDVInvokedUrlCommand*)command;

//+ (void)sessionStateChanged:(KOSession *)session;


+ (NSString*) loginCallbackId;
+ (void)setLoginCallbackId:(NSString *)cb;

+ (id <CDVCommandDelegate>) commandDelegate;
+ (void)setCommandDelegate:(id <CDVCommandDelegate>)del;

@end