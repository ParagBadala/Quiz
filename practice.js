
var flag=0;
function loginDetail(){
	var user = document.getElementById("userName").value;
	var pwd = document.getElementById("pwd").value;
    $.get("loginDetails.json",function validate(data,status){
    
    if(user == data["userName"] && pwd == data["password"])
    {
       //alert(flag);
        flag = 1;
        window.location="question.html";
    }
    if(flag==0){
   //     alert("hello");
    document.getElementById("error").style.paddingLeft="25%";
    document.getElementById("error").style.color="red"
    document.getElementById("error").innerHTML="Invalid Credientials";    
    }
   
});
}