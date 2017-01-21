
var final_span = document.getElementById('final_span');
var interim_span = document.getElementById('interim_span');

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  console.log("Web Speech available");
  var recognition = new webkitSpeechRecognition();


  recognition.onstart = function() {
    console.log("Voice recognition started");
  }
  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_span.innerHTML = final_transcript;
    interim_span.innerHTML = interim_transcript;
  };
  recognition.onerror = function(event) {
    console.log("Recognition error");
  }
  recognition.onend = function() {
    console.log("Ended Voice Recognition");
    $.post(
      "/tests/send_message.js",
      {
        transcript: final_transcript,
      }
    );
    console.log(final_transcript);
  }
  function startRecognition(event){
    final_transcript = '';
    recognition.lang = 'es';
    recognition.start();
  }
}

function speech(){
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.text = 'Probando';
  msg.lang = 'es';

  msg.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };

  speechSynthesis.speak(msg);
}
