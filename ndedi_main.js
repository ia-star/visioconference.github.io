
// If you modify this array, also update default language / dialect below.
var langs =
[ ['Čeština',         ['cs-CZ']],
 ['Dansk',           ['da-DK']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-GB']],
 ['Español',         ['es-ES']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Italiano',        ['it-IT']],
 ['Nederlands',      ['nl-NL']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-PT']],
 ['Slovenščina',     ['sl-SI']],
 ['Slovenčina',      ['sk-SK']],
 ['Svenska',         ['sv-SE']],
  ['Türkçe',          ['tr-TR']],
 ['Ελληνικά',         ['el-GR']],
 ['български',         ['bg-BG']],
 ['Pусский',          ['ru-RU']],
 ['Српски',           ['sr-RS']],
 ['Українська',        ['uk-UA']],
 ['한국어',             ['ko-KR']],
 ['中文',             ['cmn-Hans-CN']],
 ['日本語',           ['ja-JP']],
 ['हिन्दी',             ['hi-IN']],
 ['ภาษาไทย',         ['th-TH']]];

/* ******* MOBIL TESTI ******** */
var hasTouchscreen = 'ontouchstart' in window;
if(hasTouchscreen){var isMobile=1;}
else{var isMobile=0;}
/* ******************************************************
 ------------ TARIH HESAPLA ve ENTETE Yazdir --- ------
//****************************************************** */

var today = new Date(); 
var dd = today.getDate(); 
var mm = today.getMonth()+1; //January is 0! 
var yyyy = today.getFullYear(); 
if(dd<10){dd='0'+dd} 
if(mm<10){mm='0'+mm} 
var today = dd+'/'+mm+'/'+yyyy; 
var logo_texte="<img src='toplanti.png' width=26px> Kozeri - NDdi";
var logo_date="<span style='font-size:15px;font-weight:normal;margin-left:10px;'>" +today+ "</span>";
var logo_description="<span style='font-size:18px;font-weight:bold;margin-left:35px;'>Visioconférence avec transcription Audio en Texte</span>";
document.getElementById("entete").innerHTML ="<div style='padding: 12px 15px 20px 2px;font-size:30px;font-weight:bold;'>"+ logo_texte+ logo_date+"<br>" +logo_description+"</div>";
	
/*
/* ***************************************************************************
// ----------- NAVIGATORUN DILINI BUL Ve Mesajlari Ayarla----------------------
// *************************************************************************** */
var language = navigator.language;
if (language.indexOf('de') > -1) {var dil_indeksi=2;}
else if (language.indexOf('en') > -1 ) {var dil_indeksi=3;}
else if (language.indexOf('es') > -1 ) {var dil_indeksi=4;}
else if (language.indexOf('fr') > -1 ){var dil_indeksi=6;}
else if (language.indexOf('it')  > -1) {var dil_indeksi=7;}
else if (language.indexOf('nl') > -1) {var dil_indeksi=8;}
else if (language.indexOf('pl') > -1) {var dil_indeksi=9;}
else if (language.indexOf('pt') > -1) {var dil_indeksi=10;}
else if (language.indexOf('tr') > -1) {var dil_indeksi=14;}
else if (language.indexOf('ru') > -1) {var dil_indeksi=17;}
else {var dil_indeksi=3;}
// -------------------------------------------------------------------------------
for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
// Set default language / dialect.
select_language.selectedIndex = dil_indeksi;
updateCountry();
select_dialect.selectedIndex = 11;
showInfo('info_start');

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

/* *********************************************** */
/* ********* IS Burada Basliyor ****************** */
/* *********************************************** */
if (!('webkitSpeechRecognition' in window)) {  upgrade();} 
else {
  start_button.style.display = 'inline-block'; // Microyu burada gösteriyoruz
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {  // Microfona tikladik
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'voice2text.jpeg';
    start_img.title = 'Cliquez pour arrêter la Transcription';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'mic.png';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.png';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.png';
    start_img.title = 'Cliquez pour commencer la Transcription audio en texte';
    if (!final_transcript) {
      showInfo('info_start');
      
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    var final_traduction='';
    
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        final_traduction = event.results[i][0].transcript;
      } 
      else {
      	interim_transcript += event.results[i][0].transcript;
      }
    }
    
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);  
    interim_span.innerHTML = linebreak(interim_transcript);
    // envoyer à l'autre pour la traduction 
    connection.send(final_traduction);
    
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  }; // onresult sonu
} // Buyuk Else sonu

function upgrade() {
  start_button.style.visibility = 'hidden';
  dil_secimi.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
//console.log(s);	
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
//console.log(s.replace(two_line, '<p></p>').replace(one_line, '<br>')); 
}

function final_transcript_LineBreak(ft){
	ft=ft+"<br>";
	return ft;
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  if (final_transcript) {final_transcript =final_transcript+ '<br>';} // DTULBENT from final_transcript=''; 
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = final_transcript; // DTULBENT from final_span.innerHTML = ''; 
  interim_span.innerHTML = '';
  //start_img.src = '//google.com/intl/en/chrome/assets/common/images/content/mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
} 

function kayitButonu(){
	$("span.final").show();
	
} 

function translating_data(data){	
document.getElementById("onun_yazilari").innerHTML=data;	
}

document.getElementById('onu_yazdir').onclick = function() {
if($("div#onu_yazdir").attr("data-status") ==1){
	$("div#onu_yazdir").attr("data-status",0);	
	$("#onu_yazdir_image").attr("src","kisiyi_kaydet_Green.jpeg");
}
else{
	$("div#onu_yazdir").attr("data-status",1);	
	$("#onu_yazdir_image").attr("src","kisiyi_kaydet_Red.jpeg");
}

};



document.getElementById('beni_yazdir').onclick = function() {
if($("div#beni_yazdir").attr("data-status") ==1){
	$("div#beni_yazdir").attr("data-status",0);	
	$("#beni_yazdir_image").attr("src","kisiyi_kaydet_Green.jpeg");
	$("div#yazilarim").show();
}
else{
	$("div#beni_yazdir").attr("data-status",1);	
	$("#beni_yazdir_image").attr("src","kisiyi_kaydet_Red.jpeg");
	$("div#yazilarim").hide();
}
};

document.getElementById('gorusmeyi_kaydet').onclick = function() {
if($("div#gorusmeyi_kaydet").attr("data-status") ==1){
	$("div#gorusmeyi_kaydet").attr("data-status",0);	
	$("#gorusmeyi_kaydet_image").attr("src","toplantiyi_kaydet_Red.jpeg");
	$("div#gorusme_kayitlari").hide();
}
else{
	$("div#gorusmeyi_kaydet").attr("data-status",1);	
	$("#gorusmeyi_kaydet_image").attr("src","toplantiyi_kaydet_Green.jpeg");
	$("div#gorusme_kayitlari").show();
}
}





