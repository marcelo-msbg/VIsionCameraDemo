import { Text, VStack } from "native-base";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Camera, Frame, runAtTargetFps, useCameraDevice, useCameraFormat, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";

//Define the format for the Camera. We are using 800 x 600, that is more than enough for what we will be doing.
const imageWidth = 800;
const imageHeight = 600;

export default function CameraTest() {
    const { hasPermission, requestPermission } = useCameraPermission(); //Hook that handles the permission

    const device = useCameraDevice('back') //Hook that instantiates the camera device. We will be using 

    //Used to define Camera Format, to be provided to <Camera /> component
    const format = useCameraFormat(device, [
      { videoResolution: { width: imageWidth, height: imageHeight } },
      { fps: 15 }
    ])

    //Use effect will check everytime if our app ha sthe right permission.
    useEffect(() => {
        console.log("Permission is: " + hasPermission);
        if(!hasPermission) requestPermission();
      }, [hasPermission]);


    //This is the frame processor. 
    const frameProcessor = useFrameProcessor((frame:Frame) => {
      'worklet'
  
      if(frame == null) return; //If frame is null, nothing to do here.
      if (frame.pixelFormat != 'yuv') return; //If the pixel format is not yuv, the rest will not work. 
          
      //As we will not need to process every frame, let's by now just run it at 2 fps. Worklets make this configuration easier for us.
      runAtTargetFps(2, () => {
        'worklet'
        console.log(`Frame data is: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
      })
    }, []);
    
  return (
    <VStack //Simple VStack from NativeBase
      w="100%"
      h="100%"
      flex={1}
      flexBasis={'auto'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      
      overflow={'hidden'}>
{
              device != null ?
              <Camera
                style={styles.camera}
                device={device}
                frameProcessor={frameProcessor} //Linking the Frame Processor to the Camera component.
                isActive={true}
                video={true}
                audio={false}
                format={format} //This is a MUST. Otherwise, it won't work.
                pixelFormat={'yuv'} // On Android, only YUV and NATIVE (PRIVATE) are supported, as RGB requires explicit conversion.
              />
            :
            <Text
                fontSize={15}
                pb={2}
                w={"100%"}
                color="coolGray.800"
                style={{textAlign: 'justify'}}>
                {`Not loaded yet`}
            </Text>
          }
    </VStack>
  );
}

//Stylesheet for the Camera component
const styles = StyleSheet.create({
    camera: {
      height: '50%',
      width: '100%',
    },
  });
