# FlySafe

### Tools

- Online Tone Generator: https://www.szynalski.com/tone-generator/
  - https://marcgg.com/blog/2016/11/01/javascript-audio/
- File generator: https://testfiledownload.com/
- Bluefi Browser
- P5 Ble JS
- Platform IO
- Tailwind CSS
- Speech Synthesis API
- Local session storage
  - Limit: 5MB and only strings, which is about 5x10^6 characters.
  - Save on window close: unreliable, so j do it every 10 seconds?
- Icon generator: https://emoji.aranja.com/
- SVG Icon picker: https://www.svgrepo.com/
- SVG decomposition: https://svg-path-visualizer.netlify.app
- Chart.js: https://cdn.jsdelivr.net/npm/chart.js

- CERTS
  - https://community.arubanetworks.com/discussion/ios-not-verified-for-trusted-certificate
  - https://www.sslshopper.com/certificate-decoder.html
  - https://github.com/espressif/esp-idf/tree/master/examples/protocols/https_server/wss_server
    - openssl req -newkey rsa:2048 -nodes -keyout prvtkey.pem -x509 -days 3650 -out cacert.pem -subj "/CN=ESP32 HTTPS server example"

### Choices

- Synth > wav
- Plain HTML > react
- Wifi > BLE
- Local storage > runtime storage
- PWA > web > app

### Misc

https://docs.google.com/presentation/d/1E1LffRRFPVq6fAH2K6y-tBhzp-HUobneNcVZ-FFkUps/edit?usp=sharing
