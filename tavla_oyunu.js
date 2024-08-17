
/* ************************************************ */
/* ****************** GENEL DURUM ***************** */
/* ************************************************ */

/* ************** ENTETE ************************* */


var logo="<img src='toplanti.png' width=35px> Kozeri <span style='font-size:35px;font-weight:bold;'> - Oyun Saray&#x131;  </span>";
var texte_L1="<br><span  style='font-size:25px;color:grey;' ><img src='tavla_masasi.jpeg' width=25px> Tavla Oyunu ";
document.getElementById("entete").innerHTML = "	<div style='padding: 12px 15px 20px 2px;font-size:45px;font-weight:bold; color:#515151;'>"+logo+texte_L1+"</div>";



/* ************* BAGLANTI ********************************* */
var connection = new RTCMultiConnection();

// önemli bir nokta
connection.socketURL = 'https://muazkhan.com:9001/';

// Baglanti opsiyonlari.
connection.socketCustomParameters ='&fullName=Deniz&country=FR&meetingId=xyz';

connection.session = {
    audio: true,
    video: true,
    data:  true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
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

connection.videosContainer = document.getElementById('videos-container');
 	    


// on data connection opens
connection.onopen = function(event) {
	var remoteUserId = event.userid;
	var oyunculara_ilk_mesaj="<span style='color:white; font-weigth:bold;'> OYUNA BA&#x15E;LAMADAN önce genellikle<br> - Pullar&#x131;n Seçimi yap&#x131;l&#x131;r<br> - Oyuna kimin ba&#x15F;l&#x131;iyaca&#x11F;&#x131; belirlenir<br>PUL SECMI için;<br>  - Oyunculardan biri, diger oyuncu ile anla&#x15F;&#x131;p  seçti&#x11F;i pula t&#x131;klayabilir<br>  - Di&#x11F;er oyuncu 'Anla&#x15F;tik' butonuna t&#x131;klay&#x131;nca pullar seçilmis olur</span> ";
	showMessage(oyunculara_ilk_mesaj);
	connection.send('mesaj_simple!'+oyunculara_ilk_mesaj+ '!');	
 }
 
// on message 		   
           connection.onmessage = function(event) {
				decoding_data(event.data);
            };

// on data connection error
            connection.onerror = function(e) {
                console.debug('Veri transfer Hatasi. Hedef user id', e.userid, 'Error', e);
                
            };

// on data connection close
            connection.onclose = function(e) {
                console.debug('Veri baglantisi kapali. Hedef user id', e.userid, 'Error', e);
                
            };


// on video connection opens
			connection.onstream = function(event) {
				// kullaniciyi video ya bagla
				document.getElementById("oyuncular").appendChild(event.mediaElement);		
				var parent = document.getElementById("oyuncular"); 
				
				if (event.type === 'remote') {  // yani arkadasim
					parent.children[1].classList.add("oyuncu1");
					
					$("div#baslik_oyuncu1").show();	
					$("div#baslik_oyuncu1 img#zar_1").hide();
					$("div#baslik_oyuncu1 input#zar_2").hide();
					$("div#baslik_oyuncu1 img#information").show();
					
					$("div#baslik_oyuncu2 img#zar").hide();
					$("div#baslik_oyuncu2 input#zar_1").hide();
					$("div#baslik_oyuncu2 input#zar_2").hide();
					$("div#baslik_oyuncu2 img#turuncu_pul").show();
			  		$("div#baslik_oyuncu2 img#gri_pul").show();
					
					var oyunculara_ilk_mesaj="<span style='color:white; font-weigth:bold;'> OYUNA BA&#x15E;LAMADAN önce genellikle<br> - Pullar&#x131;n Seçimi yap&#x131;l&#x131;r<br> - Oyuna kimin ba&#x15F;l&#x131;iyaca&#x11F;&#x131; belirlenir<br>PUL SECOMI için;<br>  - Oyunculardan biri, diger oyuncu ile anla&#x15F;&#x131;p  seçti&#x11F;i pula t&#x131;klayabilir<br>  - Di&#x11F;er oyuncu 'Anla&#x15F;tik' butonuna t&#x131;klay&#x131;nca pullar seçilmis olur</span> ";
					showMessage(oyunculara_ilk_mesaj);
				}	
				
				else{ // yani ben				
			  		parent.children[0].classList.add("oyuncu2");
			  		var ilk_oyuncuya_mesaj="<span style='color:White; font-weigth:bold;'> HOS HELDINIZ  iyi oyunlar </span><br><br> <span style='font-weight: normal;'> Arkada&#351;&#x131;n&#x131;z hemen ba&#287;lanam&#x131;yorsa payla&#351;t&#x131;&#287;&#x131;n&#x131;z TAVLA MASASI  ad&#x131;ndan emin olun.<br><br>Küçük - Büyük harflere dikkat !</span>";
			  		showMessage(ilk_oyuncuya_mesaj);
			  		
			  		$("div#baslik_oyuncu1").show();	
			  		$("div#baslik_oyuncu1 input#zar_1").hide();
					$("div#baslik_oyuncu1 input#zar_2").hide();
			  		$("div#baslik_oyuncu1 img#information").show();
			  		
			  		$("div#baslik_oyuncu2").show();
			  		$("div#baslik_oyuncu2 img#masayi_terket").hide();
			  		$("div#baslik_oyuncu2 img#turuncu_pul").hide();
			  		$("div#baslik_oyuncu2 img#gri_pul").hide();
					$("div#baslik_oyuncu2 img#anlastik").hide();
					$("div#baslik_oyuncu2 img#yeni_oyun").hide();
					$("div#baslik_oyuncu2 img#zar").hide();
					$("div#baslik_oyuncu2 input#zar_1").hide();
					$("div#baslik_oyuncu2 input#zar_2").hide();
				
				}

			} // onstream sonu 

/* ========================= */
/* ==== RETOUR HOME ======== */
/* ========================= */
$("img#retour").click(function(){
	if (window.confirm("Tavla masasini terketmek mi istiyorsunuz?")) {
		window.location.href = "tavla_oyunu.html";
	   }
	   else {reurn;}
    
});

/* =========================== */
/* =====   INFORMATION ========*/
/* =========================== */

$("img#info").click(function(){
	$("#aciklamalar" ).show();
	 $("#aciklamalar" ).dialog({
      autoOpen: true,
      modal: true,
      width: 500,
	  height: 300,
	  position:['middle',200],
      buttons: [

		{
			text: "Kapat",
			click: function() {
				$( this ).dialog( "close" );
			}
		}
	],
      show: {
        effect: "slide",
        duration: 1500
      },
      hide: {
        effect: "fade",
        duration: 1000
      }
    });
    
});



/* =========================== */
/* ===== ODAYI TERKET ========*/
/* =========================== */
$("img#salonu_terket").click(function(){
	if (window.confirm("Tavla masasini terketmek mi istiyorsunuz?")) {
	 location.reload();	
	}
	else {reurn;}
})

/* =========================== */
/* ==== YENI PARTI ========*/
/* =========================== */
$("img#masayi_terket").click(function(){
	if (window.confirm("Yeni partiye baslamakmi istiyorsunuz?")) { 

	var oyunculara_ilk_mesaj="<span style='color:white; font-weigth:bold;'> OYUNA BA&#x15E;LAMADAN önce genellikle<br> - Pullar&#x131;n Seçimi yap&#x131;l&#x131;r<br> - Oyuna kimin ba&#x15F;l&#x131;iyaca&#x11F;&#x131; belirlenir<br>PUL SECOMI için;<br>  - Oyunculardan biri, diger oyuncu ile anla&#x15F;&#x131;p  seçti&#x11F;i pula t&#x131;klayabilir<br>  - Di&#x11F;er oyuncu 'Anla&#x15F;tik' butonuna t&#x131;klay&#x131;nca pullar seçilmis olur</span> ";
	showMessage(oyunculara_ilk_mesaj);
connection.send('mesaj_simple!'+oyunculara_ilk_mesaj+ '!');

		
	$("div#baslik_oyuncu1").show();
	$("div#baslik_oyuncu1 input#zar_1").hide();
	$("div#baslik_oyuncu1 input#zar_2").hide();	
	
	$("div#baslik_oyuncu2").show();
	$("div#baslik_oyuncu2 img#turuncu_pul").show();
	$("div#baslik_oyuncu2 img#gri_pul").show();
	$("div#baslik_oyuncu2 img#masayi_terket").hide();
	$("div#baslik_oyuncu2 img#yeni_oyun").hide();
	$("div#baslik_oyuncu2 input#zar_1").hide();
	$("div#baslik_oyuncu2 input#zar_2").hide();
	
	// Önce bütün pullari sil
	$("div.piece").remove();
	$("div.toplanan_pul").remove();
	$("div.kirik_pul").remove();
	
	$("button#zar_at").hide();
	$("button#oynadim").hide();
	
	$("input#arbit").attr("data-pul_secimi_tamam","0");
	$("input#dice").attr("data-local_user_zara","0");
	$("input#dice").attr("data-local_user_zarb","0");
	$("input#dice").attr("data-remote_user_zara","0");
	$("input#dice").attr("data-remote_user_zarb","0");
	
	
connection.send("yeni_parti!");

}
else{}	
})
/* =========================== */
/* ==== OYUNU TERKET ========*/
/* =========================== */
$("img#yeni_oyun").click(function(){
	if (window.confirm("Oyunun galibi rakibiniz diyorsunuz ?")) {
	 
	 // Önce bütün pullari sil
	$("div.piece").remove();
	$("div.toplanan_pul").remove();
	$("div.kirik_pul").remove();
	
	start_layout(); 
	$("button#zar_at").hide();
	$("button#oynadim").hide();
	
connection.send("yeni_oyun!");	
	
	}
	else {}
})


/* =========================== */
/* ==== GRI PULU SECTI ========*/
/* =========================== */
$("div#baslik_oyuncu2 img#gri_pul").click(function(){
	var oyuncu_sayisi=document.getElementById("oyuncular").childElementCount; 
	if($("input#arbit").attr("data-pul_secimi_tamam")=="1" || oyuncu_sayisi==1){return;} // pul secimi tamam tiklama yok
	
	else { 
	var rakibe_mesaj_texte="siyah_pul_secimi!";
	connection.send(rakibe_mesaj_texte);
	showMessage("<span style='color:white; font-weigth:bold;'> Rakibiniz kabul ederse siz </span><span style='color:red'>Gri pullarla </span><span > oynuyacaks&#x131;n&#x131;z. </span>");
	$("input#arbit").attr("data-remote_user_pul","turuncu_pul");
	$("input#arbit").attr("data-local_user_pul","gri_pul");
	$("div#baslik_oyuncu2 img#anlastik").hide();
	return;
	}
	})

/* =========================== */
/* ==== TURUNCU PULU SECTI ========*/
/* =========================== */
$("div#baslik_oyuncu2 img#turuncu_pul").click(function(){
	var oyuncu_sayisi=document.getElementById("oyuncular").childElementCount;
	if($("input#arbit").attr("data-pul_secimi_tamam")=="1"|| oyuncu_sayisi==1){return;}// pul secimi tamam tiklama yok
	
	else {
	var rakibe_mesaj_texte="turuncu_pul_secimi!";
	connection.send(rakibe_mesaj_texte);
	showMessage("<span style='color:white; font-weigth:bold;'> Rakibiniz kabul ederse siz</span><span style='color:red'> Turuncu pullarla </span><span>  oynuyacaks&#x131;n&#x131;z. </span>");
	$("input#arbit").attr("data-remote_user_pul","gri_pul");
	$("input#arbit").attr("data-local_user_pul","turuncu_pul");
	$("div#baslik_oyuncu2 img#anlastik").hide();
	return;
	}
	})





/* ================================== */
/* == Rakibin SECTIGI PULUN KABULU == */
/* =================================== */
$("div#baslik_oyuncu2 img#anlastik").click(function(){
	if($("input#arbit").attr("data-remote_user_pul")=="gri_pul") {$("div#baslik_oyuncu2 img#gri_pul").hide();var texte_pul_secimi_tamam=" Turuncu ";}
	else if($("input#arbit").attr("data-remote_user_pul")=="turuncu_pul") {$("div#baslik_oyuncu2 img#turuncu_pul").hide();var texte_pul_secimi_tamam=" Gri ";}
	$("div#baslik_oyuncu2 img#anlastik").hide();
	$("input#arbit").attr("data-pul_secimi_tamam","1");
	
	var ortak_mesaj1="<span style='color:white; font-weigth:bold;'> Pul seçimi Tamamlandi <br> Siz"+ texte_pul_secimi_tamam +"pullarla oynuyorsunuz.<br><br> Oyuna kimin ba&#x15F;layaca&#x11F;&#x131;n&#x131; belirlemek için lütfen ZAR butonuna t&#x131;klay&#x131;n</span>";
	showMessage(ortak_mesaj1);
	connection.send("pul_secimi_tamam!");
	$("div#baslik_oyuncu2 img#zar").show();
})

/* ================================ */
/* ==== BASLAMAK ICIN ZAR ATIYOR ====*/
/* ================================ */
$("div#baslik_oyuncu2 img#zar").click(function(){
	
	baslama_zari_at();
	// Lokal zarlari gOster
	$("div#baslik_oyuncu2 input#zar_1").show();
	$("div#baslik_oyuncu2 input#zar_2").show();
	var local_user_zara=$("input#dice").attr("data-local_user_zara"); $("div#baslik_oyuncu2 input#zar_1").val(local_user_zara);
	var local_user_zarb=$("input#dice").attr("data-local_user_zarb"); $("div#baslik_oyuncu2 input#zar_2").val(local_user_zarb);
	$("div#baslik_oyuncu2 img#zar").hide();
	
	
	
	
	var local_zara=parseInt($("input#dice").attr("data-local_user_zara"),10);
	var local_zarb=parseInt($("input#dice").attr("data-local_user_zarb"),10);
	var remote_zara=parseInt($("input#dice").attr("data-remote_user_zara"),10);
	var remote_zarb=parseInt($("input#dice").attr("data-remote_user_zarb"),10);
	
	var sum_local=local_zara+local_zarb;
	var sum_remote=remote_zara+remote_zarb;
	
	if(sum_local >0 && sum_remote>0){ 
	
	// Atilan zarlar esit yeniden basla	
	if( sum_local == sum_remote ){
		// egalite
		showMessage("<span style='color:red;font-weight:bold'>Atilan zarlar e&#x15F;it. Tekrar zar atal&#x131;m lütfen</span>");
		$("div#baslik_oyuncu2 img#zar").show();
		$("input#dice").attr("data-local_user_zara",0);
		$("input#dice").attr("data-local_user_zarb",0);
		$("input#dice").attr("data-remote_user_zara",0);
		$("input#dice").attr("data-remote_user_zarb",0);
	connection.send("atilan_zarlar_esit!");
		$("div#baslik_oyuncu2 img#zar").show();	
	}
	
	else if (sum_local > sum_remote ){
		showMessage("<span style='color:red;font-weight:bold'>Oyuna siz ba&#x15F;liyorsunuz</span> <br>zar at&#x131;n fütfen");
		
		$("div#baslik_oyuncu2 img#masayi_terket").show();
		$("div#baslik_oyuncu2 img#yeni_oyun").show();
	connection.send("oyuna_rakip_basliyor!");
		start_layout();
		
		$("div.die").removeClass("active");
			
		$("button#zar_at").show();
		showMessage("Lütfen zar at&#x131;p, oynay&#x131;n !");
	}
	
	else if(sum_remote > sum_local) {
		showMessage("<span style='color:red;font-weight:bold'>Oyuna rakibiniz ba&#x15F;l&#x131;yor</span>");		
		
		$("div#baslik_oyuncu2 img#masayi_terket").show();
		$("div#baslik_oyuncu2 img#yeni_oyun").show();
	connection.send("oyuna_siz_basliyorsunuz!");
		start_layout();
		
		$("div.die").removeClass("active");
		}
	
	}
	
	
})


function showMessage(str) {
		$message = $("div#mesaj");
		if ($message.is(":visible")) $message.fadeOut();
		$message.html(str).fadeIn();
	}

function rakip__baslama_zari_goster(zar1,zar2){
	$("div#baslik_oyuncu1").show();
	$("div#die1").addClass("active").attr("data-value",zar1)
	$("div#die2").addClass("active").attr("data-value",zar2);
	
	$("div#baslik_oyuncu1 input#zar_1").val(zar1);
	$("div#baslik_oyuncu1 input#zar_2").val(zar2);
	
	$("input#dice").attr("data-remote_user_zara",zar1); 
	$("input#dice").attr("data-remote_user_zarb",zar2); 
	
	$("div#baslik_oyuncu1 input#zar_1").show();
	$("div#baslik_oyuncu1 input#zar_2").show();	
	}



function rakip_zari_goster(zar1,zar2){
	$("div#baslik_oyuncu1").show();
	$("div#die1").addClass("active").attr("data-value",zar1)
	$("div#die2").addClass("active").attr("data-value",zar2);
	
	$("div#baslik_oyuncu1 input#zar_1").val(zar1);
	$("div#baslik_oyuncu1 input#zar_2").val(zar2);
	
	$("input#dice").attr("data-remote_user_zara",zar1); 
	$("input#dice").attr("data-remote_user_zarb",zar2); 
		
	}

/* ************************************************ */
/* ************ HERSEYIN BASLANGICI *************** */
/* ************************************************ */

document.getElementById('btn-openjoin-room').onclick = function() {
	var oda = document.getElementById("OdaIsmi").value;
	if (oda =="") { alert("masa adi yok")}
    else {
    	connection.openOrJoin(oda);
    	document.getElementById('btn-openjoin-room').style.visibility = "hidden";
    	document.getElementById("kontrol").style.display = "none"; // Kontrolu kapat  	  	   	
    	$("div#board").show();
    	//$("button#pullari_yerlestir").hide(); // Pullari yerlestir butonunu kapa  	
    	
    	}
    }
       	
	var hasTouchscreen = 'ontouchstart' in window;
	if(hasTouchscreen){var isMobile=1;}
	else{var isMobile=0;}
	if(isMobile==1){init_mobile();}
	else {init_pc();}
	
	
	
	
	function init_mobile(){
		var  kanat_genislik=20; // giris
		var ucgen_ust_boy=16; //vw
		var ucgen_alt_boy=ucgen_ust_boy;
	
		var sol_kanat_marji=0.1;
		/* ******************************* */
		/***** Cerceve kalinlik hesaplari  */
		/* ******************************** */
		var kanat_kenar_katsayisi=0.04;
		var sol_kanat_sag_kenar_katsayisi=0.1;
		
		var sol_kenar_sol_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_ust_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_alt_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_sag_kalinlik=kanat_genislik*sol_kanat_sag_kenar_katsayisi;
	   
		var sag_kenar_sol_kalinlik=sol_kenar_sag_kalinlik;
		var sag_kenar_ust_kalinlik=sol_kenar_ust_kalinlik;
		var sag_kenar_alt_kalinlik=sol_kenar_alt_kalinlik;
		var sag_kenar_sag_kalinlik=sol_kenar_sol_kalinlik;
		
		var point_genislik=16.66; //% olarak
		var point_yukseklik=45.16; //% olarak
	
		$("div.side").css({'width': kanat_genislik+"vw"});
		$("div.side.left").css({'margin-right': sol_kanat_marji+'vw',"border-top-width" : sol_kenar_ust_kalinlik+"vw", "border-right-width" : sol_kenar_sag_kalinlik+"vw ","border-left-width" : sol_kenar_sol_kalinlik+"vw ", "border-bottom-width" : sol_kenar_alt_kalinlik+"vw"});
		$("div.side.right").css({"border-top-width" : sag_kenar_ust_kalinlik+"vw", "border-right-width" : sag_kenar_sag_kalinlik+"vw ","border-left-width" : sag_kenar_sol_kalinlik+"vw ", "border-bottom-width" : sag_kenar_alt_kalinlik+"vw"});
	
	   /* *******POINT Boyutlari ********** */
	   $("div.side div.point").css({"width":point_genislik+"%" , "height": point_yukseklik+"%"});
	
		/* ******* KANAT UCGEN BOYLARI *****************  */
		$("div.quarter.top div.point div.triangle").css({"border-top-width":ucgen_ust_boy+"vw"});
		$("div.quarter.bottom div.point div.triangle").css({"border-bottom-width":ucgen_alt_boy+"vw"});
	
		/* ******* OYNANAN ZARLAR **** */
		var zar_boyut_katsayisi=0.125;
		var zar_boyut=zar_boyut_katsayisi*kanat_genislik; // 2.5 vw
	
		var zar_pip_left=0.12*zar_boyut;  //0.3 vw
		var zar_pip_center=0.42*zar_boyut; //1.05vw
		var zar_pip_right=0.12*zar_boyut;
		var zar_pip_top=0.12*zar_boyut;
		var zar_pip_middle=0.42*zar_boyut;
		var zar_pip_bottom=0.12*zar_boyut;
	
		$("div.die").css({"width": zar_boyut+"vw", "height": zar_boyut+"vw"});
		
		$("div.die div.face div.pip.left").css({"left":zar_pip_left+"vw"});
		$("div.die div.face div.pip.center").css({"left":zar_pip_center+"vw"});
		$("div.die div.face div.pip.right").css({"right":zar_pip_right+"vw"});
		$("div.die div.face div.pip.top").css({"top":zar_pip_top+"vw"});
		$("div.die div.face div.pip.middle").css({"top":zar_pip_middle+"vw"});
		$("div.die div.face div.pip.bottom").css({"bottom":zar_pip_bottom+"vw"});
	
		/* ************* BOYUTLARI GOSTER ***************** */
		var boyut_top=1.75*kanat_genislik;
	 
		var kanat_border_kalinlik=sol_kenar_sol_kalinlik+sol_kenar_sag_kalinlik;
		var kanat_genislik=kanat_genislik+kanat_border_kalinlik;
		var masa_genislik=(kanat_genislik*2)+sol_kanat_marji;
		var masa_genislik_px=parseInt(masa_genislik*window.innerWidth/100);
		
		var masa_yukseklik=(point_yukseklik+sol_kenar_ust_kalinlik);
		var masa_yukseklik_px=parseInt(masa_yukseklik*window.innerWidth/100);
		/*
		$("div#boyutlar").css({"position":"absolute","margin-top":boyut_top+"%", "color":"white"});
		
		$("div#boyutlar").html(
			"Ekran geni&#351;li&#287;i: "+window.screen.width+ "px <-->   yüksekli&#287;i: "+window.screen.height+"px<br>"+
			"Pencere geni&#351;li&#287;i: "+window.innerWidth +"px  <--> yüksekli&#287;i: "+ window.innerHeight + "px<br>"
			
		);
	
		window.addEventListener('resize', function() {
			// viewport and full window dimensions will change
			$("div#boyutlar").html(
				"Ekran genisli&#287;i: "+window.screen.width+ "px <-->   yüksekli&#287;i: "+window.screen.height+"px<br>"+
				"Pencere genisli&#287;i:"+window.innerWidth +"px  <--> yüksekli&#287;i: "+ window.innerHeight + "px<br>"
				);
		});*/
		/* ************* TOPLAMA KUTULARI *********** */
	
		var toplama_kutulari_sol_marj=2.005*kanat_genislik; // 45.8 pour kanat genislik=20
		var toplama_kutulari_genislik=0.2*kanat_genislik; //4
		var toplama_kutulari_yukseklik=1.065*ucgen_ust_boy; //17
		var toplama_kutu1_ust_marj=1.10*ucgen_ust_boy; //17.6
		var toplama_kutu2_ust_marj=0; //0
		$("div.toplanan_pul_kutusu1").css({"margin-left": toplama_kutulari_sol_marj+"vw" , "width":toplama_kutulari_genislik+"vw" ,"height":toplama_kutulari_yukseklik+"vw", "margin-top":toplama_kutu1_ust_marj+"vw"});
		$("div.toplanan_pul_kutusu2").css({"margin-left": toplama_kutulari_sol_marj+"vw" , "width":toplama_kutulari_genislik+"vw" ,"height":toplama_kutulari_yukseklik+"vw","margin-top":toplama_kutu2_ust_marj+"vw"});
	
		/* ************ OYUNCULAR ****************************  */
		/* Oyunculari çerçevele */
		var oyuncular_sol_marji=2.23*kanat_genislik;
		var oyuncular_genislik=0.69*kanat_genislik;
		var oyuncular_yukseklik=1.535*kanat_genislik;
		
		var mesaj_sol_marj=2.235*kanat_genislik;
		var mesaj_yukseklik=10.5;// vw
		var mesaj_ust_marj=12; //%
		
		var baslik_sol=2.25*kanat_genislik;//51.5%
		var baslik_genislik=0.682*kanat_genislik; //15.6 vw
		var baslik_yukseklik= 0.067*kanat_genislik;
		var baslik_oyuncu2_ust_marj=0.995*kanat_genislik;   //39.5vh
	
		$("div.oyuncular").css({"margin-left":oyuncular_sol_marji+"%","margin-top":"0%","width":oyuncular_genislik+"vw","height":oyuncular_yukseklik+"vw"/*,"border-style":"solid", "border-width":"1px","border-color":"yellow"*/});
		
		$("div.oyuncular video.oyuncu1").css({"left": baslik_sol+"%", "width":baslik_genislik+"vw","height":"12vw","top":"2%"});
		$("div.baslik_oyuncu1").css({"left":baslik_sol+"%","width":baslik_genislik+"vw","height":baslik_yukseklik+"vw","margin-top":"0vh"/*, "border-style":"solid", "border-width":"1px","border-color":"red"*/});
	
		$("div.mesaj").css({"margin-left":mesaj_sol_marj+"%","width":oyuncular_genislik+"vw","height":mesaj_yukseklik+"vw","margin-top":mesaj_ust_marj+"%"/*,"border-style":"solid", "border-width":"1px","border-color":"blue"*/});
	
		$("div.oyuncular video.oyuncu2").css({ "left":baslik_sol+"%","width":baslik_genislik+"vw","height":"12vw","top":"60%"});
		$("div.baslik_oyuncu2").css({"left":baslik_sol+"%","width":baslik_genislik+"vw","height":baslik_yukseklik+"vw","margin-top":baslik_oyuncu2_ust_marj+"vw"/*, "border-style":"solid", "border-width":"1px","border-color":"green"*/});
	
	
	
		
	
	
	
		$("div#mesaj").css({'font-size':'9px'});
		$("div#baslik_oyuncu1 img#zar").css({'width':'1.1vw'});
		
		$("div#baslik_oyuncu2 input#zar_1").css({'width':'1.1vw', 'height':'1.1vw'});
		$("div#baslik_oyuncu2 input#zar_2").css({'width':'1.1vw', 'height':'1.1vw'});
		$("div#baslik_oyuncu1 input#zar_1").css({'width':'1.1vw', 'height':'1.1vw'});
		$("div#baslik_oyuncu1 input#zar_2").css({'width':'1.1vw', 'height':'1.1vw'});
	
		$("img").css({'width':'1.4vw','height':'1.4vw'});
		
		return;
	}
	
	
	function init_pc(){	
	
		var  kanat_genislik=20; // giris
		var ucgen_ust_boy=16; //vw
		var ucgen_alt_boy=ucgen_ust_boy;
	
		var sol_kanat_marji=0.1;
		/* ******************************* */
		/***** Cerceve kalinlik hesaplari  */
		/* ******************************** */
		var kanat_kenar_katsayisi=0.07;
		var sol_kanat_sag_kenar_katsayisi=0.1;
		
		var sol_kenar_sol_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_ust_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_alt_kalinlik=kanat_genislik*kanat_kenar_katsayisi;
		var sol_kenar_sag_kalinlik=kanat_genislik*sol_kanat_sag_kenar_katsayisi;
	   
		var sag_kenar_sol_kalinlik=sol_kenar_sag_kalinlik;
		var sag_kenar_ust_kalinlik=sol_kenar_ust_kalinlik;
		var sag_kenar_alt_kalinlik=sol_kenar_alt_kalinlik;
		var sag_kenar_sag_kalinlik=sol_kenar_sol_kalinlik;
		
		var point_genislik=16.66; //% olarak
		var point_yukseklik=45.16; //% olarak
	
		$("div.side").css({'width': kanat_genislik+"vw"});
		$("div.side.left").css({'margin-right': sol_kanat_marji+'vw',"border-top-width" : sol_kenar_ust_kalinlik+"vw", "border-right-width" : sol_kenar_sag_kalinlik+"vw ","border-left-width" : sol_kenar_sol_kalinlik+"vw ", "border-bottom-width" : sol_kenar_alt_kalinlik+"vw"});
		$("div.side.right").css({"border-top-width" : sag_kenar_ust_kalinlik+"vw", "border-right-width" : sag_kenar_sag_kalinlik+"vw ","border-left-width" : sag_kenar_sol_kalinlik+"vw ", "border-bottom-width" : sag_kenar_alt_kalinlik+"vw"});
	
	   /* *******POINT Boyutlari ********** */
	   $("div.side div.point").css({"width":point_genislik+"%" , "height": point_yukseklik+"%"});
	
		/* ******* KANAT UCGEN BOYLARI *****************  */
		$("div.quarter.top div.point div.triangle").css({"border-top-width":ucgen_ust_boy+"vw"});
		$("div.quarter.bottom div.point div.triangle").css({"border-bottom-width":ucgen_alt_boy+"vw"});
	
		/* ******* OYNANAN ZARLAR **** */
		var zar_boyut_katsayisi=0.125;
		var zar_boyut=zar_boyut_katsayisi*kanat_genislik; // 2.5 vw
	
		var zar_pip_left=0.12*zar_boyut;  //0.3 vw
		var zar_pip_center=0.42*zar_boyut; //1.05vw
		var zar_pip_right=0.12*zar_boyut;
		var zar_pip_top=0.12*zar_boyut;
		var zar_pip_middle=0.42*zar_boyut;
		var zar_pip_bottom=0.12*zar_boyut;
	
		$("div.die").css({"width": zar_boyut+"vw", "height": zar_boyut+"vw"});
		
		$("div.die div.face div.pip.left").css({"left":zar_pip_left+"vw"});
		$("div.die div.face div.pip.center").css({"left":zar_pip_center+"vw"});
		$("div.die div.face div.pip.right").css({"right":zar_pip_right+"vw"});
		$("div.die div.face div.pip.top").css({"top":zar_pip_top+"vw"});
		$("div.die div.face div.pip.middle").css({"top":zar_pip_middle+"vw"});
		$("div.die div.face div.pip.bottom").css({"bottom":zar_pip_bottom+"vw"});
	
		/* ************* BOYUTLARI GOSTER ***************** */
		var boyut_top=1.75*kanat_genislik;
	 
		var kanat_border_kalinlik=sol_kenar_sol_kalinlik+sol_kenar_sag_kalinlik;
		var kanat_genislik=kanat_genislik+kanat_border_kalinlik;
		var masa_genislik=(kanat_genislik*2)+sol_kanat_marji;
		var masa_genislik_px=parseInt(masa_genislik*window.innerWidth/100);
		
		var masa_yukseklik=(point_yukseklik+sol_kenar_ust_kalinlik);
		var masa_yukseklik_px=parseInt(masa_yukseklik*window.innerWidth/100);

		/* ************* TOPLAMA KUTULARI *********** */
	
		var toplama_kutulari_sol_marj=2.005*kanat_genislik; // 45.8 pour kanat genislik=20
		var toplama_kutulari_genislik=0.2*kanat_genislik; //4
		var toplama_kutulari_yukseklik=1.065*ucgen_ust_boy; //17
		var toplama_kutu1_ust_marj=1.10*ucgen_ust_boy; //17.6
		var toplama_kutu2_ust_marj=0; //0
		$("div.toplanan_pul_kutusu1").css({"margin-left": toplama_kutulari_sol_marj+"vw" , "width":toplama_kutulari_genislik+"vw" ,"height":toplama_kutulari_yukseklik+"vw", "margin-top":toplama_kutu1_ust_marj+"vw"});
		$("div.toplanan_pul_kutusu2").css({"margin-left": toplama_kutulari_sol_marj+"vw" , "width":toplama_kutulari_genislik+"vw" ,"height":toplama_kutulari_yukseklik+"vw","margin-top":toplama_kutu2_ust_marj+"vw"});
	
		/* ************ OYUNCULAR ****************************  */
		 var oyuncular_sol_marji=2.23*kanat_genislik;
		var oyuncular_genislik=0.69*kanat_genislik;
		var oyuncular_yukseklik=1.535*kanat_genislik;
		
		var mesaj_sol_marj=2.235*kanat_genislik;
		var mesaj_yukseklik=10.5;// vw
		var mesaj_ust_marj=12; //%
		
		var baslik_sol=2.25*kanat_genislik;//51.5%
		var baslik_genislik=0.682*kanat_genislik; //15.6 vw
		var baslik_yukseklik= 0.067*kanat_genislik;
		var baslik_oyuncu2_ust_marj=0.995*kanat_genislik;   //39.5vh
	
		$("div.oyuncular").css({"margin-left":oyuncular_sol_marji+"%","margin-top":"0%","width":oyuncular_genislik+"vw","height":oyuncular_yukseklik+"vw"/*,"border-style":"solid", "border-width":"1px","border-color":"yellow"*/});
		
		$("div.oyuncular video.oyuncu1").css({"left": baslik_sol+"%", "width":baslik_genislik+"vw","height":oyuncular_yukseklik+"vw","top":"2%"});
		$("div.baslik_oyuncu1").css({"left":baslik_sol+"%","width":baslik_genislik+"vw","height":baslik_yukseklik+"vw","margin-top":"0vh"/*, "border-style":"solid", "border-width":"1px","border-color":"red"*/});
	
		$("div.mesaj").css({"margin-left":mesaj_sol_marj+"%","width":oyuncular_genislik+"vw","height":mesaj_yukseklik+"vw","margin-top":mesaj_ust_marj+"%"/*,"border-style":"solid", "border-width":"1px","border-color":"blue"*/});
	
		$("div.oyuncular video.oyuncu2").css({ "left":baslik_sol+"%","width":baslik_genislik+"vw","height":oyuncular_yukseklik+"vw","top":"60%"});
		$("div.baslik_oyuncu2").css({"left":baslik_sol+"%","width":baslik_genislik+"vw","height":baslik_yukseklik+"vw","margin-top":baslik_oyuncu2_ust_marj+"vw"/*, "border-style":"solid", "border-width":"1px","border-color":"green"*/});
		
	
	
		$("div#mesaj").css({'font-size':'13px'});
		$("div#baslik_oyuncu1 img#zar").css({'width':'1vw'});
		
		$("div#baslik_oyuncu2 input#zar_1").css({'width':'1vw', 'height':'1vw'});
		$("div#baslik_oyuncu2 input#zar_2").css({'width':'1vw', 'height':'1vw'});
		$("div#baslik_oyuncu1 input#zar_1").css({'width':'1vw', 'height':'1vw'});
		$("div#baslik_oyuncu1 input#zar_2").css({'width':'1vw', 'height':'1vw'});
		
	
	
	
	
		var resim_boyut=kanat_genislik*0.06;
		$("img").css({'width':resim_boyut+'vw','height':resim_boyut+'vw'});
		
		return;
	}

/* *********************************************************************** */
/* * ZAR at BUTON u acik ve PULLARI TAVLAYA  YERLESTIR acik  ************* */
/* *********************************************************************** */
$("button#zar_at").click(function () {
	
		$("div#baslik_oyuncu2 input#zar_1").hide();
		$("div#baslik_oyuncu2 input#zar_2").hide();
		$("div#baslik_oyuncu1 input#zar_1").hide();
		$("div#baslik_oyuncu1 input#zar_2").hide();
		
connection.send("baslik_zarlari_kapat!");		
	
	zar_at();})

function start_layout(){

// Önce bütün pullari sil
$("div.piece").remove();
$("div.toplanan_pul").remove();

// toplama kutularini kapat
$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isaretli");
$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isaretli");

	
 $("div.point").each(function(){
 	if($(this).attr("data-id") ==24){
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		} 
	
 	if($(this).attr("data-id") ==19){
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);		
 		} 
 	
 	if($(this).attr("data-id") ==17){
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);		
 		}
 		
 	if($(this).attr("data-id") ==13){
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);		
 		} 	
 		 
 	if($(this).attr("data-id") ==12){
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);		
 		}
				 	
 	if($(this).attr("data-id") ==8){
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);	
 		}
 		
 	if($(this).attr("data-id") ==6){
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player1\"></div>" ).prependTo( this);		
 		}	
 		
 	if($(this).attr("data-id") ==1){
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		$( "<div class=\"piece player2\"></div>" ).prependTo( this);
 		} 			 	
 })
 
	
	$("button#zar_at").hide();
	$("button#oynadim").hide();
	
	
}

// ******************************** //
// **********  ZAR AT ************* //
// ******************************** //

function baslama_zari_at(){ 
var rakibe_mesaj_texte="baslama_zari!";
		$("div.die").effect( "shake" );
		for (var i = 1; i < 3; i++) {
			var roll = Math.floor(Math.random() * 6) + 1;
			$("div#die" + i).addClass("active").attr("data-value", roll);
			var rakibe_mesaj_texte=rakibe_mesaj_texte+roll+"!";

			if(i==1){$("input#dice").attr("data-local_user_zara",roll);}
			if(i==2){$("input#dice").attr("data-local_user_zarb",roll);}		
		}						
connection.send(rakibe_mesaj_texte);	
	
}



function zar_at(){
		
		var rakibe_mesaj_texte="zar!";
		$("div.die").effect( "shake" );
		for (var i = 1; i < 3; i++) {
			var roll = Math.floor(Math.random() * 6) + 1;
			$("div#die" + i).addClass("active").attr("data-value", roll);
			var rakibe_mesaj_texte=rakibe_mesaj_texte+roll+"!";		
		}						
		$("button#zar_at").hide();
		$("button#oynadim").show();
connection.send(rakibe_mesaj_texte);

//===== ONCE oyniyacagin pulu sec ====
showMessage("Pullar&#x131;n&#x131;z&#x131; yürütün, Lütfen");
pula_tikla();

gidecegi_yere_tikla();
}
function test_bitirme_modu(oyuncu){
if(oyuncu=="player1"){
	if($("div.toplanan_pul_kutusu1").children().length>=15){var bitirme_modu=1;}
	else {var bitirme_modu=0;}
}

else if(oyuncu=="player2"){
	if($("div.toplanan_pul_kutusu2").children().length>=15){var bitirme_modu=1;}
	else {var bitirme_modu=0;}
}
return bitirme_modu;	
}	


function test_toplama_modu(oyuncu){
if(oyuncu=="player1"){
			// Player1 toplama modunda
var right_quarter_top_ply1=$("div.side.right div.quarter.top div.piece.player1").length;
var left_quarter_top_ply1= $("div.side.left div.quarter.top div.piece.player1").length;
var left_quarter_bottom_ply1= $("div.side.left div.quarter.bottom div.piece.player1").length;
var right_quarter_bottom_ply1=$("div.side.right div.quarter.bottom div.piece.player1").length;

var kirik_pul_pl1=$("div.kirik_pul_kutusu1").children().length;

if((right_quarter_top_ply1+left_quarter_top_ply1+left_quarter_bottom_ply1+kirik_pul_pl1)==0){var toplama_modu=1;}
else {var toplama_modu=0;}
}
if(oyuncu=="player2"){
		// Player2 toplama modunda
var right_quarter_top_ply2=$("div.side.right div.quarter.top div.piece.player2").length;
var left_quarter_top_ply2= $("div.side.left div.quarter.top div.piece.player2").length;
var left_quarter_bottom_ply2= $("div.side.left div.quarter.bottom div.piece.player2").length;
var right_quarter_bottom_ply2=$("div.side.right div.quarter.bottom div.piece.player2").length;
var kirik_pul_pl2=$("div.kirik_pul_kutusu2").children().length;

if((right_quarter_bottom_ply2+left_quarter_top_ply2+left_quarter_bottom_ply2+kirik_pul_pl2)==0){var toplama_modu=1;}
else {var toplama_modu=0;}	
}
return toplama_modu;	
}	


function pula_tikla(){ 
	
		$("input#kayit").attr("data-position","0");	//Temizlik
		$("input#kayit").attr("data-yer","0");	//Temizlik
		$("input#kayit").attr("position_class_player"," ");	//Temizlik
		$("input#kayit").attr("yer_class_player"," ");	//Temizlik
		
		$("div.piece").removeClass("isaret"); //temizlik: tüm pullarin tiklamasini kaldir
		$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
		$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil	
		$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik: Tûm yerlerin isretini sil	
		$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
		$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
connection.send("genel_temizlik!");	
	// ====== KIRIK PUL ISLEMLERI  =====
		$("div.kirik_pul_kutusu2 div.kirik_pul.player2").click(function () {
			$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
			$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli"); 
			
			$(this).addClass("isaretli"); // sadece bu pula isret koy
connection.send("kirik_pul_isreti_26!");
			$("input#kayit").attr("data-position",26); //kayda al; position
			$("input#kayit").attr("position_class_player","player2");
			
			$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
			
			
			return;
		})
		
	$("div.kirik_pul_kutusu1 div.kirik_pul.player1").click(function () {
			$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
			$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
			
			$(this).addClass("isaretli"); // sadece bu pula isret koy
connection.send("kirik_pul_isreti_25!");			
			$("input#kayit").attr("data-position",25); //kayda al; position
			$("input#kayit").attr("position_class_player","player1"); //kayda al: oyuncu
			
			$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
			
			
			return
		})
	
	// ====== NORMAL PUL ISLEMLERI  =====
	$("div.point :nth-last-child(2)").each(function(){
		$(this).addClass("isaret");
		
		$(this).click(function () {
			$("div.piece").removeClass("isaretli"); // Temizlik: tüm  pullarin isaretini sil	
			$(this).addClass("isaretli"); // sadece bu pula isret koy
			
			// ------ positionu kaydet -----
			var position =$(this).parent().attr("data-id");
			if($(this).hasClass("player1")) {$("input#kayit").attr("position_class_player","player1");} //kayda al: oyuncu
			else if($(this).hasClass("player2")) {$("input#kayit").attr("position_class_player","player2");} //kayda al: oyuncu
			$("input#kayit").attr("data-position",position); //kayda al; position		
		
			$("div.point").addClass("gidecegi_yer_isareti"); //Temizlik : bütün yerleci isarete aç
			
			$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
			$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
			
connection.send("pul_isreti!"+position+"!");	
			return
			})
		
	})
}



// ====================================
// =========    ZARLARI OYNA    =======
// ====================================
			 	//if(yer1_toplama=1){	$( "<div class='toplanan_pul "+oyuncu+" isaret'></div>" ).prependTo($("div.toplanan_pul_kutusu1"));	}
function gidecegi_yere_tikla(){

//========= TOPLAMA MODU ISLAMLERI ======= //

$("div.toplanan_pul_kutusu1").click(function(){
	var player1_toplama =test_toplama_modu("player1");
	var baslangic=parseInt($("input#kayit").attr("data-position"),10);
	var oyuncu = $("input#kayit").attr("position_class_player");
	if(player1_toplama==1 && oyuncu=="player1"){		
		$("div.point").find("div.piece.isaretli").remove();
		$( "<div class='toplanan_pul "+oyuncu+" isaret'></div>" ).prependTo($("div.toplanan_pul_kutusu1"));	
			
connection.send("toplama_kutusu1_tikla!"+oyuncu+"!");		
		if(test_bitirme_modu("player1")==1){
connection.send("bitirdi!player1!");			
			showMessage("<span style='color:red;'>Tebrikler, oyunu siz kazand&#x131;n&#x131;z</span><br> zar at&#x131;p yeni oyuna ba&#x15F;layabilirsiniz !");
			//$("button#pullari_yerlestir").show();
			start_layout();
			$("button#zar_at").show();
			$("button#oynadim").hide();
		}
		pula_tikla();
	}
	
})	
	
$("div.toplanan_pul_kutusu2").click(function(){
	var player2_toplama =test_toplama_modu("player2");
	var baslangic=parseInt($("input#kayit").attr("data-position"),10);
	var oyuncu = $("input#kayit").attr("position_class_player");	
	if(player2_toplama==1 && oyuncu=="player2"){
		$("div.point").find("div.piece.isaretli").remove();
		$( "<div class='toplanan_pul "+oyuncu+" isaret'></div>" ).prependTo($("div.toplanan_pul_kutusu2"));
connection.send("toplama_kutusu2_tikla!"+oyuncu+"!");		
		if(test_bitirme_modu("player2")==1){
connection.send("bitirdi!player2!");			
			alert("Tebrikler, ayunu siz kazandiniz");
			showMessage("<span style='color:red;'>Tebrikler, oyunu siz kazand&#x131;n&#x131;z</span><br> zar at&#x131;p yeni oyuna ba&#x15F;layabilirsiniz !");
			//$("button#pullari_yerlestir").show();
			start_layout();
			$("button#zar_at").show();
			$("button#oynadim").hide();
		}
		pula_tikla();
	}
	
})
	
// ====== PULUN GIDECEGI YERE TIKLA  =====
$("div.point").each(function(){

	$(this).click(function () {
		
		// *****  pul toplama modu testi
		if(test_toplama_modu("player1")==1) {
			$("div.toplanan_pul_kutusu1").addClass("gidecegi_yer_isaretli");
connection.send("toplama_kutusu1_ac!");
			} 
		else {
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isaretli");
connection.send("toplama_kutusu1_kapat!");
			}
		if(test_toplama_modu("player2")==1) {
			$("div.toplanan_pul_kutusu2").addClass("gidecegi_yer_isaretli");
connection.send("toplama_kutusu2_ac!");
			}
		else {
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isaretli");
connection.send("toplama_kutusu2_kapat!");			
			}
		
		
		$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil		
connection.send("tum_yerlerin_isaretini_sil!");		
		var baslangic=parseInt($("input#kayit").attr("data-position"),10);
		var oyuncu = $("input#kayit").attr("position_class_player");
		var yer =$(this).attr("data-id");	
		var hedef=$(this).attr("data-id");
		// yerdeki pul sayisi
		var yerdeki_pul_sayisi= $(this).children().length;

		// Yerdeki Pul kimin
		if($("div.point[data-id="+yer+"] div.piece").hasClass("player1")){
			var yerdeki_pulun_sahibi="player1"; 
			var kirik_pul_kutu_id=25; 
			var kirik_pul_kutusu_class="kirik_pul_kutusu1";
			}
		else if($("div.point[data-id="+yer+"] div.piece").hasClass("player2")){
			var yerdeki_pulun_sahibi="player2"; 
			var kirik_pul_kutu_id=26;
			var kirik_pul_kutusu_class="kirik_pul_kutusu2";
			}
		/* ========================== */		
		/* ======= pul kirilacak ==== */
		/* ========================== */
		if(yerdeki_pul_sayisi==2 && yerdeki_pulun_sahibi != oyuncu && oyuncu!=0){ // TEK Pul var

			$(this).addClass("gidecegi_yer_isaretli"); // sadece bu yere isret koy
connection.send("yere_isaret_koy!"+yer+"!");
			
			// ***** yerdeki pulu kir (sil)****** 
			//$("div.point[data-id="+yer+"]").find("div.piece.isaret").remove();
			$("div.point[data-id="+yer+"] :first-child").remove();
connection.send("yerdeki_pulu_kir!"+yer+"!");			
			
			// ***** yerdeki pulu kirik pul kutusuna koy ****** 
			$( "<div class='kirik_pul "+ yerdeki_pulun_sahibi+" isaret'></div>" ).prependTo($("div."+kirik_pul_kutusu_class));	
connection.send("pulu_kirik_kutusuna_koy!"+yerdeki_pulun_sahibi+"!"+kirik_pul_kutusu_class+"!");		
			
			// ***** Kendi pullarimi sil ******
			if(baslangic == 25){
				$("div.kirik_pul_kutusu1").find("div.kirik_pul.isaretli").remove();
connection.send("kirik_pulu_kutudan_sil_25!");				
				}	
			else if(baslangic==26) {
				$("div.kirik_pul_kutusu2").find("div.kirik_pul.isaretli").remove();
connection.send("kirik_pulu_kutudan_sil_26!");				
				}				
			else {
				$("div.point").find("div.piece.isaretli").remove();
connection.send("pul_sil!"+baslangic+"!");				
				}
				
			// benim pulumu yerlestir
			$( "<div class='piece "+oyuncu+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));	
connection.send("pul_ekle!"+oyuncu+"!"+hedef+"!");			
			
			// temizlik yap
			$("input#kayit").attr("data-position","0");	//Temizlik
			$("input#kayit").attr("data-yer","0");	//Temizlik
			$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
			$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
connection.send("tum_yerleri_temizle!");			
			pula_tikla();
		}
		/* ======================== */
		/* ======= pul yürümez ==== */
		/* ======================== */
		else if(yerdeki_pul_sayisi >=3 && yerdeki_pulun_sahibi != oyuncu && oyuncu !=0){ // TEK Pul var
;			alert("Bu Pul yurumez");
			$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
			$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
			$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli"); // Temizlik	
			$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli"); // Temizlik	
			
			pula_tikla();
		}
		

		
		
		/* ================================ */		
		/* ======= normal  pul yurutme ==== */
		/* ================================ */
		else {
		$(this).addClass("gidecegi_yer_isaretli"); // sadece bu yere isret koy
connection.send("yere_isaret_koy!"+yer+"!");
		// ------ Yeri  kaydet------
		$("input#kayit").attr("data-yer",yer); //kayda al	
			
			//====== kirik player1 PULU YURUT ======//
			if(baslangic ==25){
connection.send("kirik_pulu_yurut_25!"+oyuncu+"!");				
				$("div.kirik_pul_kutusu1").find("div.kirik_pul.isaretli").remove();

				$( "<div class='piece "+oyuncu+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));	
				$("input#kayit").attr("data-yer","0");	//Temizlik
				
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
				$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
				
				pula_tikla();
			}
			//====== kirik player2  PULU YURUT ======//
			else if(baslangic ==26){
connection.send("kirik_pulu_yurut_26!"+oyuncu+"!");
				$("div.kirik_pul_kutusu2").find("div.kirik_pul.isaretli").remove();
				
				$( "<div class='piece "+oyuncu+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));	
				$("input#kayit").attr("data-yer","0");	//Temizlik
				
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
				$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
				
				pula_tikla();
			}	
				
			
			//====== normal PUL YURUT ======//
			else if(yer != baslangic && yer>0 && baslangic>0){
				$("div.point").find("div.piece.isaretli").remove();	
	connection.send("pul_sil!"+baslangic+"!");	
			 	
			 	$( "<div class='piece "+oyuncu+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));
	connection.send("pul_ekle!"+oyuncu+"!"+hedef+"!");		
				$("input#kayit").attr("data-yer","0");	//Temizlik
				$("div.piece").removeClass("gidecegi_yer_isaretli"); // Temizlik
				$("div.piece").removeClass("gidecegi_yer_isareti"); // Temizlik	
				$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli"); // Temizlik	
				$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli"); // Temizlik	
				
				pula_tikla();
			}
		
		
	  }
		
	})
	
	
})


$("button#oynadim").show();


}

$("button#oynadim").click(function () { 
	$("button#zar_at").hide();
	$("button#oynadim").hide();
	$("div.die").removeClass("active");
	
	showMessage("&#x15E;imdi oyun s&#x131;ras&#x131; arkadasan&#x131;zda !");
connection.send("rakibiniz_oynadi!");
	
	})




