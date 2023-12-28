package com.visioncamerademo.opencvdemoandroidplugin;

import android.media.Image;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import java.util.Map;


public class OpenCVDemoAndroidPlugin extends FrameProcessorPlugin {

  String TAG = "OpenCVDemoPlugin"; //Tag used for Logging

  //OpenCVDemoAndroidPlugin constructor
  public OpenCVDemoAndroidPlugin(@Nullable Map<String, Object> options) {
    super(options);
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    Log.d("FrameProcessor", "We are green");
    Image image = frame.getImage();
    Log.d("FrameProcessor", "Image dimensions:");
    Log.d("FrameProcessor", String.valueOf(image.getWidth()));
    Log.d("FrameProcessor", String.valueOf(image.getHeight()));

    return "Running!";
  }
}