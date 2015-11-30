# Applicat OAuth - SSO Native Cordova implementation

## Current implementation status

Kakao Android

## Future implementation plan

Kakao IOS
Facebook Android
Facebook IOS
Google Android
Google IOS

## Using
Add plugin

    $ cordova plugin add  https://zxshinxz@bitbucket.org/zxshinxz/kakaologin.git

* Add kakao_app_key in kakao_strings.xml.



#IOS

## General - Linked Framework and Libraries
QuartzCore.framework

## Project prop build setting
현재 작업중인 프로트에서 Other Linker Flags에 "-all_load" 를 추가합니다.

## Project prop info
카카오계정을 통해 인증을 받고 자신의 앱 실행을 위해서 아래 사진과 같이 URL Types 항목을 추가해야 합니다. URL Schemes에는 KAKAO_APP_KEY 앞에 "kakao" 문자열을 붙여서 등록합니다.

## plist에 추가
	<key>KAKAO_APP_KEY</key>
	<string>e557f595191ec148bc574cc08c67d716</string>
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSExceptionDomains</key>
        <dict>
            <key>kakao.co.kr</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <false/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
            <key>kakao.com</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <false/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
            <key>kakaocdn.net</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <false/>
                <key>NSIncludesSubdomains</key>
                <true/>
            </dict>
        </dict>
    </dict>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>kakao0123456789abcdefghijklmn</string>
        <string>kakaokompassauth</string>
        <string>storykompassauth</string>
        <string>kakaolink</string>
        <string>kakaotalk-4.5.0</string>
        <string>kakaostory-2.9.0</string>
    </array>