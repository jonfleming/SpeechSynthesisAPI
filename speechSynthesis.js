function log(message) {
  //console.log(message);
  document.getElementById('log').value += message + '\n';
}

function replace(k, v) { if (v === undefined) { return null; } return v; };
function vlog(voice) {
  return {voiceURI: voice.voiceURI, name: voice.name, lang: voice.lang, default:voice.default};  
}

function rem(time) {
  var now = Date.now();
  return (time-now) / 1000;
}

// list of languages is probably not loaded, wait for it
if (window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        log('voiceschanged');
        available_voices = window.speechSynthesis.getVoices();
    });
} else {
    log('no voiceschanged');
    available_voices = window.speechSynthesis.getVoices();
}

function textToSpeech(text) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for (var i = 0; i < available_voices.length; i++) {
        //    alert(available_voices[i].lang + ' ' + available_voices[i].name);
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    log('english_voice' + JSON.stringify(vlog(english_voice), replacer, 4));
  
    if (english_voice === '') {
        english_voice = available_voices[0];
        log('english_voice' + JSON.stringify(vlog(english_voice), replacer, 4));
    }
  
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
    log('say:' + text);
    textToSpeech(text);
}
