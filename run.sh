#!/bin/sh

ant debug && \
adb install -r bin/oi-debug.apk && \
adb logcat 'Cordova:V CordovaLog:V CordovaWebView:V DroidGap:V *:S'
