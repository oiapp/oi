#!/bin/sh

ant debug && \
adb install bin/oi-debug.apk && \
adb logcat
