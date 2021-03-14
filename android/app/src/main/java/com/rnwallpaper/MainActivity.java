package com.rnwallpaper;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.os.Bundle; // <-- Splash Screen
import com.zoontek.rnbootsplash.RNBootSplash; // <-- Splash Screen
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
          RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <-- Splash Screen
  }
  
  @Override
  protected String getMainComponentName() {
    return "RNWallpaper";
  }
}
