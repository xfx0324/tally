package com.react_routes;

import com.facebook.react.ReactActivity;
//新加的
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // 启动页设置添加代码
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

      /**
      * 设置启动页
      */
     @Override
     protected void onCreate(Bundle savedInstanceState) {
         SplashScreen.show(this);  // 展示启动页设置代码
         super.onCreate(savedInstanceState);
     }
    @Override
    protected String getMainComponentName() {
        return "react_routes";
    }
}
