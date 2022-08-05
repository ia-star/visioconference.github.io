/* ***************************************************************************
// ----------- NAVIGATORUN DILINI BUL Ve Mesajlari Ayarla----------------------
// *************************************************************************** */

    //console.log(secilendil);
var language = navigator.language;
//var language = secilendil;
var sourceText=[''];
var ref=[' '];
var yeni_tercume=[''];
var url=[''];

function tercume_et(veri,yer,dil){
 //Tercume ediyoruz
 var url_text= "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+dil+"&dt=t&q=" + encodeURI(veri);
 $.getJSON(url_text, function(data){
     var tercume=data[0][0][0];
     document.getElementById(yer).textContent=tercume;

 });

}
            /* SELECT using PARENT.childNodes */
            let allChildren = document.querySelector("#info").childNodes

            for(let i=0; i < allChildren.length; i++) {
                ref[i]=allChildren[i].id;
                if(typeof ref[i] === 'undefined'){}
                else {   
                    //console.log(i,allChildren[i].id);
                    
                    //console.log(i,ref[i]);
                    // ingilizce isimleri çekiyoruz
                    sourceText[i]=document.getElementById(ref[i]).textContent;
                    
                    // Tercume ediyoruz
                    url[i] = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+language+"&dt=t&q=" + encodeURI(sourceText[i]);
                     //console.log(url[i]);
                    // Yerlestriyoruz
                    $.getJSON(url[i], function(data) {
                        yeni_tercume[i]=data[0][0][0];
                        document.getElementById(ref[i]).textContent=yeni_tercume[i];
                        //console.log(i,ref[i],"-",yeni_tercume[i]);
                        });
                        
                }
                
            }

            var headline=document.getElementById("headline").textContent;
            tercume_et(headline,"headline",language);
            var copy_but=document.getElementById("copy_button").textContent;
            tercume_et(copy_but,"copy_button",language);
            var copy_inf=document.getElementById("copy_info").textContent;
            tercume_et(copy_inf,"copy_info",language);
            var email_but=document.getElementById("email_button").textContent;
            tercume_et(email_but,"email_button",language);
            var email_inf=document.getElementById("email_info").innerHTML;
            tercume_et(email_inf,"email_info",language);

