
// setting firebase with website
const firebaseApp = firebase.initializeApp({ 
    // firebase config
    apiKey: "AIzaSyCRIGwb5MIZc9XLftd-Ijv4nx4m6fDGdJs",
    authDomain: "algo-visualizer-fccee.firebaseapp.com",
    projectId: "algo-visualizer-fccee",
    storageBucket: "algo-visualizer-fccee.appspot.com",
    messagingSenderId: "568087019833",
    appId: "1:568087019833:web:898024c52f36506c4ba8e8"
 });
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// signup function
const signUp=()=>{
    //get email and password from form
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result)=>{
            // location.replace("./pages/dahsboard.html")
            document.getElementById("result-box").style.display="inline";
            document.getElementById("result").innerHTML= "Welcome "+ email +"<br> Registration successful !";
            window.location.replace("dashboard.html");
        })
        .catch((error)=>{
            var errorCode =error.code;
            document.getElementById("result-box").style.display="inline";
            document.getElementById("result").innerHTML= "Oops ! Sorry Signup Failed " +"<br> "+errorCode;
            
        })
}

// signin function 
const login=()=>{
     //get email and password from form
     const email= document.getElementById("email").value;
     const password= document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
        document.getElementById("result-box").style.display="inline";
        document.getElementById("result").innerHTML= "Welcome Back "+ email +"<br> Logged in successfully !";
        window.location.replace("dashboard.html");
    })
    .catch((error) => {
        var errorCode = error.code;
        document.getElementById("result-box").style.display="inline";
        document.getElementById("result").innerHTML= "Oops ! Sorry Login Failed " +"<br> "+errorCode;
    });
}