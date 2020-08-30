
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
		   		$("div#baslik_oyuncu2 img#anlastik").show();
			  	showMessage("Arkada&#x15F;&#x131;n&#x131;z <span style='color:red;'>Gri pullar&#x131; </span>seçti. Kabul ediyorsan&#x131;z anla&#x15F;tik tu&#x15F;una bas&#x131;n"); 
			  	$("input#arbit").attr("data-remote_user_pul","gri_pul");
				$("input#arbit").attr("data-local_user_pul","turuncu_pul");	
 		   	}
 		   	
 		   	 else if(res_element=="yeni_parti"){
 		   	 	$("div#baslik_oyuncu2").show();	
			 	$("div#baslik_oyuncu1").show();	
				$("div#baslik_oyuncu2 img#turuncu_pul").show();
				$("div#baslik_oyuncu2 img#gri_pul").show();
				$("div#baslik_oyuncu2 img#masayi_terket").hide();
				$("div#baslik_oyuncu2 img#yeni_oyun").hide();
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
				
 				   	 
 		   	 }
 		   	else if(res_element=="yeni_oyun"){
 		   		 // Önce bütün pullari sil
				$("div.piece").remove();
				$("div.toplanan_pul").remove();
				$("div.kirik_pul").remove();
				
				start_layout(); 
				$("button#zar_at").show();
				$("button#oynadim").hide();
 		   		
 		   	}
 		   	
 		   else if(res_element=="turuncu_pul_secimi"){
		   		$("div#baslik_oyuncu2 img#anlastik").show();
			  	showMessage("Arkada&#x15F;&#x131;n&#x131;z <span style='color:red;'> Turuncu pullar&#x131; </span> seçti. Kabul ediyorsan&#x131;z anla&#x15F;stik tu&#x15F;una bas&#x131;n"); 
			  	$("input#arbit").attr("data-remote_user_pul","turuncu_pul");
				$("input#arbit").attr("data-local_user_pul","gri_pul");	
 		   	}
 		   else if(res_element=="mesaj_simple"){
 		    	var pos = data.indexOf("!", data.indexOf("!") + 1);
 		  		var gelen_mesaj=data.substring(pos_element+1,pos);
 				showMessage(gelen_mesaj);	
 		    	}
 		   	 		   	
 		   else if(res_element=="pul_secimi_tamam"){
	 		   	if($("input#arbit").attr("data-local_user_pul")=="gri_pul") {
	 		   		$("div#baslik_oyuncu2 img#turuncu_pul").hide();
	 		   		var texte_pul_secimi_tamam=" gri ";
	 		   		}
				else if($("input#arbit").attr("data-local_user_pul")=="turuncu_pul") {
					$("div#baslik_oyuncu2 img#gri_pul").hide();
					var texte_pul_secimi_tamam=" turuncu ";
					}
	 		   	$("div#baslik_oyuncu2 img#anlastik").hide();
	 		   	showMessage("<span style='color:white'> Pul seçimi tamamlandshowMessage <br> Siz"+ texte_pul_secimi_tamam +"pullarla oynuyorsunuz<br><br> Oyuna kimin ba&#x15F;layac&#x11F;&#x131;n&#x131; belirlemek için lütfen ZAR butonuna t&#x131;klay&#x131;n</span>");
 		   		$("input#arbit").attr("data-pul_secimi_tamam","1");
 		   		$("div#baslik_oyuncu2 img#zar").show();
 		   	}
 		   	
 		   	else if(res_element=="atilan_zarlar_esit"){
 		    	showMessage("<span style='color:red;font-weight:bold'>At&#x131;lan zarlar e&#x15F;it. Tekrar zar atal&#x131;m lütfen</span>");
				$("div#baslik_oyuncu2 img#zar").show();
				$("input#dice").attr("data-local_user_zara",0);
				$("input#dice").attr("data-local_user_zarb",0);
				$("input#dice").attr("data-remote_user_zara",0);
				$("input#dice").attr("data-remote_user_zarb",0);
 		   	}
 		   	
 		   	else if(res_element=="oyuna_siz_basliyorsunuz"){
 		    	showMessage("<span style='color:red;font-weight:bold'>Oyuna siz ba&#x15F;l&#x131;yorsunuz</span><br> Zar at&#x131;in lütfen");
 		   		$("div#baslik_oyuncu2 img#masayi_terket").show();
 		   		$("div#baslik_oyuncu2 img#yeni_oyun").show();
 				start_layout();
				
				$("div.die").removeClass("active");
				
				$("button#zar_at").show();
 		   	}
 		   	
 		   	else if(res_element=="oyuna_rakip_basliyor"){
 		    	showMessage("<span style='color:red;font-weight:bold'>Oyuna rakip ba&#x15F;l&#x131;yor</span>");
 
				$("div#baslik_oyuncu2 img#masayi_terket").show();
				$("div#baslik_oyuncu2 img#yeni_oyun").show();
				start_layout();
				
				$("div.die").removeClass("active");
				
 		   	}
 		   	
 		   	else if(res_element=="rakibiniz_oynadi"){
 		   	$("div.die").removeClass("active");	
 		   	$("button#zar_at").show();
 		   	showMessage("Oyun s&#x131;ras&#x131; sizin. Lütfen zar at&#x131;n !");				
 		   	}
 		   
 			else if(res_element=="pul_isreti"){
 				$("div.piece").removeClass("isaret"); //temizlik: tüm pullarin tiklamasini kaldir
				$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil	
				$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik: Tûm yerlerin isretini sil	
				$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
				$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
 				
 			 	var pos_pul1 = data.indexOf("!", data.indexOf("!") + 1);
 		  		var pul_id=data.substring(pos_element+1,pos_pul1);		
 				$("div.point[data-id="+pul_id+"]").find("div.piece").last().addClass("isaretli");
 				$("div.point[data-id="+pul_id+"]").addClass("gidecegi_yer_isaretli");
 console.log("pul isareti: "+pul_id);				
 			}
			 	
			else if(res_element=="kirik_pul_isreti_26"){
			 	$("div.kirik_pul.player2:first").addClass("isaretli");
			 }
			else if(res_element=="kirik_pul_isreti_25"){
			 	$("div.kirik_pul.player1:first").addClass("isaretli");
			 } 	

			else if(res_element=="tum_yerlerin_isaretini_sil"){
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil		
console.log("tum_yerlerin_isaretini_sil");			
			}

			else if(res_element=="tum_yerleri_temizle"){
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
				$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik		
console.log("tum_pointlari_temizle");			
						}
			
			else if(res_element=="genel_temizlik"){
				$("div.piece").removeClass("isaret"); //temizlik: tüm pullarin tiklamasini kaldir
				$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
				$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil	
				$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik: Tûm yerlerin isretini sil	
				$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
				$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");	
					
			}

			
			else if(res_element=="yere_isaret_koy"){
				
				var pos_yer = data.indexOf("!", data.indexOf("!") + 1);
 		  		var yer_id=data.substring(pos_element+1,pos_yer);
	
				$("div.point[data-id="+yer_id+"]").addClass("gidecegi_yer_isaretli"); // sadece bu yere isret koy
console.log("yer isareti: "+yer_id);
			}

 			
 			else if(res_element=="pul_sil"){
 				var pos_pul = data.indexOf("!", data.indexOf("!") + 1);
 		  		var pul_id=data.substring(pos_element+1,pos_pul);				
console.log("pul sil: "+pul_id); 		  		
 		  		$("div.point[data-id="+pul_id+"] :first-child").remove();
 		  		
 			}
 			
 			else if(res_element=="pul_ekle"){ 				
 					var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
 		  			var oyuncum=data.substring(pos_element+1,pos_1);
 		  			var pos_2 = data.lastIndexOf("!");
					var hedef = data.substring(pos_1+1,pos_2);
 console.log("pul ekle: "+oyuncum+" yer:"+hedef);					
 					
 					$( "<div class='piece "+oyuncum+" isaret'></div>" ).prependTo($("div.point[data-id="+hedef+"]"));
 					
			 		$("div.piece").removeClass("isaret"); //temizlik: tüm pullarin tiklamasini kaldir
					$("div.piece").removeClass("isaretli"); //temizlik: tüm pullarin tiklamasini kaldir
					$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik: Tûm yerlerin isretini sil	
					$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik: Tûm yerlerin isretini sil	
					$("div.kirik_pul_kutusu1 div.kirik_pul").removeClass("isaretli");
					$("div.kirik_pul_kutusu2 div.kirik_pul").removeClass("isaretli");
		
 			}
 			
 			else if(res_element=="yerdeki_pulu_kir"){
 				var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
		   		var yer=data.substring(pos_element+1,pos_1);	
 console.log("yerdeki pul kir: "+yer); 		  		
 		  		$("div.point[data-id="+yer+"] :first-child").remove();

 			}
 			
 			
 			
 			else if(res_element=="pulu_kirik_kutusuna_koy"){
 
 		   		var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
		   		var yerdeki_pulun_sahibi=data.substring(pos_element+1,pos_1);
		   		var pos_2 = data.lastIndexOf("!");
				var kirik_pul_kutusu_class = data.substring(pos_1+1,pos_2);
				$( "<div class='kirik_pul "+ yerdeki_pulun_sahibi+" isaret'></div>" ).prependTo($("div."+kirik_pul_kutusu_class));
 			}
 
 
 
 else if(res_element=="kirik_pulu_kutudan_sil_25"){
 	$("div.kirik_pul_kutusu1").find("div.kirik_pul.isaretli").remove();
 }
 
 else if(res_element=="kirik_pulu_kutudan_sil_26"){
 	$("div.kirik_pul_kutusu2").find("div.kirik_pul.isaretli").remove();
 }
 
 else if(res_element=="kirik_pulu_yurut_25"){
 	var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
	var oyuncum=data.substring(pos_element+1,pos_1);
	$("div.kirik_pul_kutusu1").find("div.kirik_pul.isaretli").remove();

	$( "<div class='piece "+oyuncum+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));	
	$("input#kayit").attr("data-yer","0");	//Temizlik
				
	$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
	$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
 }
 
  else if(res_element=="kirik_pulu_yurut_26"){
  	var pos_1 = data.indexOf("!", data.indexOf("!") + 1);
	var oyuncum=data.substring(pos_element+1,pos_1);
  	$("div.kirik_pul_kutusu2").find("div.kirik_pul.isaretli").remove();
				
	$( "<div class='piece "+oyuncum+" isaret'></div>" ).prependTo($("div.point.gidecegi_yer_isaretli"));	
	$("input#kayit").attr("data-yer","0");	//Temizlik
				
	$("div.point").removeClass("gidecegi_yer_isaretli"); // Temizlik
	$("div.point").removeClass("gidecegi_yer_isareti"); // Temizlik	
  	
  }
  
  else if(res_element=="toplama_kutusu1_ac"){$("div.toplanan_pul_kutusu1").addClass("gidecegi_yer_isaretli");}
  else if(res_element=="toplama_kutusu1_kapat"){$("div.toplanan_pul_kutusu1").removeClass("gidecegi_yer_isaretli");}
  else if(res_element=="toplama_kutusu2_ac"){$("div.toplanan_pul_kutusu2").addClass("gidecegi_yer_isaretli");}
  else if(res_element=="toplama_kutusu2_kapat"){$("div.toplanan_pul_kutusu2").removeClass("gidecegi_yer_isaretli");}
  
  else if(res_element=="toplama_kutusu1_tikla"){
  		var pos = data.indexOf("!", data.indexOf("!") + 1);
		var oyuncum=data.substring(pos_element+1,pos);

  		$("div.point").find("div.piece.isaretli").remove();
		$( "<div class='toplanan_pul "+oyuncum+" isaret'></div>" ).prependTo($("div.toplanan_pul_kutusu1"));	

  	}
  else if(res_element=="toplama_kutusu2_tikla"){
  		var pos = data.indexOf("!", data.indexOf("!") + 1);
		var oyuncum=data.substring(pos_element+1,pos);
  	
  		$("div.point").find("div.piece.isaretli").remove();
		$( "<div class='toplanan_pul "+oyuncum+" isaret'></div>" ).prependTo($("div.toplanan_pul_kutusu2"));

  	}
  
  else if(res_element=="bitirdi"){
  		var pos = data.indexOf("!", data.indexOf("!") + 1);
		var oyuncum=data.substring(pos_element+1,pos);

  		alert("üzgünüz, ayunu arakibiniz kazandi");
		showMessage("<span style='color:red;'>üzgünüz, ayunu rakibiniz kazand&#x131;</span><br> Yeni oyuna Rakibiniz ba&#x15F;l&#x131;yacak ! !");
			
			//$("button#pullari_yerlestir").show();
			start_layout();
			$("button#zar_at").hide();
			$("button#oynadim").hide();
  	}
  	
 else if(res_element=="baslik_zarlari_kapat"){
  		$("div#baslik_oyuncu2 input#zar_1").hide();
		$("div#baslik_oyuncu2 input#zar_2").hide();
		
		$("div#baslik_oyuncu1").hide();
		$("div#baslik_oyuncu1 input#zar_1").hide();
		$("div#baslik_oyuncu1 input#zar_2").hide();
} 
  // ************************************************************************** //
  // ************************************************************************** //
 		  	
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
 		   	 
		   	else if(res_element=="baslama_zari"){
		   		var pos_zar1 = data.indexOf("!", data.indexOf("!") + 1);
		   		var zar1=data.substring(pos_element+1,pos_zar1);
		   		var pos_zar2 = data.lastIndexOf("!");
				var zar2 = data.substring(pos_zar1+1,pos_zar2);
		   		
		   		//zarlari salla
		   		$("div.die").effect( "shake" );
		   		rakip_zari_goster(zar1,zar2);

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
		   
		 
		   		   
		   
		   else if(res_element=="kutuya_pul_ekle"){
			var pos= data.indexOf("!", data.indexOf("!") + 1); 
		  	var oyuncu=data.substring(pos_element+1,pos);
			var hedef= $("div.toplanan_pul_kutusu"+oyuncu);
			$(hedef).prepend("<div class='toplanan_pul'></div>");
				
		   }  
		   
		   
		   
		   
		 } // dekadaj sonu