
 /* ********************************** */
 /* ******* Adinistration ************* */
 /* *********************************** */ 
 function mikrofonlarin_kontrolu(){
  all_micro_status=document.getElementById("admin_status").getAttribute("data-all_micro");
  
   if(all_micro_status=="OFF"){ //Kapali
    connection.send("mikrofolari_ac!");
    document.getElementById("mikrofonlarin_kontrolu").innerHTML="<span style='color:red;'>"+stop_all_micro+"</span";
    document.getElementById("admin_status").setAttribute("data-all_micro","ON");
    }

   else { // hepsi açik
      connection.send("mikrofolari_kapat!");
      document.getElementById("mikrofonlarin_kontrolu").innerHTML="<span style='color:green;'>"+start_all_micro+"</span";
      document.getElementById("admin_status").setAttribute("data-all_micro","OFF"); 
    }

    console.log("MIKROFONLARIN KONTROLU :"+ document.getElementById("admin_status").getAttribute("data-all_micro"));
}

function IstopSpeaking(){
// kim konusuyor ?
var mon_id=document.getElementById("wrapper").firstElementChild.id;
var admin_id=document.getElementById("admin_status").getAttribute("data-admin_id");
var konusan_id=document.getElementById("admin_status").getAttribute("data-actif_speaker");
document.getElementById("konus"+konusan_id).innerHTML="";
  if(mon_id==konusan_id){  
    document.getElementById("speaking_man").style.display="none";
    document.getElementById("soz_kontrolu").style.display="inline-block";
    document.getElementById(konusan_id).setAttribute("data-konusma",0); 
var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" I STOP SPEAKING Mikrofonlarin durumu-> "+mkirofonlarin_durumu);
    if(mkirofonlarin_durumu=="OFF") {mute_local_micro();}
  }
  //connection.send("mikrofonunu_kapat!"+konusan_id+"!");
  connection.send("speakEnding!"+konusan_id+"!");
 
  if(mon_id==admin_id) {document.getElementById("soz_kontrolu").style.display="none";}
 
  var nbr_sirada=document.getElementById("soz_sirasi").childElementCount;
  if(nbr_sirada >0){}
  else {
    document.getElementById("soz_ver").innerHTML=soz_verdim;
    document.getElementById("soz_ver").style.display="none";
  }
var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" I STOP SPEAKING Mikrofonlarin durumu: "+mkirofonlarin_durumu);
}

function speak_ending(konusan_id){
// kim konusuyor ?
var mon_id=document.getElementById("wrapper").firstElementChild.id;
var admin_id=document.getElementById("admin_status").getAttribute("data-admin_id");
document.getElementById("konus"+konusan_id).innerHTML="";
  if(mon_id==konusan_id){  
    document.getElementById("speaking_man").style.display="none";
    document.getElementById("soz_kontrolu").style.display="inline-block";
    document.getElementById(konusan_id).setAttribute("data-konusma",0);
var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" SPEAK ENDING Mikrofonlarin durumu-> "+mkirofonlarin_durumu);
    if(mkirofonlarin_durumu=="OFF") {mute_local_micro();}
  }

  if(mon_id==admin_id) {document.getElementById("soz_kontrolu").style.display="none";}
  
  var nbr_sirada=document.getElementById("soz_sirasi").childElementCount;
  if(nbr_sirada >0){}
  else {
    document.getElementById("soz_ver").innerHTML=soz_verdim;
    document.getElementById("soz_ver").style.display="none";
  }

var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" SPEAK ENDING Mikrofonlarin durumu: "+mkirofonlarin_durumu);
}


function speak_starting(soz_id){
  var speak_larg = document.getElementById("orientation").dataset.l;
  var speak_resim_w= parseInt(speak_larg/40);
  var mon_id=document.getElementById("wrapper").firstElementChild.id;
 // sadece Amin tikliyor 
 // LOCAL ISLEMLERI
      //beklemeden çikart
      var sira = document.getElementById('soz_sirasi');
      sira.removeChild(sira.getElementsByTagName('input')[0]);
     
      // soz istiyenin resmini koy  konusan olarak kaydet
      document.getElementById("konus"+soz_id).innerHTML="<img src='speaker_man.png' width='"+speak_resim_w+"px'>"; 
      document.getElementById("admin_status").setAttribute("data-actif_speaker",soz_id);      
      //  beklemeden  çiktigini statuse ekle
      document.getElementById(soz_id).setAttribute("data-bekleme_sirasi",0);
      document.getElementById(soz_id).setAttribute("data-konusma",1); 
      document.getElementById("local_status").setAttribute("data-waiting_speaker","OFF");
      if(mon_id ==soz_id){
        document.getElementById("speaking_man").style.display="inline-block";
        document.getElementById("soz_kontrolu").style.display="none";
      }

var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" SPEAK STARTING Mikrofonlarin durumu: "+mkirofonlarin_durumu);       
}


function soz_ver(){
var nbr_sirada=document.getElementById("soz_sirasi").childElementCount;
 console.log("SOZ VER ->"+nbr_sirada); 
   if(nbr_sirada >0){
    if(nbr_sirada==1) {document.getElementById("soz_ver").innerHTML=konusma_sonu;}
      var sira_id=document.getElementById("soz_sirasi").firstElementChild.id;
      var sira_id_lenght=sira_id.length;
      var soz_id = sira_id.substring(5, sira_id_lenght);
        
      var speak_larg = document.getElementById("orientation").dataset.l;
      var speak_resim_w= parseInt(speak_larg/40);

      // Konusan varmi ?
      var konusan_id=document.getElementById("admin_status").getAttribute("data-actif_speaker");
      if(konusan_id==0){    
        // konusan yok
        speak_starting(soz_id);
        // sôz istiyenin microfonunu aç
        connection.send("mikrofonunu_ac!"+soz_id+"!")
        connection.send("speakStarting!"+soz_id+"!")
      } 
      else{  //konusan var      
        speak_ending(konusan_id); 
        
        connection.send("speakEnding!"+konusan_id+"!")
       
        speak_starting(soz_id);
        connection.send("mikrofonunu_ac!"+soz_id+"!")
        connection.send("speakStarting!"+soz_id+"!")
      }
var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" SOZ VER Mikrofonlarin durumu: "+mkirofonlarin_durumu);     

  }

  else {
    console.log("SOZ VER  Admin Status " + document.getElementById("admin_status").getAttribute("data-actif_speaker") ); 
    var konusan_id=document.getElementById("admin_status").getAttribute("data-actif_speaker");
    speak_ending(konusan_id); 
    var status_micros= document.getElementById("admin_status").getAttribute("data-all_micro");
    if(status_micros=="ON"){connection.send("mikrofonunu_ac!"+soz_id+"!");}
    else if(status_micros=="OFF"){connection.send("mikrofonunu_kapat!"+soz_id+"!");}
    connection.send("speakEnding!"+konusan_id+"!")

    }
}

// ========================================
// ======= SÖZ ISTYOR / ISTEMIYOR  ========
// ========================================
function soz_kontrolu(){ 
  var soz_id=document.getElementById("wrapper").firstElementChild.id;
  var beklemede =document.getElementById("local_status").getAttribute("data-waiting_speaker");

 // soz almissa tikladigi için siradan çikmak istiyor?
if(beklemede=="ON"){
  if(window.confirm(stop_waiting_speak)){
  var mesajoff="soz_istemiyor!"+soz_id+"!";
  connection.send(mesajoff);
  // sira resmini çikart
  document.getElementById("konus"+soz_id).innerHTML="";
  
  // siradan çik
  var element = document.getElementById("soz_sirasi");
  var child=document.getElementById("input"+soz_id);
  element.removeChild(child);
   // Sirada çiktigini statuse ekle
   document.getElementById(soz_id).setAttribute("data-bekleme_sirasi",0);

  // buton yazisini degistir
  document.getElementById("soz_kontrolu").title=start_waiting_speak;
  // durumu kaydet
  document.getElementById("local_status").setAttribute("data-waiting_speaker","OFF");
  }
else {return;}  

}

 else if(beklemede =="OFF"){
  console.log("beleme="+beklemede +" soz id:"+soz_id);
  // sira resmini ekle
  var speak_larg = document.getElementById("orientation").dataset.l;
  var speak_resim_w= parseInt(speak_larg/40);
  document.getElementById("konus"+soz_id).innerHTML="<img src='elim.png' width='"+speak_resim_w+"px'>";
  
  // siraya gir 
  var siradaki = document.createElement('input');
  siradaki.id="input"+soz_id;
  document.getElementById("soz_sirasi").appendChild(siradaki);
  // Sirada girdigini statuse ekle
  document.getElementById(soz_id).setAttribute("data-bekleme_sirasi",1);
  //alert("statue ekle:"+soz_id);

  // buton yazisini degistir
  document.getElementById("soz_kontrolu").title=stop_waiting_speak;
  // durumu kaydet
  document.getElementById("local_status").setAttribute("data-waiting_speaker","ON");
  // Sirada oldugunu statuse ekle
  //document.getElementById("admin_status").setAttribute("data-bekleme_sirasi",1);
  // mesaj gonder
  var mesajon="soz_istiyor!"+soz_id+"!";
  connection.send(mesajon);

}

var mkirofonlarin_durumu = document.getElementById("admin_status").getAttribute("data-all_micro");
console.log(" SOZ VER Mikrofonlarin durumu: "+mkirofonlarin_durumu); 

}




function  moderatorluge_basvur(){
    var benim_id=document.getElementById("wrapper").firstElementChild.id;
    // modaratör varmi ?
    var idareci_id= document.getElementById("admin_status").getAttribute("data-admin_id");
    if(idareci_id==0){ // kimse yok
    document.getElementById("admin_data").style.display="block";
    document.getElementById("moderator_on").style.display="none";
    document.getElementById("moderator_off").style.display="block";
    document.getElementById("soz_kontrolu").style.display="none";
    document.getElementById("admin_status").setAttribute("data-admin_id",benim_id);
    document.getElementById("konus"+benim_id).innerHTML="";
    // herkeze gönder
    var mesaj="moderator!ON!"+benim_id+"!";
    connection.send(mesaj);
    }
}


function moderator_off(){
  // moderatör benmimiyim ?
  var benim_id=document.getElementById("wrapper").firstElementChild.id;
  var idareci_id= document.getElementById("admin_status").getAttribute("data-admin_id");
  if(benim_id==idareci_id){
    document.getElementById("admin_data").style.display="none";
    document.getElementById("moderator_on").style.display="block";
    document.getElementById("moderator_off").style.display="none";
    document.getElementById("admin_status").setAttribute("data-admin_id","0");
    document.getElementById("soz_kontrolu").style.display="none";
    document.getElementById("konus"+benim_id).innerHTML="";
    // herkeze gönder
    var mesaj="moderator!OFF!"+benim_id+"!";
    connection.send(mesaj);
  }
}


/* ************************************* */
/* ************ LOCAL MICRO KONTROLU *** */
/* ************************************* */
function mute_local_micro(){
  var localStream = connection.attachStreams[0];
  localStream.mute('audio');
  document.getElementById("wrapper").firstElementChild.setAttribute("data-mikrofon", false);
  var mon_id=document.getElementById("wrapper").firstElementChild.id;
  var larg = document.getElementById("orientation").dataset.l;
  var resim_w= parseInt(larg/40);        
  var text="<img src='micro_off.png' width='"+resim_w+"px'>";
  document.getElementById("mesaj"+mon_id).innerHTML=text;

  
  document.getElementById("micro_off").style.display="none";
  document.getElementById("micro_on").style.display="block";
  var mesaj="mikrofonum!0!"+document.getElementById("wrapper").firstElementChild.id+"!";
  connection.send(mesaj);
}

function unmute_local_micro(){
  var localStream = connection.attachStreams[0];
  localStream.unmute('audio');
  document.getElementById("wrapper").firstElementChild.setAttribute("data-mikrofon", true);
  var mon_id=document.getElementById("wrapper").firstElementChild.id;

  var larg = document.getElementById("orientation").dataset.l;
  var resim_w= parseInt(larg/40);        
  var text="";
  document.getElementById("mesaj"+mon_id).innerHTML=text;
  
  document.getElementById("micro_off").style.display="block";
  document.getElementById("micro_on").style.display="none";

  var mesaj="mikrofonum!1!"+document.getElementById("wrapper").firstElementChild.id+"!";
  connection.send(mesaj);

}



function screenSize(beni_arayan){
  
  if(window.innerWidth !== undefined && window.innerHeight !== undefined) { 
    var largeur = window.innerWidth;
    var hauteur = window.innerHeight;
  } else {  
    var largeur = document.documentElement.clientWidth;
    var hauteur = document.documentElement.clientHeight;
  }
  var txt = PageSize+": "+ Width+"=  " + largeur + ","+ Height+"=  " + hauteur;
  document.getElementById("win_dimensions").innerHTML = txt;
  
  document.getElementById("orientation").dataset.l = largeur;
  document.getElementById("orientation").dataset.h = hauteur;
  console.log("SCREENSIZE-> Arayan:"+beni_arayan+" Durum=>"+txt); 

    yerlestir(beni_arayan);
}



/* ***************************************************************************
// ----------- <input  > creator----------------------
// *************************************************************************** */

/* ***************************************************/
/* ****  Telefonun tutulus yönünü  anlamak icin **** */
/*****************************************************/
if   ( window.orientation == 0 || window.orientation == 180) { document.getElementById("orientation").setAttribute('value','Portrait'); } 
else {document.getElementById("orientation").setAttribute('value','Landscape');}

 /* ****  Telefonun tutulus yönünü  degistirdi **** */
window.addEventListener("orientationchange", function() {
  
  if ( window.orientation == 0 || window.orientation == 180) {
    document.getElementById("orientation").setAttribute('value','Portrait');
    screenSize("Portrait");
  } else {
    document.getElementById("orientation").setAttribute('value','Landscape');
    screenSize("Landscape");
  }
}, false)


/****************************************
 * **************************************
 * ************YERLESTIR ****************
 * **************************************
 * **************************************/

function yerlestir(arayan){
  var Larg = document.getElementById("orientation").dataset.l;
  var Haut =document.getElementById("orientation").dataset.h;
  var tutma_yonu=document.getElementById("orientation").value;
  var yonumuz=document.getElementById("orientation").getAttribute('value');

  var mevcut_video_sayisi = document.getElementById("wrapper").childElementCount;
  // ==================================
  // ===Administration butonunu ac ====
  // ==================================
      if(mevcut_video_sayisi >= 1){
        var my_id=document.getElementById("wrapper").firstElementChild.id;
        idareci_id=document.getElementById("admin_status").getAttribute("data-admin_id");
        if(my_id==idareci_id){
          document.getElementById("moderator_off").style.display="block"; 
          document.getElementById("moderator_on").style.display="none";
         }
        else if(my_id != idareci_id && idareci_id !=0){
          document.getElementById("moderator_off").style.display="none"; 
          document.getElementById("moderator_on").style.display="none";
        }
        else {
          document.getElementById("moderator_on").style.display="block"; 
          document.getElementById("moderator_off").style.display="none"; 
        }
                
      }
      // ==================================
  // ===Administration butonunu kapa ======
  // ======================================
      else{
        document.getElementById("moderator_off").style.display="none"; 
        document.getElementById("moderator_on").style.display="none";
        
      }
// ==================================== 
// ===== SCREEN SHARE PAYLASMA yok= ===
// ====================================
  var screen_share =document.getElementById("screen_id").getAttribute("data-screen_id");
//console.log("YERLESTIR->"+arayan+" video sayisi: "+mevcut_video_sayisi+" screen_share:"+screen_share+ "Yönümüz: "+yonumuz);
  if(screen_share =="paylasmayok"){
      document.documentElement.style.setProperty('--flex-direction',  "row");
      document.documentElement.style.setProperty('--flex-grow', '0');
  
      if(mevcut_video_sayisi==1){
          if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', Haut + "px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/2)+"px");
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', Haut+"px");
          document.documentElement.style.setProperty('--max-width', Larg+"px");
          }
      }

      else if(mevcut_video_sayisi==2){
        if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', Haut+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/2)+"px"); 
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/2)+"px");
          document.documentElement.style.setProperty('--max-width', Larg+"px");
          }
      }

      else if(mevcut_video_sayisi==3){
        if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', Haut+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/3)+"px");
  
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/2)+"px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/2)+"px");
          
        }

      }

      else if(mevcut_video_sayisi>3 && mevcut_video_sayisi<5){
        if (tutma_yonu=="Landscape") {
        document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/2)+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/2)+"px");
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/2)+"px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/2)+"px");
          
        }

      }

        else if(mevcut_video_sayisi>4 && mevcut_video_sayisi<7){
          if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/2)+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/3)+"px");
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/3)+"px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/2)+"px");
          
        }
      }
        else if(mevcut_video_sayisi>6 && mevcut_video_sayisi<10){
          if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/3)+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/3)+"px");
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/3)+"px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/3)+"px");
          
        }


        }
        else {
          if (tutma_yonu=="Landscape") {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/3)+"px");
          document.documentElement.style.setProperty('--max-width',  parseInt(Larg/4.1)+"px");
          }
          else {
          document.documentElement.style.setProperty('--height', '100vh');
          document.documentElement.style.setProperty('--width', '100vw');
          document.documentElement.style.setProperty('--max-height', parseInt(Haut/4)+"px");
          document.documentElement.style.setProperty('--max-width', parseInt(Larg/3)+"px");


        }
    }

} // Paylasmayok


// ==================================== 
// ===== SCREEN SHARE PAYLASMA VAR= ===
// ====================================
else{
   // ******* sadece screen share için*************
   var shared_screen_id=document.getElementById("screen_id").getAttribute("data-screen_id");
   document.getElementById(shared_screen_id).classList.add("screen");
    
      if (tutma_yonu=="Landscape") {
      //*** Butun videolar için
        document.documentElement.style.setProperty('--height', '100vh');
        document.documentElement.style.setProperty('--width', '100vw');
        document.documentElement.style.setProperty('--max-height', "100vh");
        document.documentElement.style.setProperty('--max-width',  "100vw");
        document.documentElement.style.setProperty('--flex-direction',  "column");
        document.documentElement.style.setProperty('--flex-grow', '1');
      
      }
        else {
        document.documentElement.style.setProperty('--height', '100vh');
        document.documentElement.style.setProperty('--width', '100vw');
        document.documentElement.style.setProperty('--max-height', "100vh");
        document.documentElement.style.setProperty('--max-width',  "100vw");
        document.documentElement.style.setProperty('--flex-direction',  "column");
        document.documentElement.style.setProperty('--flex-grow', '1');


      }


} // screen share var


} // yerlestir 

/* ***************************************************************************
// ----------- NAVIGATORUN DILINI BUL Ve Mesajlari Ayarla----------------------
// *************************************************************************** */
var language = navigator.language;
if (language.indexOf('fr') > -1) {
	document.getElementById("btn-openjoin-room").innerHTML ="Entrez!";
	document.getElementById('OdaIsmi').placeholder = 'Nom de la salle';
  document.getElementById('name').placeholder = 'Votre Nom';
  document.getElementById("name").setAttribute("title","Votre nom sera visible par les participants de la réunion");
  document.getElementById('Sortir').setAttribute('title', "Quitter la salle!");
  document.getElementById('open_screen_share').setAttribute('title', "Partager un ecran déjà ouvert!");
  document.getElementById('close_screen_share').setAttribute('title', "Attêter la partage!");
  document.getElementById('speakUp').setAttribute('title', "Réunion seulement en audio ");
  document.getElementById('videoUp').setAttribute('title', "Réunion avec Video et audio!");
  document.getElementById('micro_off').setAttribute('title', "Couper local son ");
  document.getElementById('micro_on').setAttribute('title', "Activer local son ");
  document.getElementById('room_name').setAttribute('title', "Nom de la Salle ");

  var adin_eksik="Votre nom manque !! ";
  var Meeting = "Réunion";
  var odadancik="Quittez la Salle";
	var odaadiyok="Le Nom de la salle manque !";
	var kisisayisi=  " Utilisateur(s) connecté(s)";
	var navOK="Navigateur bon pour la visiocoférence ";
	var navNotOK="Votre navigateur n'est pas adapté à faire une bonne  visioconférence !";
	var dataylari_incele="Voir les détails";
	
	var ScreenCapturingSupported_OK="Capture d\'écran OK";
	var ScreenCapturingSupported_notOK="<span style=\'color:red;\'>Capture d\'écran n\'est pas supportée</span>";
	var SctpDataChannelsSupported_OK="Sctp Data Channel OK";
	var SctpDataChannelsSupported_notOK="<span style=\'color:red;\'>Sctp Data Channel n\'est pas supporté</span>";
	var RtpDataChannelsSupported_OK="Rtp Data Channel OK";
	var RtpDataChannelsSupported_notOK="<span style=\'color:red;\'>Rtp Data Channel n\'est pas supporté</span>";
	var WebRTCSupported_OK="WebRTC est OK";
	var WebRTCSupported_notOK="<span style=\'color:red;\'>WebRTC n\'est pas supporté </span>";
	var WebSocketsSupported_OK="Web Socket OK";
	var WebSocketsSupported_notOK="<span style=\'color:red;\'>Web Socket n\'est pas supporté</span>";
	var WebSocketsBlocked_OK="<span style=\'color:red;\'>Web Socket est bloqué</span>";
	var WebSocketsBlocked_notOK="Web Socket n\'est pas bloqué";
	var VideoSupportsStreamCapturing_OK="Caputre video est possible";
	var VideoSupportsStreamCapturing_notOK="<span style=\'color:red;\'>Caputre video n\'est pas possible</span>";
	var System="Système: ";
	var Browser="Navigateur: ";
  var PageSize="Dimensions";
  var Width="Largeur";
  var Height="Hauteur";
  var Ayarlar="Paramètres d\'affichage";
  var Automatic="Automatique";
  var Informations="Informations";	
  
  var start_moderation="Commencer Administration";
  var stop_moderation="Quitter Administration";
  document.getElementById('moderator_on').setAttribute('title', start_moderation);
  var start_all_micro="Ouvrir les micro";
  var stop_all_micro="Fermer les micros";
  document.getElementById("mikrofonlarin_kontrolu").innerHTML =stop_all_micro;
  var start_waiting_speak="prendre parole";
  var stop_waiting_speak= "céder tour de parole";
  var soz_verdim="Donner la parole";
  document.getElementById("soz_ver").innerHTML =soz_verdim;
  var konusma_sonu= "Fin de parole";

}
else if (language.indexOf('tr') > -1) {
	document.getElementById("btn-openjoin-room").innerHTML ="Salona buyrun";
  document.getElementById('OdaIsmi').placeholder = "Salon Adı ?";
  document.getElementById('name').placeholder = 'Adınız ?';
  document.getElementById('Sortir').setAttribute('title', "Salonu terket!");
  document.getElementById('open_screen_share').setAttribute('title', "Daha önce açılan bir sekme veya pencereyi paylasın !");
  document.getElementById('close_screen_share').setAttribute('title', "Paylaşmayı sonlandırın!");
  document.getElementById('room_name').setAttribute('title', "Toplantı salonu adı ");
  var adin_eksik="Adiniz eksik ! ";
  var Meeting = "Toplantı";
	var odadancik="Salonu terket";
	var odaadiyok="Salon adı eksik !";
	var kisisayisi=  " Kisi Salondayız";
	var navOK="Web Browseriniz uygundur";
	var navNotOK="Bu Web Browser size kaliteli bir visoconferans yapama imkanı sunmuyor!";
	var dataylari_incele="Detayları incele";
	
	var ScreenCapturingSupported_OK="Ekrak koyalama mümkün";
	var ScreenCapturingSupported_notOK="<span style=\'color:red;\'>Ekran kopyalama imkansız</span>";
	var SctpDataChannelsSupported_OK="Sctp Data Channel Tamam";
	var SctpDataChannelsSupported_notOK="<span style=\'color:red;\'>Sctp Data Channel çalismıyor</span>";
	var RtpDataChannelsSupported_OK="Rtp Data Channel Tamam";
	var RtpDataChannelsSupported_notOK="<span style=\'color:red;\'>Rtp Data Channel çalismıyor</span>";
	var WebRTCSupported_OK="Internet üzerinden direk baglanti Tamam";
	var WebRTCSupported_notOK="<span style=\'color:red;\'>Internet üzerinden direk baglanti çalismıyor </span>";
	var WebSocketsSupported_OK="Web Socket Tamam";
	var WebSocketsSupported_notOK="<span style=\'color:red;\'>Web Socket çalısmıyor</span>";
	var WebSocketsBlocked_OK="<span style=\'color:red;\'>Web Socket kapalı</span>";
	var WebSocketsBlocked_notOK="Web Socket açik";
	var VideoSupportsStreamCapturing_OK="Video kopyalama mümkün";
	var VideoSupportsStreamCapturing_notOK="<span style=\'color:red;\'>Video kopyalama çalısmiyor</span>";
	var System="Isletme sistemi: ";
	var Browser="Browser: ";
  var PageSize="Ekran boyutları";
  var Width="Genislik";
  var Height="Yükseklik";
  var Ayarlar="Ekran ayarları";
  var Automatic="Otomatik";
  var Informations="Ek bilgiler";

  var start_moderation="Moderatör ol";
  var stop_moderation="Moderatörlügü terket";
  document.getElementById('moderator_on').setAttribute('title', start_moderation);
  var start_all_micro="Mikrofonlari aç";
  var stop_all_micro="Mikrofonlari kapat";
  document.getElementById("mikrofonlarin_kontrolu").innerHTML =stop_all_micro;
  var start_waiting_speak="Söz istiyorum";
  var stop_waiting_speak= "Söz sıramı terkediyorum";
  var soz_verdim="Söz ver ";
  document.getElementById("soz_ver").innerHTML =soz_verdim;
  var konusma_sonu= "Konuşmayı sonlandır"
	}
else {
  document.getElementById("btn-openjoin-room").innerHTML ="Open/Join Room ";
  document.getElementById('OdaIsmi').placeholder = "Room Name ?";
  document.getElementById('name').placeholder = 'Your Name ?';
  document.getElementById("name").setAttribute("title","Your name will be visible to meeting participants");
  document.getElementById('Sortir').setAttribute('title', "Leave the Room!");
  document.getElementById('open_screen_share').setAttribute('title', "Share your screen !");
  document.getElementById('close_screen_share').setAttribute('title', "Stop sharing your screen!");
  document.getElementById('speakUp').setAttribute('title', "Meetint with audio only");
  document.getElementById('videoUp').setAttribute('title', "Meeting Video and  audio!");
  document.getElementById('micro_off').setAttribute('title', "Mute local micro");
  document.getElementById('micro_on').setAttribute('title', " Unmute local micro");
  document.getElementById('room_name').setAttribute('title', "Room Name ");

  var adin_eksik="Please  enter your name ! ";
  var Meeting = "Meeting";
	var odadancik="Leave the Room";
	var odaadiyok="Please enter Room Name !";
	var kisisayisi=  " Users connected now";
	var navOK=" Your browser is OK !";
	var navNotOK="Your browser is not suitable for a good videoconference!";
	var dataylari_incele="See the details";
	
	var ScreenCapturingSupported_OK="Screen Capturing Supported";
	var ScreenCapturingSupported_notOK="<span style=\'color:red;\'>Screen Capturing not supported</span>";
	var SctpDataChannelsSupported_OK="Sctp Data Channel Supported";
	var SctpDataChannelsSupported_notOK="<span style=\'color:red;\'>Sctp Data Channel not supported</span>";
	var RtpDataChannelsSupported_OK="Rtp Data Channel Supported";
	var RtpDataChannelsSupported_notOK="<span style=\'color:red;\'>Rtp Data Channel not Supported</span>";
	var WebRTCSupported_OK="WebRTC supported";
	var WebRTCSupported_notOK="<span style=\'color:red;\'>WebRTC not supported </span>";
	var WebSocketsSupported_OK="Web Socket supported";
	var WebSocketsSupported_notOK="<span style=\'color:red;\'>Web Socket not supported</span>";
	var WebSocketsBlocked_OK="<span style=\'color:red;\'>Web Socket is Blocked</span>";
	var WebSocketsBlocked_notOK="Web Socket is Not Blocked";
	var VideoSupportsStreamCapturing_OK="Video Supports Stream Capturing";
	var VideoSupportsStreamCapturing_notOK="<span style=\'color:red;\'>Video does not Supports Stream Capturing</span>";
	var System="System: ";
	var Browser="Browser: ";
  var PageSize="Page size";
  var Width="Witdh";
  var Height="Height";
  var Ayarlar="Layout setting";
  var Automatic="Automatic";
  var Informations="Informations";
  document.getElementById("micro_off").innerHTML = "Mute your micro";
  document.getElementById("micro_on").innerHTML = "Unmute your micro";

  var start_moderation="strat Administration";
  var stop_moderation="Stop Administration";
  document.getElementById('moderator_on').setAttribute('title', start_moderation);
  var start_all_micro="Open all micro";
  var stop_all_micro="Close all micros";
  document.getElementById("mikrofonlarin_kontrolu").innerHTML =stop_all_micro;
  var start_waiting_speak="Wait for speaking";
  var stop_waiting_speak= "Stop waiting for speaking";
  var soz_verdim="Start speak";
  document.getElementById("soz_ver").innerHTML =soz_verdim;
  var konusma_sonu= "End speak";
	}

  // ******************************************* //
// ********** Ad Kontrolu ***************** //
// Bakalim benim adim kaydedimismi ?
var mon_nom=localStorage.getItem('dataIsim');
// adimin kaydi yok
if(mon_nom=="" || mon_nom === "undefined" || mon_nom === null ){ }
// adimin kaydi var
else  { document.getElementById("name").setAttribute('value',mon_nom);}




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
document.getElementById("entete").innerHTML = "<div style='padding: 12px 15px 20px 2px;font-size:25px;font-weight:bold;color:white;display:inline;width:40px;'>"+
     "<img src='toplanti.png' width=26px> Kozeri "+Meeting+
     "&nbsp; <img src='info.png' id='info' width=22px  onclick='open_info();' title='"+Informations+"'>"+
     "<span style='font-size:20px;font-weight:normal;'>   "+today+ "</span>"+
     "</div>";


/* ************************************************************
 ----------------BAGLANTIYA BASLIYORUZ ----------------------
// *********************************************************** */

var connection = new RTCMultiConnection();

// Soket server baglanti adresi
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// ------------ Video audio degerleri ---------------------------------
connection.socketCustomParameters ='&fullName=Deniz&country=FR&meetingId=xyz';

/* ****** Connection parametres ***** */
var GET_POST = location.search.substring(1).split("&");
var grub_degeri = GET_POST[0].split("=");
var grup = unescape(grub_degeri[1]); // makina62 vs
var article=unescape(grub_degeri[0]); // grup, oda vs

var conf_type= document.getElementById("local_status").getAttribute("data-conf_type");

if(article=="audioconf" || conf_type=="audioconf"){
  document.getElementById("local_status").setAttribute("data-conf_type","audioconf");
  connection.session = {
    audio: true,
	  video: false,
	  data:  true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};

connection.mediaConstraints = {
    video: false,
    audio: true
};

}
else {
  document.getElementById("local_status").setAttribute("data-conf_type","videoconf");  
connection.session = {
    audio: true,
	video: true,
	data:  true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

connection.mediaConstraints = {
    video: true,
    audio: true
};

}
/* ****** ************** ********** */

var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};

// first step, ignore default STUN+TURN servers
connection.iceServers = [];

// second step, set STUN url
connection.iceServers.push({
  urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun.l.google.com:19302?transport=udp',
        ]
});

// last step, set TURN url (recommended)
connection.iceServers.push({
    urls: 'turn:numb.viagenie.ca:3478',
    credential: 'Acil6toyens',
    username: 'deniz.tulbent@gmail.com'
});

/* ********************************************
---- kullanicinin salona girmesi olayi ------
//******************************************** */
var user_id=[];
var LocalUserID=[];
var RemoteUserID=[];
var kullanici=[];
var kalanlar=[];
var isMobile="";
/* *********************************************
--------ODAYI AC /  ACIK ODAYA ODAYA GIR ------
// ******************************************** */
/* ********************************/
/********* SALONA OTOMATIK GIRIS ******* */
/***********************************/
var GET_POST = location.search.substring(1).split("&");
var grub_degeri = GET_POST[0].split("=");
var grup = unescape(grub_degeri[1]); // makina62 vs
var article=unescape(grub_degeri[0]); // grup, oda vs
 // Program girisi kozeri.altervista.org?grup=xxxxxx ise

 if(location.search && article=="grup"){
    document.getElementById("OdaIsmi").style.display="none";
    // Masa Isminin value  degerlerini düzenle
    var nbr_option = document.getElementById("MasaIsmi").length;
          var i;
          for (i = 1; i < nbr_option; i++) {document.getElementById("MasaIsmi").options.item(i).value=grup+i;}
    }

else if(location.search && (article=="oda" || article=="audioconf" || article=="videoconf")){
  document.getElementById("OdaIsmi").value=grup;
  document.getElementById("room_name").innerHTML=grup;
  if(article=="audioconf"){
    document.getElementById("local_status").setAttribute("data-conf_type","audioconf");
    document.getElementById("speakUp").style.display="none";
    document.getElementById("videoUp").style.display="block";
     // imagex.src= "avatar.png";
     document.getElementsByClassName("imagex").src="avatar.png";

  }
  else{
    document.getElementById("local_status").setAttribute("data-conf_type","videoconf");
    document.getElementById("speakUp").style.display="block";
    document.getElementById("videoUp").style.display="none";
  }
  
  // direk baglanti
  connection.openOrJoin(grup);
     
  document.getElementById('btn-openjoin-room').style.visibility = "hidden";
  document.getElementById("kontrol").style.display = "none"; // Kontrolu kapat
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    isMobile="yes";
    document.getElementById("open_screen_share").style.display="none";
    document.getElementById("close_screen_share").style.display="none";
  }
  else {isMobile="no";} 
  
  document.getElementById("baslik").style.display = "block"; 
  document.getElementById("close_screen_share").style.display="none";
  document.getElementById('win_dimensions').style.display='none'
  }




// Düz giris
else{
  document.getElementById("MasaIsmi").style.display="none";

}

/* ****************************************************** */
/* ***************** SALONA TIKLIYARAK GIRIS  *********** */
/* ****************************************************** */

document.getElementById('btn-openjoin-room').onclick = function() {
  if(location.search){
    var oda = document.getElementById("MasaIsmi").value; 
    // oda adini ekrana yaz
    var secilen_oda=document.getElementById("MasaIsmi");
    var secilen_oda_adi=secilen_oda.options[secilen_oda.selectedIndex].text;
    document.getElementById("room_name").innerHTML=secilen_oda_adi;
  }
	else {
    var oda = document.getElementById("OdaIsmi").value; 
    // oda adini ekrana yaz
    document.getElementById("room_name").innerHTML=oda;}
    var kendi_adim=document.getElementById("name").value;
  
  if (oda =="" || oda==0) { alert(odaadiyok);}
  else if(kendi_adim==""){alert(adin_eksik); }
  else {
      // adimi kaydet
    localStorage.setItem('dataIsim', kendi_adim);
  
    	connection.openOrJoin(oda);
     



    	document.getElementById('btn-openjoin-room').style.visibility = "hidden";
    	document.getElementById("kontrol").style.display = "none"; // Kontrolu kapat
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        isMobile="yes";
        document.getElementById("open_screen_share").style.display="none";
        document.getElementById("close_screen_share").style.display="none";
        }
       else {isMobile="no";} 
      document.getElementById("baslik").style.display = "block"; 
      document.getElementById("close_screen_share").style.display="none";
      document.getElementById('win_dimensions').style.display='none'
    	  	   	
    	}
};

function adimi_gonder(){    
    var kendi_id=document.getElementById("wrapper").firstElementChild.id;
    var kendi_adim=document.getElementById("wrapper").firstElementChild.title;
//console.log("ADIMI GONDER ->"+kendi_adim+"/"+kendi_id);
    var mesaj="adim!"+kendi_adim+"!"+kendi_id+"!";
    console.log("sending:",kendi_adim);
    connection.send(mesaj);
    
};

connection.onstream = function(event) {
  var MediaTag=event.mediaElement.tagName;
	var conf_type=document.getElementById("local_status").getAttribute("data-conf_type");
  

  if(event.type=="remote"){ 

    var kisi_id=event.userid;
    // önce bir div kur
    var mediaElementContainer = document.getElementById("wrapper")
    var mediaControls = document.createElement('div');
        mediaControls.className = 'media-controls';
        mediaControls.id = event.userid;
        mediaControls.title="kisi_adi";
        mediaControls.setAttribute("data-stream_type", "remote");
        mediaControls.setAttribute("data-conf_type", conf_type);
        mediaControls.setAttribute("data-mikrofon", true);
        mediaControls.setAttribute("data-admin", false);
        mediaControls.setAttribute("data-konusma", 0);
        mediaControls.setAttribute("data-bekleme_sirasi", 0);

    mediaElementContainer.appendChild(mediaControls);  // wrappere ekledik  
   
    // namex div kur 
   var namex=document.createElement('div');
      namex.id="name"+event.userid;
      mediaControls.appendChild(namex); 
      namex.className="namex"; 

   // mesajx div kur
   var mesajx=document.createElement('div');
      mesajx.id="mesaj"+event.userid;
      mediaControls.appendChild(mesajx); 
      mesajx.className="mesajx";

   // media div kur
   var mediax=document.createElement('div');
      mediax.id="media"+event.userid;
      mediax.setAttribute("conf_type","");
      mediaControls.appendChild(mediax);
      mediax.className="mediax";
      
    // moderateur div kur
    var moderx=document.createElement('div');
      moderx.id="moder"+event.userid;
      mediaControls.appendChild(moderx); 
      moderx.className="moderx"; 

     // konusx div kur
   var konusx=document.createElement('div');
      konusx.id="konus"+event.userid;
      mediaControls.appendChild(konusx); 
      konusx.className="konusx"; 
      

    /* **** AVATAR için img kur **** */
  var imagex=document.createElement('img');
      imagex.id="img"+event.userid;
      mediaControls.appendChild(imagex); 
      imagex.className="imagex"; 
      if(MediaTag=="AUDIO" || conf_type=="audioconf"){ document.getElementById("img"+event.userid).src= "avatar.png";}
    /* **** media element i div mediax e yukle **** */
      document.getElementById("media"+event.userid).appendChild(event.mediaElement);     
}
// yani BEN
else {
 // Ecran Share yüzünden Ikinci bir local baglanti varmi 
 var nbr_local=document.getElementById("wrapper").childElementCount;
 //console.log("ONSTREAM LOCAL nbr_local"+nbr_local);
      // Bu 2ci Baglanti
      if(nbr_local >=1) { document.getElementById("media"+event.userid).appendChild(event.mediaElement);}
      
      // bu 1ci baglanti
      else {
        var kisi_adi=	document.getElementById('name').value;
        var kisi_id=event.userid;
        // önce bir div kur
        var mediaElementContainer = document.getElementById("wrapper")
          
        var mediaControls = document.createElement('div');
          mediaControls.className = 'media-controls';
          mediaControls.id = event.userid;
          mediaControls.title=kisi_adi;
          mediaControls.setAttribute("data-stream_type", "local");
          mediaControls.setAttribute("data-conf_type", conf_type);
          mediaControls.setAttribute("data-mikrofon", true);
          mediaControls.setAttribute("data-admin", false);
          mediaControls.setAttribute("data-konusma", 0);
          mediaControls.setAttribute("data-bekleme_sirasi", 0);
        var media_kontrol= document.className="media-controls";

         mediaElementContainer.appendChild(mediaControls);   
        
          // namex div kur 
        var namex=document.createElement('div');
          namex.id="name"+event.userid;
          mediaControls.appendChild(namex); 
          namex.className="namex"; 

        // mesajx div kur
        var mesajx=document.createElement('div');
          mesajx.id="mesaj"+event.userid;
          mediaControls.appendChild(mesajx); 
          mesajx.className="mesajx";

        // media div kur
        var mediax=document.createElement('div');
          mediax.id="media"+event.userid;
          mediax.setAttribute("conf_type","");
          mediaControls.appendChild(mediax);
          mediax.className="mediax";

          // moderateur div kur
        var moderx=document.createElement('div');
          moderx.id="moder"+event.userid;
          mediaControls.appendChild(moderx); 
          moderx.className="moderx"; 

          // konusx div kur
        var konusx=document.createElement('div');
          konusx.id="konus"+event.userid;
          mediaControls.appendChild(konusx); 
          konusx.className="konusx"; 
    
        /* **** media element i div audiox e yukle **** */
        document.getElementById("media"+event.userid).appendChild(event.mediaElement); 
        
        /* **** AVATAR Yükle **** */
        var imagex=document.createElement('img');
          imagex.id="img"+event.userid;
          mediaControls.appendChild(imagex); 
          imagex.className="imagex"; 
          if(conf_type=="audioconf"){ document.getElementById("img"+event.userid).src= "avatar.png";}
          // adimi namex e yukle
          document.getElementById("name"+event.userid).innerText=kisi_adi;
      }
      
  }

  // mediax a eklenen video mu audio mu bul ve islem yap?
    document.getElementById("media"+event.userid).setAttribute("conf_type",MediaTag);  
    //Yerlestir 
    screenSize("onstream");
  
  } // onsream sonu

  // OnStreamEnded
  connection.onstreamended = function(event) {
    var video = document.getElementById(event.streamid);
    if (video && video.parentNode) {
        video.parentNode.removeChild(video);
        screenSize("onstreamended");
    }
};



// on data connection opens
connection.onopen = function(event) {
  setTimeout(function(){ adimi_gonder();  }, 1000); // adimi gecikmeli gönder
 
}
 


// on message 		   
connection.onmessage = function(event) { decoding_data(event.data);};

/* ------------------------ */
/* -------- OPEN INFO ------ */
/* -------------------------- */
function open_info(){
  window.open("info.html","information","menubar=no, status=no, scrollbars=no, width=500, height=400 top=200 left=200");

}
	
// ************************
// Ekran paylasiyoruz
// *************************
  function open_screen_share(){
  connection.addStream({
    screen: true,
    oneway: true,
    streamCallback: function(stream) {
         
  console.log('OPEN_SCREEN8SHARE stream_id: ' + stream.id);
      const share_user_id=document.getElementById("wrapper").firstElementChild.id;     
      document.getElementById("screen_id").setAttribute("data-screen_id",stream.id);
      document.getElementById("screen_id").setAttribute("data-user_id",share_user_id);
      connection.send("open_screen_share!"+stream.id+"!"+share_user_id+"!");
      if(isMobile=="no"){
            document.getElementById("open_screen_share").style.display="none";
            document.getElementById("close_screen_share").style.display="block";
          }   
      // video/audio geçisleri kapat
      document.getElementById("speakUp").style.display="none";
      document.getElementById("videoUp").style.display="none";
      screenSize("open_screen_share");
    }
});

}

// ************************
//Paylasmaya son veriyoruz
// *************************

function close_screen_share(evt) {
  const  stream_id=document.getElementById("screen_id").getAttribute("data-screen_id");
  const share_user_id=document.getElementById("screen_id").getAttribute("data-user_id");
 const durum = document.getElementById("local_status").getAttribute("data-conf_type");
  // stream stop
  var localStream = connection.attachStreams[1];
  localStream.stop();
  
  // paylasma videosu nu wrapper-> media_controller den sil
  var paylasim_ekrani=document.getElementById(stream_id);
  paylasim_ekrani.remove();

 if(durum=="videoconf") { 
      document.getElementById("speakUp").style.display="block";
      document.getElementById("videoUp").style.display="none";
    }
   else{
      document.getElementById("speakUp").style.display="none";
      document.getElementById("videoUp").style.display="block";
   } 

  document.getElementById("screen_id").setAttribute("data-screen_id","paylasmayok");
  document.getElementById("screen_id").setAttribute("data-user_id","paylasmayok");

  //--------------------------------
  connection.send("close_screen_share!"+stream_id+"!"+share_user_id+"!"); 
  if(isMobile=="no"){
            document.getElementById("open_screen_share").style.display="block";
            document.getElementById("close_screen_share").style.display="none";
          }
 console.log("ORIENTATION -> "+document.getElementById("orientation").value);         
  screenSize("close_screen_share");
}


/* *************************************
/ ======= SALONDAN CIKIYOR ============= /
 ****************************************/
 connection.onleave = connection.streamended = connection.onclose = function(event){
  document.getElementById(event.userid).remove();
  screenSize("On Leave");
} //onclose


/* **********************************
------- KENDI  ODANI TERKET ------
// ********************************* */
function stopMedia() {
  var r = confirm(odadancik+" ?");
  
    if (r == true) {
      var yol = window.location.pathname;
      window.location=yol;
    }
    else {return false; }
}



