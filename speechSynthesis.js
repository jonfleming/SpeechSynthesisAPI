var synth = window.speechSynthesis;
var available_voices;

function log(message) {
  document.getElementById('log').value += message + '\n';
}

function rem(time) {
  var now = Date.now();
  return (time-now) / 1000;
}

// list of languages is probably not loaded, wait for it
if (window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        available_voices = window.speechSynthesis.getVoices();
    });
} else {
    available_voices = window.speechSynthesis.getVoices();
}

function textToSpeech(text) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    english_voice = available_voices.filter(function (voice) {
      return voice.lang === 'en-US' && voice.name === 'Samantha';
    });
  
    if (english_voice.length === 0)
        english_voice[0] = available_voices[1];

    // new SpeechSynthesisUtterance object
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = text;
    utter.voice = english_voice[0];

    // event after text has been spoken
    utter.onend = function() {
        //      alert('Speech has finished');
    }

    // speak
    window.speechSynthesis.speak(utter);
}

function say(id) {
    var text = document.getElementById(id).value;
    log('say:' + text);
    textToSpeech(text);
}
