var btn = document.getElementById('button');

btn.addEventListener('click', loadText);

function loadText(){

    //Create XHR Object
    var xhr = new XMLHttpRequest();
    
    //OPEN - type, url/file, async

    xhr.open('GET', 'doluluk.txt', true);

    console.log('READYSTATE: ', xhr.readyState);

    /* xhr.onload = function(){
        if(this.status == 200){
        //console.log(this.responseText);
        document.getElementById('text').innerHTML = this.responseText;
        }
    }  */

     xhr.onreadystatechange = function(){
        console.log('READYSTATE: ', xhr.readyState);
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('text').innerHTML = this.responseText;
        }
    } 

    xhr.onerror = function(){
        console.log('Request Error ...');
    }

    //Sends request
    xhr.send();
}

// readyState Values
// 0: request not initialized
// 1: server connection established
// 2: request recieved
// 3: processing request
// 4: request finished and response is ready
