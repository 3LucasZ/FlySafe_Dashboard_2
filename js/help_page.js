document.getElementById("helpPage").innerHTML = /*html*/ `
<div class="w-[100vw] h-[56.4vw] p-0 m-0 border-solid border-4 border-sky-200 absolute z-10 pointer-events-none screen-center">
</div>
<iframe
  src="https://docs.google.com/presentation/d/e/2PACX-1vS8qcoyKA5y3HuSjIxn44E92S3sv6j7_6pvIywRxzp4r9s52EdZtdlQmQT5IoGABkqNNSMdq59gNJ_h/embed?start=false&loop=true&delayms=3000&rm=minimal"
  allowfullscreen="true"
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  class="w-[100vw] h-[56.4vw] absolute z-0 screen-center"
></iframe>
`;
//onload
function loadHelpPage() {
  changePage("helpPage");
}
