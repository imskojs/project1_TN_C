/**
 * Copyright 2014 Daum Kakao Corp.
 *
 * Redistribution and modification in source or binary forms are not permitted without specific prior written permission. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.co.applicat.kakaologin;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.kakao.auth.ApprovalType;
import com.kakao.auth.AuthType;
import com.kakao.auth.IApplicationConfig;
import com.kakao.auth.ISessionCallback;
import com.kakao.auth.ISessionConfig;
import com.kakao.auth.KakaoAdapter;
import com.kakao.auth.KakaoSDK;
import com.kakao.auth.Session;
import com.kakao.util.exception.KakaoException;
import com.kakao.util.helper.log.Logger;

/**
 * 샘플에서 사용하게 될 로그인 페이지 세션을 오픈한 후 action을 override해서 사용한다.
 *
 * @author MJ
 */
public class KakaoLoginActivity extends Activity {
	private SessionCallback callback;

	/**
	 * 로그인 버튼을 클릭 했을시 access token을 요청하도록 설정한다.
	 *
	 * @param savedInstanceState
	 *            기존 session 정보가 저장된 객체
	 */
	@Override
	protected void onCreate(final Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		if (KakaoSDK.getAdapter() == null)
			KakaoSDK.init(new KakaoSDKAdapter(this));

		callback = new SessionCallback();
		Session.getCurrentSession().addCallback(callback);
		Session.getCurrentSession().checkAndImplicitOpen();
		Session.getCurrentSession().open(AuthType.KAKAO_TALK, this);

	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent)
			throws NullPointerException {

		Session session = Session.getCurrentSession();
		System.out.println("this is token: " + session.getAccessToken());

		if (Session.getCurrentSession().handleActivityResult(requestCode,
				resultCode, intent)) {
			return;
		}

		super.onActivityResult(requestCode, resultCode, intent);

	}

	private class SessionCallback implements ISessionCallback {

		@Override
		public void onSessionOpened() {
			Session session = Session.getCurrentSession();
			System.out.println("this is token: " + session.getAccessToken());

			Intent data = new Intent();
			data.putExtra("token", session.getAccessToken());

			if (getParent() == null) {
				setResult(Activity.RESULT_OK, data);
			} else {
				getParent().setResult(Activity.RESULT_OK, data);
			}

			finish();

		}

		@Override
		public void onSessionOpenFailed(KakaoException exception) {
			if (exception != null) {
				Logger.e(exception);
			}
		}
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
	}

	@Override
	protected void onResume() {
		super.onResume();
	}

	@Override
	protected void onPause() {
		super.onPause();
	}

	private class KakaoSDKAdapter extends KakaoAdapter {

		private Context context;

		public KakaoSDKAdapter(Context context) {
			this.context = context;
		}

		/**
		 * Session Config에 대해서는 default값들이 존재한다. 필요한 상황에서만 override해서 사용하면 됨.
		 * 
		 * @return Session의 설정값.
		 */
		@Override
		public ISessionConfig getSessionConfig() {
			return new ISessionConfig() {
				@Override
				public AuthType[] getAuthTypes() {
					return new AuthType[] { AuthType.KAKAO_LOGIN_ALL };
				}

				@Override
				public boolean isUsingWebviewTimer() {
					return false;
				}

				@Override
				public ApprovalType getApprovalType() {
					return ApprovalType.INDIVIDUAL;
				}

				@Override
				public boolean isSaveFormData() {
					return true;
				}
			};
		}

		@Override
		public IApplicationConfig getApplicationConfig() {
			return new IApplicationConfig() {
				@Override
				public Activity getTopActivity() {
					return (Activity) context;
				}

				@Override
				public Context getApplicationContext() {
					return context;
				}
			};
		}

	}
}
