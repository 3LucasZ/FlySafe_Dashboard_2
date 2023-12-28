document.getElementById("flyPage").innerHTML = /*html*/ `
<div class="flex flex-col gap-4 p-4 overflow-y-auto">
  <div class="grid grid-cols-8 gap-4">
    <div class="card2 col-span-3 | flex flex-col gap-2 sm:gap-4">
      <div
        id="statusDiv"
        class="widget bg-gradient-to-br from-red-500 to-red-300"
      >
        Not Connected
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 | gap-2 sm:gap-4">
        <div
          onclick="ws_connect()"
          class="widget bg-gradient-to-br from-amber-400 to-amber-200"
        >
          Connect
        </div>
        <div
          onclick="ws_disconnect()"
          class="widget bg-gradient-to-br from-amber-400 to-amber-200"
        >
          Disconnect
        </div>
      </div>
    </div>
    <div class="card col-span-5 relative flex items-center">
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
