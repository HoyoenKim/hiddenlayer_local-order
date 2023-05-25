package hiddenlayer.localorder;

import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onBackPressed() {
    WebView webView = getBridge().getWebView();

    if(webView.canGoBack()){
      webView.goBack();
    } else {
      finish();
    }
    return;
  }
}
