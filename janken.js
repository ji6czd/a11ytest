const goo = 1;
const choki = 2;
const pah = 3;
const start = 0;
const eq = 4;
const fail = 5;
const win = 6;
const err = 7;
let computer = start;

function play(id) {
  // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
  if ('speechSynthesis' in window) {
    const uttr = new SpeechSynthesisUtterance();
    switch (id) {
      case start:
        uttr.text = "じゃん・けん";
        break;
      case goo:
        uttr.text = "グー";
        break;
      case choki:
        uttr.text = "チョキ";
        break;
      case pah:
        uttr.text = "パー";
        break;
      case eq:
        uttr.text = "あい・こで";
        break;
      case fail:
        uttr.text = "ズコーーーー！";
        break;
      case win:
        uttr.text = "やったね！";
        break;
      default:
        uttr.text = "なんですと？";
        break;
      case err:
        uttr.text = "先にスタートボタンを押してねえ！";
        break;
    }
    window.speechSynthesis.speak(uttr);
  }
  else {
    alert('TTS not supported')
  }
}

function gamestart() {
  if (computer == start) {
    computer = Math.floor((Math.random() * 3) + 1);
  }
  else {
    return;
  }
  play(start);
}

function janken(myId) {
  if (computer == start) {
    play(err);
    return;
  }
  play(computer);
  if (myId == computer) {
    play(eq);
    computer = Math.floor((Math.random() * 3) + 1);
  } else {
    switch (myId) {
      case goo:
        if (computer == choki) play(win);
        else if (computer == pah) play(fail);
        break;
      case 2:
        if (computer == goo) play(fail);
        else if (computer == pah) play(win);
        break;
      case 3:
        if (computer == choki) play(fail);
        else if (computer == goo) play(win);
        break;
    }
    computer = start;
  }
}

function playAudio() {
  startAudio = new Audio("./start.mp3");
  startAudio.play();
}
