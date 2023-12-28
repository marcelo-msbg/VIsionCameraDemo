#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>
#import <VisionCamera/Frame.h>

@interface OpenCVDemoIOSPlugin : FrameProcessorPlugin
@end

@implementation OpenCVDemoIOSPlugin

- (instancetype _Nonnull)initWithOptions:(NSDictionary* _Nullable)options
{
  self = [super initWithOptions:options];
  return self;
}

- (id _Nullable)callback:(Frame* _Nonnull)frame withArguments:(NSDictionary* _Nullable)arguments {
  CMSampleBufferRef buffer = frame.buffer;
  UIImageOrientation orientation = frame.orientation;
  
  CMFormatDescriptionRef formatDescription = CMSampleBufferGetFormatDescription(buffer);
      
  if (formatDescription == NULL) {
      NSLog(@"Error: Format description is NULL");
      return @"Buffer error";
  }
  
  // Retrieve video dimensions from the format description
  CMVideoDimensions dimensions = CMVideoFormatDescriptionGetDimensions(formatDescription);
  
  // Print the height and width
  NSLog(@"Width: %d, Height: %d", dimensions.width, dimensions.height);
  
  // code goes here
  return @"Running on iOS";
}

VISION_EXPORT_FRAME_PROCESSOR(OpenCVDemoIOSPlugin, iosPlugin)

@end
