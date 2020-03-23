var synth = window.speechSynthesis;
var available_voices;

// list of languages is probably not loaded, wait for it
if(window.speechSynthesis.getVoices().length == 0) {
  window.speechSynthesis.addEventListener('voiceschanged', function() {
    available_voices = window.speechSynthesis.getVoices();
  });
}
else {
  available_voices = window.speechSynthesis.getVoices();
}


 function textToSpeech(text) {
  // get all voices that browser offers
  var available_voices = window.speechSynthesis.getVoices();

  // this will hold an english voice
  var english_voice = '';

  // find voice by language locale "en-US"
  // if not then select the first voice
  for(var i=0; i<available_voices.length; i++) {
//    alert(available_voices[i].lang + ' ' + available_voices[i].name);
    if(available_voices[i].lang === 'en-US' && available_voices[i].name === 'Samantha') {
      english_voice = available_voices[i];
      break;
    }
  }
  if(english_voice === '')
    english_voice = available_voices[0];

  // new SpeechSynthesisUtterance object
  var utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
  utter.pitch = 0.5;
  utter.text = text;
  utter.voice = english_voice;

  // event after text has been spoken
  utter.onend = function() {
//      alert('Speech has finished');
  }

  // speak
  window.speechSynthesis.speak(utter);
}     

function say(id) {
  var text = document.getElementById(id).value;
  textToSpeech(text);
}