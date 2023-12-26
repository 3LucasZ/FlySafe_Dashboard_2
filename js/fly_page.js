document.getElementById("flyPage").innerHTML = /*html*/ `
<div class="flex flex-col gap-4 p-4 overflow-y-auto">
  <div class="grid grid-cols-8 gap-4">
    <div
      class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-4 col-span-3 flex flex-col gap-4"
    >
      <div
        id="statusDiv"
        class="bg-gradient-to-br from-red-500 to-red-300 p-4 rounded-lg text-center whitespace-nowrap truncate"
      >
        Not Connected
      </div>
      <div class="flex flex-row grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onclick="ws_reconnect()"
          class="bg-gradient-to-br from-amber-400 to-amber-200 hover:scale-105 transition-all p-4 rounded-lg text-center truncate"
        >
          Connect
        </div>
        <div
          onclick="ws_disconnect()"
          class="bg-gradient-to-br from-amber-400 to-amber-200 hover:scale-105 transition-all p-4 rounded-lg text-center truncate"
        >
          Disconnect
        </div>
      </div>
    </div>
    <div
      class="bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-4 col-span-5 relative flex items-center"
    >
      <div class="text-center w-full whitespace-normal">
        <span class="text-8xl sm:text-9xl" id="distDiv">?</span>
        <span class="text-xl sm:text-2xl" id="distTypeDiv"></span>
      </div>
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
