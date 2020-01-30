const LZString = require('lz-string')
const textarea = document.querySelector("textarea")
const button = document.querySelector(".darkSwitch")

const app = {
  toExec: null,
  save: () => {
    // reset time since last function call
    clearTimeout(this.toExec)

    // start new function to be executed
    this.toExec = setTimeout(()=>{
      if (textarea.value == '') {
        history.replaceState({}, "Malteditor", `/`);
      } else {
        let text = LZString.compressToEncodedURIComponent(textarea.value) 
        history.replaceState({}, "Malteditor", `?text=${text}`);
      }
    }, 800)
  },
  load: () => {
    // Load dark mode from localStorage
    if(localStorage.getItem("darkMode") === "true") {
      document.querySelector("body").classList.add("dark")
    }


    // Load text from URL
    let text = document.location.search.split('=')[1]
    if (text) {
      text = LZString.decompressFromEncodedURIComponent(text)
    } else {
      text = ''
    }
    textarea.value = text
    app.resize()
    textarea.focus()

  },
  resize: () => {
    // resize input field 
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + "px";
  },
  onInput: () => {
    app.resize()
    app.save()
  },
  toggleDarkMode: () => {
    let toggled = document.querySelector("body").classList.toggle("dark")
    localStorage.setItem("darkMode", toggled)
  }
}


textarea.oninput = app.onInput
window.onload = app.load()
window.onresize = app.resize
button.onclick = app.toggleDarkMode