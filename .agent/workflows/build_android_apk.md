---
description: Build an Android APK using EAS
---

1. Install EAS CLI globally if not already installed
```powershell
npm install -g eas-cli
```
// turbo
2. Login to your Expo account
```powershell
eas login
```
// turbo
3. Configure the project for EAS Build
```powershell
eas build:configure
```

4. Update `eas.json` to include an APK profile
   - Add the following to your `eas.json` under `build`:
   ```json
   "preview": {
     "android": {
       "buildType": "apk"
     }
   }
   ```

5. Run the build command
```powershell
eas build -p android --profile preview
```
