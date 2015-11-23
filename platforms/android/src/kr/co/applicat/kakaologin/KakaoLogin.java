package kr.co.applicat.kakaologin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;

public class KakaoLogin extends CordovaPlugin {

	CallbackContext command;

	/**
	 * Constructor.
	 */
	public KakaoLogin() {
	}

	/**
	 * Sets the context of the Command. This can then be used to do things like
	 * get file paths associated with the Activity.
	 *
	 * @param cordova
	 *            The context of the main Activity.
	 * @param webView
	 *            The CordovaWebView Cordova is running in.
	 */
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);

	}

	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext command) throws JSONException {

		this.command = command;

		if (action.equals("login")) {

			Context context = cordova.getActivity().getApplicationContext();

			Intent intent = new Intent(context, KakaoLoginActivity.class);
			this.cordova.startActivityForResult(this, intent, 234);

			return true;

		} else {
			return false;
		}
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent)
			throws NullPointerException {

		switch (requestCode) {
		case 234: // integer matching the integer suplied when starting the
			if (resultCode == android.app.Activity.RESULT_OK) {

				String result = intent.getStringExtra("token");

				System.out.println("this is result: " + intent);

				if (result != null) {
					this.command.success(result);
				} else {
					this.command.error("Error fetching token: requestCode = "
							+ requestCode + " resultCode = " + resultCode);
				}

			} else {
				// code launched in case of error
				// String message = intent.getStringExtra("result");
				this.command.error("error");
			}
			break;
		default:
			break;
		}
	}

}
