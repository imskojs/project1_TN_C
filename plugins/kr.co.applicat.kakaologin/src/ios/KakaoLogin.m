#import "KakaoLogin.h"
#import <KakaoOpenSDK/KakaoOpenSDK.h>
#import <Cordova/CDV.h>
#import <UIKit/UIKit.h>
#import "AppDelegate.h"


@implementation KakaoLogin

static id <CDVCommandDelegate> commandDelegate = nil;
+ (id <CDVCommandDelegate>) commandDelegate {return commandDelegate;}
+ (void)setCommandDelegate:(id <CDVCommandDelegate>)del {commandDelegate = del;}

static NSString* loginCallbackId = nil;
+ (NSString*) loginCallbackId {return loginCallbackId;}
+ (void)setLoginCallbackId:(NSString *)cb {loginCallbackId = cb;}


#ifndef __IPHONE_3_0
@synthesize webView;
#endif


-(CDVPlugin*) initWithWebView:(UIWebView*)theWebView
{
    self = (KakaoLogin*)[super initWithWebView:theWebView];
    return self;
}


- (void)login:(CDVInvokedUrlCommand*)command
{
    
    [KakaoLogin setLoginCallbackId:command.callbackId];
    [KakaoLogin setCommandDelegate:self.commandDelegate];
    
    KOSession *session = [KOSession sharedSession];
    
    [session close];
    
    
    session.presentingViewController = self.viewController;
    [session openWithCompletionHandler:^(NSError *error) {
        session.presentingViewController = nil;
        
        KOSession *session = [KOSession sharedSession];
        
        if ([session isOpen]) {
            // login success
            NSLog(@"login succeeded. %@", session.accessToken);
            
            //                [KakaoLogin sessionStateChanged:session];
            
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: session.accessToken];
            [[KakaoLogin commandDelegate] sendPluginResult:pluginResult callbackId:[KakaoLogin loginCallbackId]];
            
            
        } else {
            // failed
            NSLog(@"login failed.");
        }
        
    }];
    
    
    
    
    
    
    
    
    
}


@end