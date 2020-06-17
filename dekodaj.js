
// on text message or data object received
	/* Rakibe mesaj kotlamalari
	 * 1- Eleman ="zar" 2- Eleman="pul" 
	 * Actionlar
	 * 1- Action="zar_salla" 2 Action="zar_at" 3- Action="pul_yurut"
	 * 
	 * Exemple= Zar salla
	 * var str="zar!zar_salla!";
	 * 
	 * Example = Pul yurut
	 * var str="Eleman=pul! Action=pul_yurut! baslangic=7! son=3! "
	 */
		   function decoding_data(data){
		   	var pos_element = data.indexOf("!");
		   	var res_element = data.substring(0,pos_element);
		   	
		   	if(res_element=="siyah_pul_secimi"){ 
			  	var show_mesaj="Rakip siyah pullar&#x131; seçti. Kabul ediyorsan&#x131;z Pul seçimi tamam tu&#x15F;una bas&#x131;n";
	 		   	// pullari_yerlestir butonu günüyormu ?
				if ($("#pullari_yerlestir").is(':visible')=== true) {/* element is Visible bir sey yapma */}
	 		   	else {$("button#secimTamam").show();showMessage(show_mesaj);}
 		   	}
 		   
 		    else if(res_element=="mesaj_simple"){
 		    	var pos = data.indexOf("!", data.indexOf("!") + 1);
 		  		var rakibe_mesaj_texte=data.substring(pos_element+1,pos);
 				rakibe_mesaj(rakibe_mesaj_texte);	
 		    	}
 		   	 		   	
 		   else if(res_element=="siyah_pul_secimi_tamam"){
			  	$("#oyuncu_no").val(2);
				$("input#arbit").attr("data-local_user_ref",2);
				$("input#arbit").attr("data-remote_user_ref",1);
				$("input#arbit").attr("local_user_name","player2");
				$("input#arbit").attr("remote_user_name","player1");
	 		   	
	 		   	$("button#secimTamam").hide();
	 		   	$("button#siyah_pullari_sec").hide();
	 		   	$("button#basla").show();
	 		   	
	 		   	showMessage("Siz siyah pullarla oynuyorsunuz");
 		   	
 		   	}
 		   	
 		   	
 		   	
 		   	else if(res_element=="rakibe_el_ver"){

				var joueur=$("input#arbit").attr("data-local_user_ref");
				
				$("input#kayit").attr("data-oyuncu",joueur);
				$("input#oyuncu_no").val(joueur);
				$("button#player"+joueur+"_zar_at").show();
				$("button#devam_et").show();
				$("button#siyah_pullari_sec").hide();
				
				// temizlik
				$("div.piece").removeClass("isaret"); 
				$("input#kayit").attr("data-oyun","0");
				$("input#kayit").attr("data-oyunmax","0");
				$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
				$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
				$("div.point").removeClass("gidecegi_yer_isareti");
				$("input#kayit").attr("data-yera","0"); // kayda al
				$("input#kayit").attr("data-yerb","0"); // kayda al
			 	$("input#kayit").attr("data-position","0"); // kayda al
				$("div#die1").removeClass("active");
				$("div#die2").removeClass("active");
				showMessage("Siz zar at&#x131;yorsunuz");	
 		   	} 
 		   	
 		   	else if(res_element=="oyun_bitti"){
				var pos = data.indexOf("!", data.indexOf("!") + 1);
		   		var oyuncu=data.substring(pos_element+1,pos);
				
				$("div.piece").removeClass("isaret"); 
				$("input#kayit").attr("data-oyun","0");
				$("input#kayit").attr("data-oyunmax","0");
				
				// temizlik
						
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
			$("div#die1").removeClass("active");
			$("div#die2").removeClass("active");	
 		   	if(oyuncu==1){showMessage("oyunu TURUNCU PULLAR  kazand&#x131;");}	
 		   	if(oyuncu==2){showMessage("oyunu SIYAH PULLAR  kazand&#x131;");}
 		   	} 
		   	
		   	else if(res_element=="zar"){
		   		var pos_zar1 = data.indexOf("!", data.indexOf("!") + 1);
		   		var zar1=data.substring(pos_element+1,pos_zar1);
		   		var pos_zar2 = data.lastIndexOf("!");
				var zar2 = data.substring(pos_zar1+1,pos_zar2);
		   		
		   		//zarlari salla
		   		$("div.die").effect( "shake" );
		   		rakip_zari_goster(zar1,zar2);
 
 				}
 				
 			else if(res_element=="zar_koret"){
 				var pos_pul1 = data.indexOf("!", data.indexOf("!") + 1);
 		  		var zar=data.substring(pos_element+1,pos_pul1);
 				$("div#"+zar+".die.active").removeClass("active");	
 				}	
 			
 			else if(res_element=="baslangic_isaret_sil"){
 				var pos = data.indexOf("!", data.indexOf("!") + 1);
 		  		var position=data.substring(pos_element+1,pos);
 
 				$("div.point[data-id="+position+"]").find("div.piece.isaret").remove();	
 				}	
 			
 			else if(res_element=="oyuncunun_pullarini_isaretle"){
 				var pos = data.indexOf("!", data.indexOf("!") + 1);
 		  		var oyuncu=data.substring(pos_element+1,pos);
 	  		
				$("div.point.player"+oyuncu).each(function(){$(this).find("div.piece").last().addClass("isaret");})
 				}
 		  
 		  else if(res_element=="pul"){
 		  	var pos_pul1 = data.indexOf("!", data.indexOf("!") + 1);
 		  	var yer1=data.substring(pos_element+1,pos_pul1);
		   	var pos_pul2 = data.lastIndexOf("!");
			var yer2 = data.substring(pos_pul1+1,pos_pul2);
			//alert(year1+","+yer2);
			$("div.point[data-id="+yer1+"]").children(":first").remove();
			
			$("div.point[data-id="+yer2+"]").addClass("player1").prepend('<div class="piece"></div>');
 		  	
		   }
		   
		  else if(res_element=="kirik_pul"){
 		  	var pos_pul1 = data.indexOf("!", data.indexOf("!") + 1);
 		  	var yer1=data.substring(pos_element+1,pos_pul1);
		   	var pos_pul2 = data.lastIndexOf("!");
			var yer2 = data.substring(pos_pul1+1,pos_pul2);
			
			$("div.point[data-id="+yer1+"]").children(":first").remove();
			// pulu kirik yere at
			$("<div class=\"kirik_pul\"></div>" ).prependTo($("div.kirik_pul_kutusu2" ));
			showMessage("2 nolu oyuncunun K&#x131;r&#x131;k pulu var");
			// Rakibin pulunu kaldir
			$("div.point[data-id="+yer1+"]").removeClass("player2");
 		  	
		   }  
		   
		  else if(res_element=="yer_isaretle"){
 		  	var pos_pul1 = data.indexOf("!", data.indexOf("!") + 1);
 		  	var yer1=data.substring(pos_element+1,pos_pul1);
			if(yer1>0){$("div.point[data-id="+yer1+"]").addClass("gidecegi_yer_isareti");} 
 		  	
		   }
		  else if(res_element=="toplama_kutusu_isaretle"){
		  	var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var kutu_no=data.substring(pos_element+1,pos);
 		  	$("div.toplanan_pul_kutusu"+kutu_no).addClass("gidecegi_yer_isareti");
		   }  
		  
		  else if(res_element=="temizlik_gidilecek_yeri_goster"){
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");			
		   }
		   
		  else if(res_element=="temizlik_toplama_modu"){
			$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isareti");
			$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isareti");
			$("div.point").removeClass("gidecegi_yer_isareti");		
		   }
		   		   
		  else if(res_element=="temizlik_kirik_pul_modu"){
			$("div.point").removeClass("gidecegi_yer_isareti");
		   }
		  else if(res_element=="temizlik_normal_mod"){
			$("div.point").removeClass("gidecegi_yer_isareti");
		   } 
		   
		   
		  else if(res_element=="kirik_pulu_bul"){ 
		  	var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var kutu_no=data.substring(pos_element+1,pos);
 		  		$("div.kirik_pul_kutusu"+kutu_no).find("div.kirik_pul").last().addClass("isaret");	
		  }
		  
		   else if(res_element=="kirik_pul_isaretli_olani_sil"){ 
		  	var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var kutu_no=data.substring(pos_element+1,pos);
 		  		$(kutu_no).find("div.kirik_pul.isaret").remove();
		   
		   } 
		     
		    else if(res_element=="normal_pul_isaretli_olani_sil"){
 		  	var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
 		  	var position=data.substring(pos_element+1,pos_1);
		   	var pos_2 = data.lastIndexOf("!");
			var oyuncu_no = data.substring(pos_1+1,pos_2);
			$("div.point[data-id="+position+"]").removeClass("player"+oyuncu_no);
		   }
		   
		   else if(res_element=="gidilecek_yere_pul_ekle"){ 
		  	var pos_1= data.indexOf("!", data.indexOf("!") + 1); 
		  	var ben=data.substring(pos_element+1,pos_1);
		  	var pos_2 = data.lastIndexOf("!");
			var yer = data.substring(pos_1+1,pos_2);		  	
 		  		$("div.point[data-id="+yer+"]").prepend("<div class='piece'></div>");
				$("div.point[data-id="+yer+"]").removeClass("gidecegi_yer_isareti");
				$("div.point[data-id="+yer+"]").addClass(ben);
		   	}	   
		   
		   else if(res_element=="kirilan_pulun_yerine_pul_ekle"){ 
		  	var pos_1= data.indexOf("!", data.indexOf("!") + 1); 
		  	var ben=data.substring(pos_element+1,pos_1);
		  	var pos_2 = data.lastIndexOf("!");
			var yer = data.substring(pos_1+1,pos_2);
			if(ben=="player1"){var rakip="player2";} else {var rakip="player1";}
				$("div.point[data-id="+yer+"]").find("div.piece").remove();
			 	$("div.point[data-id="+yer+"]").removeClass(rakip);
				$("div.point[data-id="+yer+"]").addClass(ben);

		   	}	   
		   else if(res_element=="rakip_kirik_pulu_kirik_kutusuna_at"){ 
		  	var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var kirik_kutusu_rakip=data.substring(pos_element+1,pos);
 		  		$(kirik_kutusu_rakip).prepend("<div class='kirik_pul'></div>");
		   } 
		   
		   else if(res_element=="kendi_kirik_pulumu_kutudan_cikart"){ 
		  	var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var kirik_kutusu_benim=data.substring(pos_element+1,pos);
 		  		$(kirik_kutusu_benim).find("div.kirik_pul.isaret").remove();
		   } 
		   else if(res_element=="baslangic_temizlik"){
			var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var position=data.substring(pos_element+1,pos);
 		  	$("div.point[data-id="+position+"]").find("div.piece.isaret").remove();	
		   } 
		   else if(res_element=="baslangic_bos_yer_temizlik"){ 
		  	var pos_1= data.indexOf("!", data.indexOf("!") + 1); 
		  	var position=data.substring(pos_element+1,pos_1);
		  	var pos_2 = data.lastIndexOf("!");
			var oyuncu_no = data.substring(pos_1+1,pos_2);
				$("div.point[data-id="+position+"]").removeClass("player"+oyuncu_no);

		   	}	   
		   
		  else if(res_element=="kirilan_pulun_yerine_pul_koy"){
			var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var yer=data.substring(pos_element+1,pos);
 		  	$("div.point[data-id="+yer+"]").prepend("<div class='piece'></div>");
			$("div.point[data-id="+yer+"]").removeClass("gidecegi_yer_isareti");
				
		   }  
		   
		   else if(res_element=="kutuya_pul_ekle"){
			var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var oyuncu=data.substring(pos_element+1,pos);
			var hedef= $("div.toplanan_pul_kutusu"+oyuncu);
			$(hedef).prepend("<div class='toplanan_pul'></div>");
				
		   }  
		   
		   
		   
		   
		 } // dekadaj sonu