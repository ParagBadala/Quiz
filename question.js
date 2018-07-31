var i=1;
var count=0;
var ranswer="";
var imp="";
var timeoutHandle;
var myMap = new Map();
var main=function(){
    document.getElementById("butn").disabled=true;
    $.get("question.json",function display(data,status){
        document.getElementById("no").innerHTML=data[0].qno;
        document.getElementById("question").innerHTML=data[0].question;
        document.getElementById("option1").innerHTML=data[0].option1;
        document.getElementById("option2").innerHTML=data[0].option2;
        document.getElementById("option3").innerHTML=data[0].option3;
        document.getElementById("option4").innerHTML=data[0].option4;
        imp=data;    
    });
    countdown(4);
}
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {
            if(mins > 1){
               setTimeout(function () { countdown(mins - 1); }, 1000);
            }
        }
    }
    tick();
}

/*var score = function(){
    var res=0;
    alert("hello");
    for(var k=0;k<myMap.size;k++){
        if(myMap[k].value){
            res++;
        }
    }
    document.getElementById("cont").innerHTML="Your score is "+res+"/5";
}
*/
function checkanswer(a){
    for(var j=1;j<=4;j++){
        var pId="option"+j;
        var radioId="r"+j
        if(document.getElementById(radioId).checked){
            var b=j-1;
            myMap.set(a,b);   
            if(ranswer==document.getElementById(pId).innerHTML)
            {
                count++;
            }
        } 
    }
}
/*
function storageSession(){
    if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem("count",count);
    }
}

function retriveLocal(){
     return sessionStorage.getItem("count");
}
*/
var nextQuestion = function(){
    document.getElementById("butn").disabled=false;
    if(i==imp.length){
        checkanswer(imp[i-1].qno);
        if(confirm("Do you want to submit")){
            clearTimeout(timeoutHandle);
            document.getElementById("timer").style.color="white";
             document.getElementById("cont").style.fontSize = "x-large";
             document.getElementById("cont").style.paddingLeft="33%";
             document.getElementById("cont").style.color="green";
             document.getElementById("cont").innerHTML="Your score for this quiz is "+count+"/5"
        }
        return false;
        }
        ranswer=imp[i-1].answer;
        checkanswer(imp[i-1].qno);
        clear();
        document.getElementById("no").innerHTML=imp[i].qno;
        document.getElementById("question").innerHTML=imp[i].question;
        document.getElementById("option1").innerHTML=imp[i].option1;
        document.getElementById("option2").innerHTML=imp[i].option2;
        document.getElementById("option3").innerHTML=imp[i].option3;
        document.getElementById("option4").innerHTML=imp[i].option4;
        if(i==imp.length-1){
            document.getElementById("butn1").innerHTML="FINISH";
                }
        i++;    
 }
function retrieveData(data,status){
        document.getElementById("no").innerHTML=data[i-1].qno;
        document.getElementById("question").innerHTML=data[i-1].question;
        document.getElementById("option1").innerHTML=data[i-1].option1;
        document.getElementById("option2").innerHTML=data[i-1].option2;
        document.getElementById("option3").innerHTML=data[i-1].option3;
        document.getElementById("option4").innerHTML=data[i-1].option4; 
}
function checkMap(){
    var get_values = myMap.values();
    var get_keys = myMap.keys();
    for(key of get_keys){   
    if(key==imp[i-1].qno){
            if(myMap.get(key)){
                var v=myMap.get(key)+1;
                document.getElementById("r"+v).checked = true;
                break;
            }
        }
    }
}
var prevQuestion = function(){
    if(i==1){
        document.getElementById("butn").disabled=true;
        return false;
    }
    else{
        i--;
        checkMap();
        retrieveData(imp,status);        
    }
}
function clear(){
    var opt = document.getElementsByName("optradio");
    for(var z=0;z<4;z++){
        if(opt[z].checked==true){
            opt[z].checked=false;
        }
    }
}