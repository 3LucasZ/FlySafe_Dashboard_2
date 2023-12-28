# FlySafe

### Tools

- BLUETOOTH
  - Bluefi Browser
  - P5 Ble JS
- Online Tone Generator: https://www.szynalski.com/tone-generator/
  - https://marcgg.com/blog/2016/11/01/javascript-audio/
- File generator: https://testfiledownload.com/
- STORAGE
  - Local session storage
    - Limit: 5MB and only strings, which is about 5x10^6 characters.
  - Origin Private File System (OPFS)
- ICONS
  - Icon generator: https://emoji.aranja.com/
  - SVG Icon picker: https://www.svgrepo.com/
  - SVG decomposition: https://svg-path-visualizer.netlify.app
- COMPONENTS
  - Chart.js: https://cdn.jsdelivr.net/npm/chart.js
  - Tailwind CSS
- APIS
  - Speech Synthesis API
- CERTS
  - https://community.arubanetworks.com/discussion/ios-not-verified-for-trusted-certificate
  - https://www.sslshopper.com/certificate-decoder.html
  - https://github.com/espressif/esp-idf/tree/master/examples/protocols/https_server/wss_server
    - openssl req -newkey rsa:2048 -nodes -keyout prvtkey.pem -x509 -days 3650 -out cacert.pem -subj "/CN=ESP32 HTTPS server example"
- PWA
  - https://github.com/gokulkrishh/demo-progressive-web-app/tree/master

### Choices

- Synth > wav (easy implementation)
- Plain HTML > react (barebones control)
- Wifi > BLE (accessible through iOS PWA)
- PWA > web > app (epic!!!)

### Misc

https://docs.google.com/presentation/d/1E1LffRRFPVq6fAH2K6y-tBhzp-HUobneNcVZ-FFkUps/edit?usp=sharing
