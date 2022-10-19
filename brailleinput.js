let keyCounter = 0;
let brailleChar = 0;
let buffer = new String();
let insertPoint = 0;

function processKeyboard(code) {
  keyCounter = -1;
}

function brailleIn() {
  if (keyCounter > 0) keyCounter--;
  if (keyCounter == 0) {
    brailleChar += 0x2800;
    let el = document.activeElement;
    el.getSelection
    buffer = el.innerHTML;
    buffer += String.fromCharCode(brailleChar);
    el.innerHTML = buffer;
    insertPoint++;
    el.setSelectionRange(insertPoint, insertPoint);
    brailleChar = 0;
  }
}

function isBrailleKey(code) {
  switch (code) {
    case "KeyF":
    case "KeyD":
    case "KeyS":
    case "KeyJ":
    case "KeyK":
    case "KeyL":
      return true;
    default:
      return false;
  }
}

function keyIn(e) {
  if (isBrailleKey(e.code) == true) {
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
}

function bootstrap() {
  let input = document.getElementById("inputarea");
  input.addEventListener('keydown', keyIn);
  input.addEventListener('keyup', brailleIn);
}    
