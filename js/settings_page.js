document.getElementById("settingsPage").innerHTML = /*html*/ `
<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
  <!--**CONNECTION-->
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Connection</div>
    <div class="flex flex-row gap-2">
      <a
        href="https://192.168.4.1/"
        target="_blank"
        class="bg-amber-100 p-4 rounded-lg hover:scale-105 transition-all text-center"
      >
        Trust Certificate
      </a>
      <button
        id="autoConnectDiv"
        onclick="toggleAutoConnect()"
        class="bg-gradient-to-br from-red-500 to-red-300 p-4 rounded-lg hover:scale-105 transition-all text-center"
      >
        Auto Connect
      </button>
    </div>
  </div>
  <!--**SOUND-->
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Sound</div>
    <div class="flex flex-row gap-2">
      <button
        onclick="volDown()"
        class="p-1 bg-sky-300 rounded-lg hover:scale-105 transition-all"
      >
        <div class="text-blue-500 h-6 w-6 fill-none stroke-current stroke-2">
          <svg viewBox="-4 -2 28 28">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.114 5.636M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25h2.24z"
            ></path>
          </svg>
        </div>
      </button>
      <button
        onclick="say('audio success')"
        class="flex flex-row gap-2"
        id="volDiv"
      ></button>
      <button
        onclick="volUp()"
        class="bg-sky-300 p-1 rounded-lg hover:scale-105 transition-all"
      >
        <div class="text-blue-500 h-6 w-6 fill-none stroke-current stroke-2">
          <svg viewBox="0 -2 28 28">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.463 8.288a5.25 5.25 0 0 1 0 7.424m2.651-10.076a9 9 0 0 1 0 12.728m2.651-15.712a12.75 12.75 0 0 1 0 18.032M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25h2.24z"
            />
          </svg>
        </div>
      </button>
      <button
        onclick="changeSpeakMode()"
        class="bg-amber-100 p-4 rounded-lg hover:scale-105 transition-all"
      >
        <span id="speakModeDiv">Threshold</span>
      </button>
    </div>
  </div>
  <!--**DISPLAY-->
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Display</div>
    <div class="flex flex-row gap-2">
      <div class="bg-amber-100 basis-1/2 p-4 rounded-lg text-center">
        Shown:
        <span id="shownDiv">?</span>
      </div>
      <input
        type="number"
        id="shownInputDiv"
        class="basis-1/4 rounded-lg p-2 w-full"
        placeholder="e.g. 25"
        required
      />
      <input
        type="button"
        value="Set"
        onclick="setShown()"
        class="bg-amber-100 basis-1/4 p-4 rounded-lg hover:scale-105 transition-all"
      />
    </div>
  </div>
  <!--**TUNE-->
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Tune</div>
    <div class="flex flex-row gap-2">
      <div class="bg-amber-100 basis-1/2 p-4 rounded-lg text-center">
        Offset:
        <span id="offsetDiv">?</span> cm
      </div>
      <input
        type="number"
        id="offsetInputDiv"
        class="basis-1/4 rounded-lg p-2 w-full"
        placeholder="e.g. 134"
        required
      />
      <input
        type="button"
        value="Set"
        onclick="setOffset()"
        class="bg-amber-100 basis-1/4 p-4 rounded-lg hover:scale-105 transition-all"
      />
    </div>
    <div class="flex flex-row gap-2 mt-2">
      <div class="bg-amber-100 basis-1/2 p-4 rounded-lg text-center">
        Coef:
        <span id="coefDiv">?</span>
      </div>
      <input
        type="number"
        id="coefInputDiv"
        class="basis-1/4 rounded-lg p-2 w-full"
        placeholder="e.g. 0.93"
        required
      />
      <input
        type="button"
        value="Set"
        onclick="setCoef()"
        class="bg-amber-100 basis-1/4 p-4 rounded-lg hover:scale-105 transition-all"
      />
    </div>
  </div>
  <!--**MISC-->
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Misc</div>
    <div class="flex flex-row gap-2">
      <button
        onclick="toggleImperial()"
        class="bg-amber-100 p-4 rounded-lg hover:scale-105 transition-all"
      >
        <span id="imperialDiv">Imperial</span>
      </button>
      <button
        onclick="removeAllCaches()"
        class="bg-amber-100 p-4 rounded-lg hover:scale-105 transition-all"
      >
        Update App
      </button>
    </div>
  </div>
  <div
    class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg | px-4 pb-4 pt-2"
  >
    <div class="object-top-left font-bold pb-2">Emergency</div>
    <div
      onclick="reboot()"
      class="bg-gradient-to-br from-amber-400 to-amber-200 hover:scale-105 transition-all p-4 rounded-lg text-center"
    >
      Reboot Module
    </div>
  </div>
</div>
`;
