const BRAILLE=true;
const ASCII=false;
let keyCounter = -1;
let brailleChar = 0;
let beep;
let inputMode=BRAILLE;

function changeInputMode()
{
  inputMode = !inputMode;
  el = document.getElementById("inputarea");
  el.focus();
  return inputMode;

}

function processKeyboard(code) {
  keyCounter = -1;
}

function brailleIn(e) {
  if (e.isComposing) {
    return;
  }
  if (keyCounter == 1) {
    let el = document.getElementById("inputarea");
    brailleChar += 0x2800;
    let pos = el.selectionStart;
    let sentence = el.value;
    let len = sentence.length;
    let before = sentence.substr(0, pos);
    let after = sentence.substr(pos, len);
    // sentence = 'hoge';
    sentence = before + String.fromCharCode(brailleChar) + after;
    el.value = sentence;
    console.log(el.innerHTML);
    beep.play();
    el.setSelectionRange(pos + 1, pos + 1);
    brailleChar = 0;
  }
  if (keyCounter > 0) keyCounter--;
}

function isBrailleKey(e) {
  if (e.ctrlKey || e.isComposing || e.altKey) {
    return false;
  }
  if (inputMode == false) return false;
  switch (e.code) {
    case "Backspace":
    case "Tab":
    case "Enter":
    case "Home":
    case "ArrowUp":
    case "ArrowLeft":
    case "ArrowRight":
    case "End":
    case "ArrowDown":
    case "Delete":
      return false;
      break;
    default:
      return true;
  }
}

function keyIn(e) {
  if (isBrailleKey(e) == true) {
    e.preventDefault();
    if (e.repeat) {
      return;
    }
    if (keyCounter == -1) keyCounter = 0;
    keyCounter++;
    switch (e.code) {
      case 'KeyF':
        brailleChar |= 0x01;
        break;
      case 'KeyD':
        brailleChar |= 0x02;
        break;
      case 'KeyS':
        brailleChar |= 0x04;
        break;
      case 'KeyJ':
        brailleChar |= 0x08;
        break;
      case 'KeyK':
        brailleChar |= 0x10;
        break;
      case 'KeyL':
        brailleChar |= 0x20;
        break;
      case "Space":
        brailleChar = 0;
        break;
      default:
        processKeyboard(e.code);
        break;
    }
  }
  else {
    keyCounter = -1;
    let el = document.getElementById("inputarea");
  }
}

function bootstrap() {
  let input = document.getElementById("inputarea");
  input.addEventListener('keydown', keyIn);
  input.addEventListener('keyup', brailleIn);
  beep = new Audio();
  beep.src = "./beep.wav";
  beep.play();
}    
