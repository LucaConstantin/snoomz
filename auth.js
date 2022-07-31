var signin_click=document.querySelector(".signin-click");
var card_toggle=document.querySelector(".card");
signin_click.addEventListener('click',function(){
card_toggle.classList.toggle('active');
});


var signup_click=document.querySelector(".signup-click");
var card_toggle=document.querySelector(".card");
signup_click.addEventListener('click',function(){

card_toggle.classList.toggle('active');
});

var click_eye_signin=document.querySelector(".change_eye");
var input_signin=document.querySelector("#password_input_signin");
var eye_signin=document.querySelector(".change_eye");
click_eye_signin.addEventListener('click',function(){
if(input_signin.type=='password'){
input_signin.type='text'
input_signin.classList.add('warning');
eye_signin.classList.remove('fa-eye-slash')
eye_signin.classList.add('fa-eye')
}
else{
input_signin.type='password'
input_signin.classList.remove('warning');
eye_signin.classList.add('fa-eye-slash')
eye_signin.classList.remove('fa-eye')
}
});






var click_eye=document.querySelector(".fa-eye-slash");
var input=document.querySelector("#password_input");
var eye=document.querySelector(".fa-eye-slash");
click_eye.addEventListener('click',function(){
if(input.type=='password'){
input.type='text'
input.classList.add('warning');
eye.classList.remove('fa-eye-slash')
eye.classList.add('fa-eye')
}
else{
input.type='password'
input.classList.remove('warning');
eye.classList.add('fa-eye-slash')
eye.classList.remove('fa-eye')
}
});




