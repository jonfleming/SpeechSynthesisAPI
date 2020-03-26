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
    var available_voices = window.speechSynthesis.getVoices();
    var english_voice = available_voices.filter(function (voice) {
      return voice.lang === 'en-US' && (voice.name.indexOf('Zira') > -1 || voice.name.indexOf('Samantha') > -1);
    })[0];
  
    if (!english_voice)
        english_voice = available_voices[0];
    log('voice:' + JSON.stringify(english_voice, null,4));
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
    log('say:' + text);
    textToSpeech(text);
}
