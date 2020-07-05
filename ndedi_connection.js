var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// all below lines are optional; however recommended.
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

//connection.videosContainer = document.getElementById('videos-container');
 	    


// on data connection opens
connection.onopen = function(event) {
	var remoteUserId = event.userid;
	//connection.send('Merhaba !');	
    document.getElementById('chat-input').disabled = false;
    //useridBox.disabled = false;
    appendDIV('arkadasinla baglanti tamam => ' + event.userid, event.userid);
    			document.getElementById("onu_yazdir").style.display = "block"; // onu yazdir  ac 
              	document.getElementById("google_translate_element").style.display = "block"; //  translate ac 
              	//$("div#onu_yazdir").show();
	 			//$("div#google_translate_element").show();
    
 }


// text yaziyoruz
 	    var chatInput = document.getElementById('chat-input');
       /*     var useridBox = document.getElementById('user-id');
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
*/
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
				translating_data(event.data);
            };

// on data connection error
            connection.onerror = function(e) {
                console.debug('Error in data connection. Target user id', e.userid, 'Error', e);
            };

// on data connection close
            connection.onclose = function(e) {
                console.debug('Data connection closed. Target user id', e.userid, 'Error', e);
             document.getElementById("onu_yazdir").style.display = "none"; // onu yazdir  kapat 
             document.getElementById("google_translate_element").style.display = "none"; //  translate kapat    
                
            };




connection.onstream = function(event) {
    if (event.type === 'remote') {
	document.getElementById('video2').appendChild( event.mediaElement );
	document.getElementById("video2").children[0].classList.add("video2");

	}
	else{ // yani ben
		document.getElementById('video1').appendChild( event.mediaElement );
		document.getElementById("video1").children[0].classList.add("video1");		
	}
}


/* *********************************************
--------ODAYI AC /  ACIK ODAYA ODAYA GIR ------
// ******************************************** */
document.getElementById('btn-openjoin-room').onclick = function() {
	var oda = document.getElementById("OdaIsmi").value;
	if (oda =="") { alert("Nom de la salle manque !");}
    else {
    	connection.openOrJoin(oda);
    	document.getElementById('btn-openjoin-room').style.visibility = "hidden";
    	document.getElementById("kontrol").style.display = "none"; // Kontrolu kapat
    	document.getElementById("beni_yazdir").style.display = "block"; // beni yazdir  ac 
    	document.getElementById("gorusmeyi_kaydet").style.display = "block";// gorusmeyi_kaydet ac
    	document.getElementById("texte-exit").style.display = "block";// exit yazisini ac
    	
    	//$("div#videoda_goster").addClass("videoda_goster"); 
    	}
};


	function rakibe_mesaj(str){
		$message = $("#chat-input");	
		 $message.val(str);
		 $message.trigger({type: 'keypress', which: 13, keyCode: 13});
		 return;
	}

document.getElementById('texte-exit').onclick = function() {
	//alert("Kapat");
    // disconnect with all users
    connection.getAllParticipants().forEach(function(pid) {
        connection.disconnectWith(pid);
    });

    // Butun  local cameralari kapat 
    connection.attachStreams.forEach(function(localStream) {
        localStream.stop();
    });

    // socket.io baglantisini kapat 
    connection.closeSocket();
	location.reload();
	this.disabled = true;
	$("div.container").show();
	// document.getElementById("ana_govde").focus();
};

