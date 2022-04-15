#!/usr/bin/env bash

if [ "$CURRENT_PLATFORM" == "android" ]; then
    java -version

    # Create a file from the keystore base64 string
    cd android/app
    echo "$UPLOAD_KEY_BASE_64" | base64 -d > "$UPLOAD_KEY_FILE"

    yarn instrumentDynatrace
fi
