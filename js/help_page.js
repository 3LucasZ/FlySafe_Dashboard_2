document.getElementById("helpPage").innerHTML = /*html*/ `
<!--<div class="w-[100vw] h-[100vh] bg-cyan-200"></div>-->
<div class="w-[100vw] h-[56.4vw] max-h-[calc(100vh_-_119px_-_env(safe-area-inset-bottom))] max-w-[calc((100vh_-_119px_-_env(safe-area-inset-bottom))_*_1.773)] border-solid border-4 border-sky-200 absolute z-10 screen-center pointer-events-none">
</div>
<iframe
  src="https://docs.google.com/presentation/d/e/2PACX-1vS8qcoyKA5y3HuSjIxn44E92S3sv6j7_6pvIywRxzp4r9s52EdZtdlQmQT5IoGABkqNNSMdq59gNJ_h/embed?start=false&loop=true&delayms=3000&rm=minimal"
  allowfullscreen="true"
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  class="w-[100vw] h-[56.4vw] max-h-[calc(100vh_-_119px_-_env(safe-area-inset-bottom))] max-w-[calc((100vh_-_119px_-_env(safe-area-inset-bottom))_*_1.773)] absolute z-0 screen-center"
></iframe>
`;
//onload
function loadHelpPage() {
  changePage("helpPage");
}
