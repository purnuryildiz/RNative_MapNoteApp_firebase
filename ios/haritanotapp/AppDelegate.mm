#import "AppDelegate.h"
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Info.plist dosyasından Google Maps API Anahtarını alıyoruz
  NSString *googleMapsAPIKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GoogleMapsAPIKey"];
  
  // Google Maps API'yi sağlıyoruz
  [GMSServices provideAPIKey:googleMapsAPIKey];
  
  // Firebase yapılandırmasını başlatıyoruz
  [FIRApp configure];
  
  // React Native ViewController için gerekli başlangıç parametreleri
  self.moduleName = @"haritanotapp";
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
