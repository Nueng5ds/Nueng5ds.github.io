function handleSubmit(){
    var inputName = document.getElementById("user").value;
    var inputpass = document.getElementById("password").value;
    localStorage.setItem("user",inputName);
    localStorage.setItem("password",inputpass);}