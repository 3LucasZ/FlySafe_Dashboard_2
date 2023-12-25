document.getElementById("flyPage").innerHTML = /*html*/ `
<div class="flex flex-col gap-4 p-4 overflow-y-auto">
  <div class="grid grid-cols-8 gap-4">
    <div
      class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-5 col-span-3 flex flex-col gap-4"
    >
      <div
        id="statusDiv"
        class="bg-gradient-to-br from-red-500 to-red-300 p-4 rounded-lg text-center"
      >
        Not Connected
      </div>
      <div class="flex flex-row gap-4">
        <div
          onclick="reboot()"
          class="bg-gradient-to-br from-amber-400 to-amber-200 hover:scale-105 transition-all p-4 rounded-lg text-center w-full"
        >
          Reboot
        </div>
        <div
          onclick="refresh()"
          class="bg-gradient-to-br from-amber-400 to-amber-200 hover:scale-105 transition-all p-4 rounded-lg text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-5 col-span-5 text-center relative"
    >
      <span class="text-9xl" id="distDiv">?</span>
      <span class="text-2xl" id="distTypeDiv"></span>
      <button id="audioBtn" onclick="toggleAudio()"></button>
    </div>
  </div>
  <div class="min-h-[40vh]">
    <canvas id="canvasDiv"></canvas>
  </div>
</div>
<button id="recordBtn" class="avatar-container" onclick="toggleIsRecording()">
  <div id="recordAvatarDiv" class="avatar-circle-x"></div>
</button>
`;
