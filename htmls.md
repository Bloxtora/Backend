<script src="https://hcaptcha.com/1/api.js" async defer></script>
<div class="h-captcha" data-sitekey="fa6c5087-fc8f-4522-aead-49f243017a98" data-callback="hcaptchaCallback"></div>
<button id="create" style="font-size:30px;" onclick="sum();">Create New Account</button>
<script>
    var captchaResponse = ""
function hcaptchaCallback(token){
         captchaResponse = token;
         alert(token)
    }
function sum() {
  var xhr = new XMLHttpRequest();
xhr.open("POST", '/users/signup', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
     var data = xhr.responseText
     data = JSON.parse(data)
console.log(data)
}}
xhr.send("name= &password= &email= &token="+captchaResponse+"");
}
</script>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
