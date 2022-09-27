const refs = {
    bodyDocument: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
refs.btnStart.addEventListener("click", () => {
    refs.btnStart.setAttribute("disabled", "disabled")
    timerId = setInterval(() => {
    refs.bodyDocument.style.backgroundColor = getRandomHexColor();
      
    }, 1000)
    
})

refs.btnStop.addEventListener("click", ()=> {
    refs.btnStart.removeAttribute("disabled", "disabled")
    clearInterval(timerId)

})