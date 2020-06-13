/* ************** ENTETE ************************* */
document.getElementById("entete").innerHTML = "	<div style='padding: 12px 15px 20px 2px;font-size:45px;font-weight:bold; color:#515151;'><img src='toplanti.png' width=35px> Kozeri <span style='font-size:35px;font-weight:bold;'> - Oyun Saray&#x131;  </span></div>";

/* ************* BAGLANTI ********************************* */
var connection = new RTCMultiConnection();

// önemli bir nokta
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

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
connection.videosContainer = document.getElementById('videos-container');
 	    


// on data connection opens
connection.onopen = function(event) {
	var remoteUserId = event.userid;
	connection.send('Merhaba !');	
    document.getElementById('chat-input').disabled = false;
    useridBox.disabled = false;
    appendDIV('arkadasinla baglanti tamam => ' + event.userid, event.userid);
 }

// text yaziyoruz
 	    var chatInput = document.getElementById('chat-input');
            var useridBox = document.getElementById('user-id');
            chatInput.onkeypress = function(e) {
                if (e.keyCode !== 13 || !this.value) return;

                if (useridBox.value.length) {
                    var user = connection.channels[useridBox.value];
                    if (user) user.send(this.value);
                    else return alert('No such user exists.');
                } 
		else connection.send(this.value);

                appendDIV(this.value, 'Me');

                this.value = '';
                this.focus();
            };

// text kaydediyoruz	    
            var chatOutput = document.getElementById('chat-output');
            function appendDIV(data, userid) {
                var div = document.createElement('div');
                div.innerHTML = '<section class="user-id" contenteditable title="Bu user-id ile arkadasina direk messaj gönderebildigin gibi onu odadan çikartabilirsin !">' + userid + '</section>'
                    + '<section class="message" contenteditable>' + data + '</section>';

                chatOutput.insertBefore(div, chatOutput.firstChild);
                div.tabIndex = 0;
                div.focus();
                chatInput.focus();
            }
	 
// on message 		   
           connection.onmessage = function(event) {
				appendDIV(event.data, event.userid); 
				decoding_data(event.data);
            };

// on data connection error
            connection.onerror = function(e) {
                console.debug('Error in data connection. Target user id', e.userid, 'Error', e);
            };

// on data connection close
            connection.onclose = function(e) {
                console.debug('Data connection closed. Target user id', e.userid, 'Error', e);
            };


// on video connection opens
			connection.onstream = function(event) {
				
			// kullaniciyi video ya bagla
			document.getElementById("cevrele").appendChild(event.mediaElement);	
			
			yerlestir();

			} // onstream sonu

document.getElementById('btn-openjoin-room').onclick = function() {
	var oda = document.getElementById("OdaIsmi").value;
	if (oda =="") { alert("masa adi yok")}
    else {
    	connection.openOrJoin(oda);
    	document.getElementById('btn-openjoin-room').style.visibility = "hidden";
    	document.getElementById("kontrol").style.display = "none"; // Kontrolu kapat  	  	   	
    	$("button#pullari_yerlestir").show(); // Pullari yerlestir butonunu aç  	
    	}
    }	
// Mobil telefon veya Tablet mi PC mi ?
var hasTouchscreen = 'ontouchstart' in window;
if(hasTouchscreen){var isMobile=1;}
else{var isMobile=0;}

if(isMobile==1){
			document.getElementById('pullari_yerlestir').style.fontSize = "35px";
			document.getElementById('secimTamam').style.fontSize = "35px";
			document.getElementById('siyah_pullari_sec').style.fontSize = "35px";
	  		document.getElementById('basla').style.fontSize = "35px";
	  		document.getElementById('btn-openjoin-room').style.fontSize = "35px";
	  		document.getElementById('devam_et').style.fontSize = "35px";
	  		document.getElementById('player1_zar_at').style.fontSize = "35px";
	  		document.getElementById('player2_zar_at').style.fontSize = "35px";
			document.getElementById('OdaIsmi').style.fontSize = "35px";
			$(".copyright").css({fontSize: "25px"});
}

 function getAspectRatio(w, h) {
        function gcd(a, b) {
            return (b == 0) ? a : gcd(b, a % b);
        }
        var r = gcd(w, h);
        return (w / r) / (h / r);
    }



function yerlestir() {
	// bagli olan video sayisini bul
	var mevcut_video_sayisi = document.getElementById("cevrele").childElementCount;
	var parent = document.getElementById("cevrele"); 	
		if (mevcut_video_sayisi==1 && isMobile==0){  		
			// benim durumum
	  		parent.children[0].classList.add("v1");
	  		
	  		}
	  	if (mevcut_video_sayisi==1 && isMobile==1){  		
			// benim durumum
	  		parent.children[0].classList.add("v1M");
	  		
	  		}	
	  		
							
		if (mevcut_video_sayisi==2 && isMobile==0){
			// benim durumum
	  		parent.children[0].classList.add("v1");
	    	// Digerlerinin durumu
	  		parent.children[1].classList.add("v2");  						
		}
		
		if (mevcut_video_sayisi==2 && isMobile==1){
			// benim durumum
	  		parent.children[0].classList.add("v1M");
	    	// Digerlerinin durumu
	  		parent.children[1].classList.add("v2M");  						
		}						
}


/* ************************************************ */
/* ******* PULLARI TAVLAYA  YERLESTIR ************* */
/* ************************************************ */

function start_layout(layout_type){
// önce Temizlik
$("div.piece").each(function(){
	$( this).remove();
	})	

$("div.point").each(function(){
	$(this ).removeClass ( "player1 player2");
	})	


if(layout_type=="L"){
	
 $("div.point").each(function(){
 	if($(this).attr("data-id") ==24){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		} 
	
 	if($(this).attr("data-id") ==19){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);		
 		} 
 	
 	if($(this).attr("data-id") ==17){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);		
 		}
 		
 	if($(this).attr("data-id") ==13){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);		
 		} 	
 		 
 	if($(this).attr("data-id") ==12){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);		
 		}
				 	
 	if($(this).attr("data-id") ==8){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);	
 		}
 	if($(this).attr("data-id") ==6){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);		
 		}	
 		
 	if($(this).attr("data-id") ==1){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		} 			 	
 })
	
}

if(layout_type=="T1"){ // Toplama Player1
	
 $("div.point").each(function(){
 	if($(this).attr("data-id") ==1){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		} 

	if($(this).attr("data-id") ==2){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		}
 
 
 	if($(this).attr("data-id") ==3){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);

 		}
 
 	if($(this).attr("data-id") ==6){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		}
 
 	if($(this).attr("data-id") ==7){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		} 
 
   if($(this).attr("data-id") ==14){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
	
 		} 

})

} // fin T1

if(layout_type=="T2"){ // toplama player 2
	
 $("div.point").each(function(){
 	if($(this).attr("data-id") ==24){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		} 

	if($(this).attr("data-id") ==23){
 		//$(this).addClass("player2");
 		
 		}
 
 
 	if($(this).attr("data-id") ==22){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		}
 		
 	if($(this).attr("data-id") ==21){
 		$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		}
 		
 	
 	if($(this).attr("data-id") ==20){
 		/*$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);*/
 	}	
  	if($(this).attr("data-id") ==19){
 		/*$(this).addClass("player2");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);*/
	
 		} 
 
 
   if($(this).attr("data-id") ==14){
 		$(this).addClass("player1");
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
 		$( "<div class=\"piece\"></div>" ).prependTo( this);
	
 		} 

})

} // fin T2
}   /*  Strat Lay out SON  */



// ==============================
// Zar atma butonlarini kitliyoruz
// ===============================
$("button#player2_zar_at").hide();$("button#player1_zar_at").hide();$("button#devam_et").hide();

// ***************************************** //
// **********      GIRIS   	**************** //
// ***************************************** //

$("#pullari_yerlestir").click(function(){
	start_layout("L");
	$("button#siyah_pullari_sec").show();
	$("#pullari_yerlestir").hide();
	showMessage("Ho&#x15F; Geldiniz. Iyi oyunlar dile&#x11F;imizle ");
	})

$("button#siyah_pullari_sec").click(function(){
	$("button#secimTamam").hide();
	var rakibe_mesaj_texte="siyah_pul_secimi!";
	rakibe_mesaj(rakibe_mesaj_texte);
	showMessage("Rakibiniz kabul ederse siz siyah pullarla  oynuyacaks&#x131;n&#x131;z.");
	})

$("button#secimTamam").click(function(){
	$("#oyuncu_no").val(1);
	$("input#arbit").attr("data-local_user_ref",1);
	$("input#arbit").attr("data-remote_user_ref",2);
	$("input#arbit").attr("data-local_user_name","player1");
	$("input#arbit").attr("data-remote_user_name","player2");
	
	$("button#secimTamam").hide();
	$("button#siyah_pullari_sec").hide();
	//$("button#basla").show();
	
	var rakibe_mesaj_texte="siyah_pul_secimi_tamam!";
	rakibe_mesaj(rakibe_mesaj_texte);
	
	showMessage("Siz turuncu pullarla oynuyorsunuz");

	
	})
	
	
	
// ***************************************** //
// **********  GEnel baslangiç ************* //
// ***************************************** //

$("#basla").click(function(){
		
	// veri topla
	// ==========		
	var oyuncu_no=$("#oyuncu_no").val(); 
	$("input#kayit").attr("data-oyuncu",oyuncu_no); //kayda al
		
	
	// oyuncunun zar atma butonunu aç
	// ==============================	
	if(oyuncu_no==1){$("button#player1_zar_at").show();$("button#player2_zar_at").hide();$("button#devam_et").show(); $("button#basla").hide();}
	if(oyuncu_no==2){$("button#player2_zar_at").show();$("button#player1_zar_at").hide();$("button#devam_et").show(); $("button#basla").hide();}
	
	// oyuncular sirasiyla zar atiyor 
	// ============================
	$("button#player"+oyuncu_no+"_zar_at").click(function () {zar_at();})
		
})


$("#devam_et").click(function(){
			var oyuncu_no=$("#oyuncu_no").val(); 
			$("div.piece").removeClass("isaret"); 
			$("input#kayit").attr("data-oyun","0");
			$("input#kayit").attr("data-oyunmax","0");
			
			$("button#player"+oyuncu_no+"_zar_at").hide();
			$("button#devam_et").hide();
			
			// temizlik
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");
			$("input#kayit").attr("data-yera","0"); // kayda al
			$("input#kayit").attr("data-yerb","0"); // kayda al	
			$("input#kayit").attr("data-position","0"); // kayda al
			$("div#die1").removeClass("active").attr("data-value",0);
			$("div#die2").removeClass("active").attr("data-value",0);		 


			// Rakibe el ver
			var rakibe_mesaj_texte="rakibe_el_ver!";
			rakibe_mesaj(rakibe_mesaj_texte);
			showMessage("Rakibiniz zar at&#x131;yor.");

})



function rakip_zari_goster(zar1,zar2){ 
	$("div#die1").addClass("active").attr("data-value",zar1)
	$("div#die2").addClass("active").attr("data-value",zar2);
	}


$("button#player1_zar_at").click(function(){zar_at();})
$("button#player2_zar_at").click(function(){zar_at();})

// ******************************** //
// **********  ZAR AT ************* //
// ******************************** //
function zar_at(){
		var oyuncu_no=$("input#arbit").attr("data-local_user_ref");
		$("input#oyuncu-no").val(oyuncu_no);
		$("input#kayit").attr("data-oyuncu",oyuncu_no); //kayda al
// ----------------------------------		
		/*
		// Oyun bitti
		var right_quarter_top=$("div.side.right div.quarter.top div.point.player"+oyuncu_no).children().length;
		var left_quarter_top=$("div.side.left div.quarter.top div.point.player"+oyuncu_no).children().length;
		var left_quarter_bottom=$("div.side.left div.quarter.bottom div.point.player"+oyuncu_no).children().length;
		var right_quarter_bottom=$("div.side.right div.quarter.bottom div.point.player"+oyuncu_no).children().length;
		
		if((right_quarter_top+left_quarter_top+left_quarter_bottom+right_quarter_bottom)==0){
			
			alert (oyuncu_no +" nolu oyuncu kazandi");
		}
		*/		
// -------------------------------------
					
		$("div.die").shake();
		var rakibe_mesaj_texte="zar!";
		// ---- atilan zarlari kaydet
		// =========================
		for (var i = 1; i < 3; i++) {
			var roll = Math.floor(Math.random() * 6) + 1;
			$("div#die" + i).addClass("active").attr("data-value", roll);
			var rakibe_mesaj_texte=rakibe_mesaj_texte+roll+"!";
			$("input#kayit").attr("data-oyun",0);
		}
		// --- Maximum oyun hakkini kaydet
		// ===============================
		var zar1=$("div#die1").attr("data-value");
		var zar2=$("div#die2").attr("data-value");
		
		if(zar1==zar2){ $("input#kayit").attr("data-oyunmax","4");}
		else {$("input#kayit").attr("data-oyunmax","2");}
							
		// gidilecek yerleri goster
		// =====================
		gidilecek_yeri_goster(oyuncu_no);
		rakibe_mesaj(rakibe_mesaj_texte);	
	}
	
// --------------------
// pul isaretleme testi
// -------------------- 	
function gidilecek_yer_testi(data_id,oyuncu_no){
	if(oyuncu_no==1){var pul_sayisi= $("div.player2.point[data-id="+data_id+"]").children().length;}
	else {var pul_sayisi= $("div.player1.point[data-id="+data_id+"]").children().length;}
	return pul_sayisi;
	
}

// ----------------------------------
// tolama modunda kullanilan fonksyon
// -----------------------------------
function ustu_bos(position,zar,oyuncu_no){		

if(oyuncu_no==1){
	var ilk = parseInt(position, 10)+1;
	var pul_sayisi=0;
	for(j=ilk;j<7;j++){
	pul_sayisi=pul_sayisi+($("div.point.player1[data-id="+j+"]").children().length);
console.log("Ustu bos 1ci="+pul_sayisi+" position="+position);
	}
}
if(oyuncu_no==2){
	var ilk = parseInt(position, 10)-1;
	var pul_sayisi=0;
	for(j=ilk;j>18;j--){
	pul_sayisi=pul_sayisi+($("div.point.player2[data-id="+j+"]").children().length);
console.log("Ustu bos 2ci="+pul_sayisi+" position="+position);
	}
}	
	if(pul_sayisi>0){return false;}
	else {return true;}
}




// ***************************************** //
// *****  Pulun gidecegi yeri isaretle ***** //
// ***************************************** //
function gidilecek_yeri_goster(oyuncu_no) {
	
	// ===== temizlik yap ===
	// =======================
	$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
	$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
	$("div.point").removeClass("gidecegi_yer_isareti");
	$("input#kayit").attr("data-yera","0"); // kayda al
	$("input#kayit").attr("data-yerb","0"); // kayda al
	$("input#kayit").attr("data-toplama","0"); // kayda al
	$("input#kayit").attr("data-kirik","0"); // kayda al	
	
	rakibe_mesaj_texte="temizlik_gidilecek_yeri_goster!";				
	rakibe_mesaj(rakibe_mesaj_texte);
	
	// ====veri topla ====
	// ===================	
	var oynanan_oyun_sayisi=parseInt($("input#kayit").attr("data-oyun"),10);
	var max_oyun_sayisi=parseInt($("input#kayit").attr("data-oyunmax"),10);
	var zar1= parseInt($("div#die1.active").attr("data-value"),10);
	var zar2= parseInt($("div#die2.active").attr("data-value"),10);	
		

		
	// ====== Toplama Modu tesbiti ===
	// ===============================
	var right_quarter_top=$("div.side.right div.quarter.top div.point.player"+oyuncu_no).children().length;
	var left_quarter_top=$("div.side.left div.quarter.top div.point.player"+oyuncu_no).children().length;
	var left_quarter_bottom=$("div.side.left div.quarter.bottom div.point.player"+oyuncu_no).children().length;
	var right_quarter_bottom=$("div.side.right div.quarter.bottom div.point.player"+oyuncu_no).children().length;

	if(oyuncu_no=="1" && (right_quarter_top+left_quarter_top+left_quarter_bottom)==0){var toplama_modu=1;}
	
	else if(oyuncu_no=="2" && (right_quarter_bottom+left_quarter_top+left_quarter_bottom)==0){var toplama_modu=1;}
	
	else {var toplama_modu=0;}
	
	$("input#kayit").attr("data-toplama",toplama_modu); // kayda al

	
	// ====== Kirik pul  Modu tesbiti ===
	// ==================================
	var kirik_pul_sayisi=$("div.kirik_pul_kutusu"+oyuncu_no).children().length;
	if(kirik_pul_sayisi>0){var kirik_pul_modu=1;}
	else {var kirik_pul_modu=0;}
	$("input#kayit").attr("data-kirik",kirik_pul_modu); // kayda al			
	
	// ===== KIRIK PUL modunda yer isaretleme Islemleri =====
	// ======================================================
		
	if(kirik_pul_modu==1){ 
		// testé le 29/05/2020
		// ===== temizlik yap ===
		// =======================
		$("div.point").removeClass("gidecegi_yer_isareti");
		rakibe_mesaj_texte="temizlik_kirik_pul_modu!";				
		rakibe_mesaj(rakibe_mesaj_texte);
						
		// ====  kirik pulu bul ====
		// =========================
		$("div.kirik_pul_kutusu"+oyuncu_no).find("div.kirik_pul").last().addClass("isaret");				
		rakibe_mesaj_texte="kirik_pulu_bul!"+oyuncu_no+"!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		if(oyuncu_no==1){
			var position=25;
			$("input#kayit").attr("data-position",position); //kayda al		
			
			// ====== girisi isaretle ======
			// =============================
			/* 1=24,2=23,3=22,4=21,5=20,-=19 */	
				
				for(i=24;i>18;i=i-1){//-------
					if(i==(25-zar1) && gidilecek_yer_testi(i,oyuncu_no)<3){
						$("div.point[data-id="+i+"]").addClass("gidecegi_yer_isareti");
						$("input#kayit").attr("data-yera",i); // kayda al	
						rakibe_mesaj_texte="yer_isaretle!"+i+"!";				
						rakibe_mesaj(rakibe_mesaj_texte);
						}
					else if(i==(25-zar2) && gidilecek_yer_testi(i,oyuncu_no)<3){
						$("div.point[data-id="+i+"]").addClass("gidecegi_yer_isareti");
						$("input#kayit").attr("data-yerb",i); // kayda al	
						rakibe_mesaj_texte="yer_isaretle!"+i+"!";				
						rakibe_mesaj(rakibe_mesaj_texte);
						}
				}//-------
			  } // if(oyuncu_no==1){
			  	
			 if(oyuncu_no==2){
			 	var position=26;
			 	$("input#kayit").attr("data-position",position); //kayda al
			 	
			 	// ====== girisi isaretle ======
				// =============================
			 	for(i=1;i<7;i=i+1){//-------
					if(i==zar1 && gidilecek_yer_testi(i,oyuncu_no)<3){
						$("div.point[data-id="+i+"]").addClass("gidecegi_yer_isareti");
						$("input#kayit").attr("data-yera",i); // kayda al	
						rakibe_mesaj_texte="yer_isaretle!"+i+"!";				
						rakibe_mesaj(rakibe_mesaj_texte);
						}
					else if(i==zar2 && gidilecek_yer_testi(i,oyuncu_no)<3){
						$("div.point[data-id="+i+"]").addClass("gidecegi_yer_isareti");
						$("input#kayit").attr("data-yerb",i); // kayda al	
						rakibe_mesaj_texte="yer_isaretle!"+i+"!";				
						rakibe_mesaj(rakibe_mesaj_texte);
						}
				}//-------	 	
			 }//if(oyuncu_no==2)
				 
	} //if(kirik_pul_modu==1)
					
	// ===== PUL TOPLAMA modunda yer isaretleme Islemleri =====
	// ========================================================
	// Test edildi 17/05/2020 
	else if (toplama_modu==1){ 
		// ===== temizlik yap ===
		// =======================
		$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
		$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
		$("div.point").removeClass("gidecegi_yer_isareti");
		rakibe_mesaj_texte="temizlik_toplama_modu!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		
		// ==== oyuncunun  pullarini isaretle =====
		// ========================================
		$("div.point.player"+oyuncu_no).each(function(){
		$(this).find("div.piece").last().addClass("isaret");
		rakibe_mesaj_texte="oyuncunun_pullarini_isaretle!"+oyuncu_no+"!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		})
		
		
		// ==== tiklanan  pulun gidegegi yeri isaretle =====
		// =================================================
		$("div.point.player"+oyuncu_no).each(function(){
			$(this).find("div.piece").last().click(function(){
				// temizlik
				$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
				$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
				$("div.point").removeClass("gidecegi_yer_isareti");
				rakibe_mesaj_texte="temizlik_gidilecek_yeri_goster!";				
				rakibe_mesaj(rakibe_mesaj_texte);
				
				
				var position =parseInt($(this).parent().attr("data-id"),10); 
				$("input#kayit").attr("data-position",position); //kayda al
	
				if(oyuncu_no==1){
								var cond1=zar1>position; 
								var cond2=zar2>position; 
								var cond_pos1=position==zar1; 
								var cond_pos2=position==zar2; 
								var kutu_id=27;
								var yera=position-zar1;
								var yerb=position-zar2;
								}
				if(oyuncu_no==2){
								var cond1=zar1>(25-position);
								var cond2=zar2>(25-position); 
								var cond_pos1=(25-position)==zar1; 
								var cond_pos2=(25-position)==zar2; 
								var kutu_id=28;
								var yera=position+zar1;
								var yerb=position+zar2;
								}
			
				// ------ sartlar uygunsa toplama kutusunu isaretle ------
				// =======================================================
	
	
				if( ( (cond1 && ustu_bos(position,zar1,oyuncu_no)) || cond_pos1) && $("div.point[data-id="+position+"]").children().length >1 ) {
					$("div.toplanan_pul_kutusu"+oyuncu_no).addClass("gidecegi_yer_isareti");
					$("input#kayit").attr("data-yera",kutu_id); // kayda al	
console.log("cond1"+ cond1 +" / "+ustu_bos(position,zar1,oyuncu_no)+" |||" +cond_pos1+ "***"+$("div.point[data-id="+position+"]").children().length);			
					rakibe_mesaj_texte="toplama_kutusu_isaretle!"+oyuncu_no+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				}
				if( ( (cond2  && ustu_bos(position,zar2,oyuncu_no)) || cond_pos2) && $("div.point[data-id="+position+"]").children().length >1 ) {
					$("div.toplanan_pul_kutusu"+oyuncu_no).addClass("gidecegi_yer_isareti");
					$("input#kayit").attr("data-yerb",kutu_id); // kayda al	
console.log("cond2"+ cond2 +" / "+ustu_bos(position,zar2,oyuncu_no)+" |||" +cond_pos2+ "***"+$("div.point[data-id="+position+"]").children().length);					
					rakibe_mesaj_texte="toplama_kutusu_isaretle!"+oyuncu_no+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				}
				else {
				// ----- Normal yerleri isaretle -----
				// ===================================
				if(oyuncu_no==2) {
					if($("input#kayit").attr("data-yera") != kutu_id){var yera=position+zar1;} 
					if($("input#kayit").attr("data-yerb") != kutu_id){var yerb=position+zar2;}
				}
				if(oyuncu_no==1) {
					if($("input#kayit").attr("data-yera") != kutu_id){var yera=position-zar1;} 
					if($("input#kayit").attr("data-yerb") != kutu_id){var yerb=position-zar2;}	
					} 
				}
	
			
			
				if (gidilecek_yer_testi(yera,oyuncu_no)<3){
					$("div.point[data-id="+yera+"]").addClass("gidecegi_yer_isareti");
					if(yera>0) {$("input#kayit").attr("data-yera",yera);} // kayda al
					rakibe_mesaj_texte="yer_isaretle!"+yera+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				} 	
				if (gidilecek_yer_testi(yerb,oyuncu_no)<3){
					$("div.point[data-id="+yerb+ "]").addClass("gidecegi_yer_isareti");
					if(yerb>0) {$("input#kayit").attr("data-yerb",yerb);} // kayda al
					rakibe_mesaj_texte="yer_isaretle!"+yerb+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				}
		
			})// (this).find("div.piece").last().click
	
		})	//$("div.point.player"+oyuncu_no).each	
	} //else if (toplama_modu==1)	
	
	
	
	
	/* *********  Normal yer isaretleme islemleri. *********/	
	else {
		// ===== temizlik yap ===
		// =======================
		$("div.point").removeClass("gidecegi_yer_isareti");
		rakibe_mesaj_texte="temizlik_normal_mod!";				
		rakibe_mesaj(rakibe_mesaj_texte);
			
		// ==== oyuncunun tum pullarini  pullari isaretle ===
		// ==================================================
		$("div.point.player"+oyuncu_no).each(function(){
			$(this).find("div.piece").last().addClass("isaret");
		rakibe_mesaj_texte="oyuncunun_pullarini_isaretle!"+oyuncu_no+"!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		})
	
		
		// ==== tiklanan  pulun gidegegi yeri isaretle =====
		// =================================================
		$("div.point.player"+oyuncu_no).each(function(){
			
		
			$(this).find("div.piece").last().click(function(){
				// temizlik
				$("div.point").removeClass("gidecegi_yer_isareti");
				rakibe_mesaj_texte="temizlik_normal_mod!";				
				rakibe_mesaj(rakibe_mesaj_texte);
				// ------ position -----
				// =====================
				var position =parseInt($(this).parent().attr("data-id"),10);
				$("input#kayit").attr("data-position",position); //kayda al
			
				// ------ gidecegi yer -------
				// ===========================
				if(oyuncu_no==2) {var yer1=position+zar1; var yer2=position+zar2;}
				if(oyuncu_no==1) {var yer1=position-zar1; var yer2=position-zar2;} 
				$("input#kayit").attr("data-yera",yer1); //kayda al
				$("input#kayit").attr("data-yerb",yer2); //kayda al
			
			
				if (gidilecek_yer_testi(yer1,oyuncu_no)<3){
					$("div.point[data-id="+yer1+"]").addClass("gidecegi_yer_isareti"); 
					rakibe_mesaj_texte="yer_isaretle!"+yer1+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				} 	
				if (gidilecek_yer_testi(yer2,oyuncu_no)<3){
					$("div.point[data-id="+yer2+ "]").addClass("gidecegi_yer_isareti");
					rakibe_mesaj_texte="yer_isaretle!"+yer2+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				} 
			
		   }) //$(this).find("div.piece").last().clic
				
		}) //$("div.point.player"+oyuncu_no).each
		
	} //else
	
		
 } // gidecegi yeri goster sonu
	
	
	// ***************************************** //
	// ******** Isaretli yere Tiklama ********** //
	// ***************************************** //	
	$(document).on('click', "div.point.gidecegi_yer_isareti", function() {
				
		var kirik_pul_modu=$("input#kayit").attr("data-kirik");
		var toplama_modu=$("input#kayit").attr("data-toplama");
		
		var oynanan_oyun_sayisi=parseInt($("input#kayit").attr("data-oyun"),10);
		var max_oyun_sayisi=parseInt($("input#kayit").attr("data-oyunmax"),10);
	
		var position=parseInt($("input#kayit").attr("data-position"),10);		
		var oyuncu_no=parseInt($("#oyuncu_no").val(),10);
		var yer=parseInt($(this).attr("data-id"),10);
	
		var hedef= $("div.point[data-id="+yer+"]");
		
		var baslangic=$("div.point[data-id="+position+"]");
		if(oyuncu_no==1){
			var ben="player1";
			var rakip="player2";
			var kirik_kutusu_rakip=("div.kirik_pul_kutusu2");
			var kirik_kutusu_benim=("div.kirik_pul_kutusu1");
			}	
		else{
			var ben="player2";
			var rakip="player1";
			var kirik_kutusu_rakip=("div.kirik_pul_kutusu1");
			var kirik_kutusu_benim=("div.kirik_pul_kutusu2");
			}
			
		

		// ============================
		// ******* Normal durum *******
		// ============================
		// **********YEni çözüm 29/05/2020 **************** //
		
		// Tiklanan yer bos
		if($(hedef).children().length == 1){
		 // ***********************		
		 // ******* Yer Bos ******
		 // ***********************
			// ===== tiklanan pulu sil ==== 
			// kirik pu varmi?
			if($("input#kayit").attr("data-kirik")==1){
			$(kirik_kutusu_benim).find("div.kirik_pul.isaret").remove();
			rakibe_mesaj_texte="kirik_pul_isaretli_olani_sil!"+kirik_kutusu_benim+"!";				
			rakibe_mesaj(rakibe_mesaj_texte);	 		
			}
			else {
			$(baslangic).find("div.piece.isaret").remove();
			rakibe_mesaj_texte="baslangic_isaret_sil!"+position+"!";				
			rakibe_mesaj(rakibe_mesaj_texte);	
			
			if($(baslangic).children().length == 1){// hic pul yok 
				$(baslangic).removeClass("player"+oyuncu_no);
				rakibe_mesaj_texte="normal_pul_isaretli_olani_sil!"+position+"!"+oyuncu_no+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);		
			} 
			
			}
			
		 	// ===== gidilecek yere pul ekle ===== //
			$(hedef).prepend("<div class='piece'></div>");
			$(hedef).removeClass("gidecegi_yer_isareti");
			$(hedef).addClass(ben);
			
			rakibe_mesaj_texte="gidilecek_yere_pul_ekle!"+ben+"!"+yer+"!";				
			rakibe_mesaj(rakibe_mesaj_texte);
		} 
		
		// Tiklanan yer dolu
		else {
		 // ***********************		
		 // ******* Yer Dolu ******
		 // ***********************
		 
			 // ====== > rakip pul sayisi 1 ise pulu kiriyoruz
			 if(gidilecek_yer_testi(yer,oyuncu_no)==2){ // 2 demek bir pul var demek
			 	
			 	// ====  yabaci pulu kir ==== //
			 	$(hedef).find("div.piece").remove();
			 	$(hedef).removeClass(rakip);
				$(hedef).addClass(ben);
			 	rakibe_mesaj_texte="kirilan_pulun_yerine_pul_ekle!"+ben+"!"+yer+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);
			 	
			 	
			 	// ===== kirik pulu kirik kutusuna at==== //	
				$(kirik_kutusu_rakip).prepend("<div class='kirik_pul'></div>");
				rakibe_mesaj_texte="rakip_kirik_pulu_kirik_kutusuna_at!"+kirik_kutusu_rakip+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);
			
				// ===== tiklanan pulu kaldir ======= //
				// kirik pu varmi?
				if($("input#kayit").attr("data-kirik")==1){
					$(kirik_kutusu_benim).find("div.kirik_pul.isaret").remove();	 		
					rakibe_mesaj_texte="kendi_kirik_pulumu_kutudan_cikart!"+kirik_kutusu_benim+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				
				}
				else {
					$(baslangic).find("div.piece.isaret").remove();
					rakibe_mesaj_texte="baslangic_temizlik!"+position+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);		
				
					if($(baslangic).children().length == 1){// hic pul yok 
						$(baslangic).removeClass("player"+oyuncu_no);
						rakibe_mesaj_texte="baslangic_bos_yer_temizlik!"+position+"!"+oyuncu_no+"!";				
						rakibe_mesaj(rakibe_mesaj_texte);
						} 
				}
					
				// ===== gidilecek yere pul ekle ==== //
				$(hedef).prepend("<div class='piece'></div>");
				$(hedef).removeClass("gidecegi_yer_isareti");
				
				rakibe_mesaj_texte="kirilan_pulun_yerine_pul_koy!"+yer+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);	
			 }
			 
			 // ===== > Sadece benim pullarim var
			 else{
			 	
			 	// ===== tiklanan pulu sil ---- 
				// kirik pu varmi?
				if($("input#kayit").attr("data-kirik")==1){
					$(kirik_kutusu_benim).find("div.kirik_pul.isaret").remove();	 		
					rakibe_mesaj_texte="kendi_kirik_pulumu_kutudan_cikart!"+kirik_kutusu_benim+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
				}
				else {
				$(baslangic).find("div.piece.isaret").remove();	
				rakibe_mesaj_texte="baslangic_isaret_sil!"+position+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);		
				
				if($(baslangic).children().length == 1){// hic pul yok
					$(baslangic).removeClass("player"+oyuncu_no);
					rakibe_mesaj_texte="baslangic_bos_yer_temizlik!"+position+"!"+oyuncu_no+"!";				
					rakibe_mesaj(rakibe_mesaj_texte);
					}  
				}
			 	// ===== gidilecek yere pul ekle ===== //
				$(hedef).prepend("<div class='piece'></div>");
				$(hedef).removeClass("gidecegi_yer_isareti");
				rakibe_mesaj_texte="kirilan_pulun_yerine_pul_koy!"+yer+"!";				
				rakibe_mesaj(rakibe_mesaj_texte);			 	
			 }
		 
		} // genel else

		
		// data-oyun a +1 koy
		oynanan_oyun_sayisi=oynanan_oyun_sayisi+1;
		$("input#kayit").attr("data-oyun",oynanan_oyun_sayisi); // kaydet
		
		// oynanan zari bul ve körelt
	// zarlar tek
		
		if($("input#kayit").attr("data-yera") ==yer && oynanan_oyun_sayisi==1 && max_oyun_sayisi==2 ) {
		$("div#die1.die.active").removeClass("active");
console.log($("input#kayit").attr("data-yera")+"/"+yer);
		rakibe_mesaj_texte="zar_koret!die1!";				
		rakibe_mesaj(rakibe_mesaj_texte);	
		}
		else if($("input#kayit").attr("data-yerb") ==yer && oynanan_oyun_sayisi==1 && max_oyun_sayisi==2 ) {
		$("div#die2.die.active").removeClass("active");		
		rakibe_mesaj_texte="zar_koret!die2!";				
		rakibe_mesaj(rakibe_mesaj_texte);	
		}
		else if($("input#kayit").attr("data-yera") ==yer && oynanan_oyun_sayisi==2 && max_oyun_sayisi==2 ) {
		$("div#die1.die.active").removeClass("active");		
		rakibe_mesaj_texte="zar_koret!die1!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		}
		
		else if($("input#kayit").attr("data-yerb") ==yer && oynanan_oyun_sayisi==2 && max_oyun_sayisi==2 ) {
		$("div#die2.die.active").removeClass("active");		
		rakibe_mesaj_texte="zar_koret!die2!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		}		
	// ===> Zarlar çift
		else if($("input#kayit").attr("data-yera") ==yer && oynanan_oyun_sayisi==2 && max_oyun_sayisi==4 ) {
		$("div#die1.die.active").removeClass("active");		
		rakibe_mesaj_texte="zar_koret!die1!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		}
		else if($("input#kayit").attr("data-yerb") ==yer &&  oynanan_oyun_sayisi==4 && max_oyun_sayisi==4 ) {
		$("div#die2.die.active").removeClass("active");		
		rakibe_mesaj_texte="zar_koret!die2!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		}

		// zarlari kullandim ise  yeni_tur(oyuncu_no) geç
		if(oynanan_oyun_sayisi == max_oyun_sayisi){
			
			$("div.piece").removeClass("isaret"); 
			$("input#kayit").attr("data-oyun","0");
			$("input#kayit").attr("data-oyunmax","0");
			// temizlik
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");
			$("input#kayit").attr("data-yera","0"); // kayda al
			$("input#kayit").attr("data-yerb","0"); // kayda al	
			$("input#kayit").attr("data-position","0"); // kayda al		 
			
			$("button#basla").hide();
			$("button#devam_et").hide();
			$("button#player2_zar_at").hide();$("button#player1_zar_at").hide();
			
			// Rakibe el ver
			var rakibe_mesaj_texte="rakibe_el_ver!";
			rakibe_mesaj(rakibe_mesaj_texte);
			showMessage("Rakibiniz zar at&#x131;yor.");
			
			 }
	
		else{gidilecek_yeri_goster(oyuncu_no);}
		
	}) // $(document).on('click', div.point.gidecegi_yer_isareti
	
 // ************************************************************************************************************** //  
  
   $(document).on("click", "div.toplanan_pul_kutusu1.gidecegi_yer_isareti", function () {pul_toplama();});
   $(document).on("click", "div.toplanan_pul_kutusu2.gidecegi_yer_isareti", function () {pul_toplama();});
    // ===============================
	// ******* Toplama durumu ********
	// ===============================
	function pul_toplama() {
		var oyuncu_no=parseInt($("#oyuncu_no").val(),10);
				
		// belki bitmedi
   		var kirik_pul_modu=parseInt($("input#kayit").attr("data-kirik"),10);
		var toplama_modu=parseInt($("input#kayit").attr("data-toplama"),10);
   		var oynanan_oyun_sayisi=parseInt($("input#kayit").attr("data-oyun"),10);
		var max_oyun_sayisi=parseInt($("input#kayit").attr("data-oyunmax"),10);
		
		var position=parseInt($("input#kayit").attr("data-position"),10);		

		if(oyuncu_no==1){var kutu_id=27;}
		if(oyuncu_no==2){var kutu_id=28;}
		
		// position dan pul sil
		var baslangic=$("div.point[data-id="+position+"]");
		$(baslangic).find("div.piece.isaret").remove();
		rakibe_mesaj_texte="baslangic_isaret_sil!"+position+"!";				
		rakibe_mesaj(rakibe_mesaj_texte);	
		
		
		if($(baslangic).children().length == 1){// hic pul yok 
			$(baslangic).removeClass("player"+oyuncu_no);
			rakibe_mesaj_texte="normal_pul_isaretli_olani_sil!"+position+"!"+oyuncu_no+"!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			} 
		
		// kutuya Pul ekle
		var hedef= $("div.toplanan_pul_kutusu"+oyuncu_no);
		$(hedef).prepend("<div class='toplanan_pul'></div>");
		rakibe_mesaj_texte="kutuya_pul_ekle!"+oyuncu_no+"!";				
		rakibe_mesaj(rakibe_mesaj_texte);
		
		// data-oyun a +1 koy
		oynanan_oyun_sayisi=oynanan_oyun_sayisi+1;
		$("input#kayit").attr("data-oyun",oynanan_oyun_sayisi); // kaydet
		
		// Oyun bittimi
		var right_quarter_top=$("div.side.right div.quarter.top div.point.player"+oyuncu_no).children().length;
		var left_quarter_top=$("div.side.left div.quarter.top div.point.player"+oyuncu_no).children().length;
		var left_quarter_bottom=$("div.side.left div.quarter.bottom div.point.player"+oyuncu_no).children().length;
		var right_quarter_bottom=$("div.side.right div.quarter.bottom div.point.player"+oyuncu_no).children().length;
			
		// Zarlari körelt
		 
		if( oynanan_oyun_sayisi==1 && max_oyun_sayisi==2 ) {
			$("div#die1.die.active").removeClass("active");
			rakibe_mesaj_texte="zar_koret!die1!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			}
		
		else if(oynanan_oyun_sayisi==2 && max_oyun_sayisi==2 ) {
			$("div#die2.die.active").removeClass("active");	
			rakibe_mesaj_texte="zar_koret!die2!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			}
		
		else if(oynanan_oyun_sayisi==2 && max_oyun_sayisi==4 ) {
			$("div#die1.die.active").removeClass("active");	
			rakibe_mesaj_texte="zar_koret!die1!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			}
		
		else if(oynanan_oyun_sayisi==4 && max_oyun_sayisi==4 ) {
			$("div#die2.die.active").removeClass("active");	
			rakibe_mesaj_texte="zar_koret!die2!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			}
		
		// ********************	
		// sayet oyun bitti ise
		if((right_quarter_top+left_quarter_top+left_quarter_bottom+right_quarter_bottom)==0 && oyuncu_no==1){
			//alert ("oyunu TURUNCU PULLAR  kazandi");
			showMessage("oyunu TURUNCU PULLAR  kazand&#x131;");
			rakibe_mesaj_texte="mesaj_simple!oyunu TURUNCU PULLAR  kazandi!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			
			$("div.piece").removeClass("isaret"); 
			$("input#kayit").attr("data-oyun","0");
			$("input#kayit").attr("data-oyunmax","0");
						
			// temizlik
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");
			$("input#kayit").attr("data-yera","0"); // kayda al
			$("input#kayit").attr("data-yerb","0"); // kayda al
		 	$("input#kayit").attr("data-position","0"); // kayda al
		 	$("div#die1").removeClass("active");
			$("div#die2").removeClass("active");
			 
			$("button#player2_zar_at").hide();
			$("button#player1_zar_at").hide();
			$("button#basla").show();
			$("button#devam_et").hide();
			
			// Rakibe el ver
			var rakibe_mesaj_texte="oyun_bitti!"+oyuncu_no+"!";
			rakibe_mesaj(rakibe_mesaj_texte);
			
			
			}
		if((right_quarter_top+left_quarter_top+left_quarter_bottom+right_quarter_bottom)==0 && oyuncu_no==2){
			//alert ("oyunu SIYAH PULLAR  kazandi");
			showMessage("oyunu SIYAH PULLAR  kazand&#x131;");
			rakibe_mesaj_texte="mesaj_simple!oyunu SIYAH PULLAR  kazandi!";				
			rakibe_mesaj(rakibe_mesaj_texte);
			
			$("div.piece").removeClass("isaret"); 
			$("input#kayit").attr("data-oyun","0");
			$("input#kayit").attr("data-oyunmax","0");
			
						
			// temizlik
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");
			$("input#kayit").attr("data-yera","0"); // kayda al
			$("input#kayit").attr("data-yerb","0"); // kayda al
		 	$("input#kayit").attr("data-position","0"); // kayda al
		 	$("div#die1").removeClass("active");
			$("div#die2").removeClass("active");
			 
			$("button#player2_zar_at").hide();
			$("button#player1_zar_at").hide();
			$("button#basla").show();
			$("button#devam_et").hide();
			

			
			// Rakibe el ver
			var rakibe_mesaj_texte="oyun_bitti!"+oyuncu_no+"!";
			rakibe_mesaj(rakibe_mesaj_texte);
						
			}
		// *********************
		
		// zarlari kullandim ise  yeni_tur(oyuncu_no) geç
		if(oynanan_oyun_sayisi == max_oyun_sayisi){
			$("div.piece").removeClass("isaret"); 
			$("input#kayit").attr("data-oyun","0");
			$("input#kayit").attr("data-oyunmax","0");
						
			// temizlik
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");
			$("input#kayit").attr("data-yera","0"); // kayda al
			$("input#kayit").attr("data-yerb","0"); // kayda al
		 	$("input#kayit").attr("data-position","0"); // kayda al
			 
			$("button#player2_zar_at").hide();
			$("button#player1_zar_at").hide();
			$("button#basla").hide();
			$("button#devam_et").hide();
			
			// Rakibe el ver
			var rakibe_mesaj_texte="rakibe_el_ver!";
			rakibe_mesaj(rakibe_mesaj_texte);
			showMessage("Rakibiniz zar at&#x131;yor.");
			 
			 
			 
			 }		
		
		else{gidilecek_yeri_goster(oyuncu_no);}
		
		
	} // pul_toplama sonu


	// *************************************** //

	function rakibe_mesaj(str){
		$message = $("#chat-input");	
		 $message.val(str);
		 $message.trigger({type: 'keypress', which: 13, keyCode: 13});
		 return;
	}
	
	
	
	
	function showMessage(str) {
		$message = $("#message");
		if ($message.is(":visible")) $message.fadeOut();
		$message.html(str).fadeIn();
	}
	
	jQuery.fn.shake = function() {
	    this.each(function(i) {
		    var left = $(this).position().left;
	        for (var x = 1; x <= 2; x++) {
	            $(this).animate({ left: left-25 }, 10).animate({ left: left }, 50).animate({ left: left + 25 }, 10).animate({ left: left }, 50);
	        }
	    });
	    return this;
	} 

//}); TULBENT 

