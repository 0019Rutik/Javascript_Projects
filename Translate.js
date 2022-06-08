const  selecTag = document.querySelectorAll("select");
import {countries} from "./count.js";
const exchangeicon = document.querySelector(".exchange");
const fromtext = document.querySelector(".from-text");
var fromto =  document.querySelector(".from-to");
var translateBtn = document.querySelector(".btn");
var icons = document.querySelectorAll(".icons");

selecTag.forEach((tag,id)  => {
    for (const country_code in countries) {
        // selecting the english as from langage and hindi to language
        console.log(countries[country_code]);
        let selected;
        if(id == 0 && country_code == "en-GB") {
            selected="selected";

        }
        else if(id == 1 && country_code =="hi-IN"){
            selected="selected";

        }
    

        let option =`<option value= "${country_code}" ${selected}>${countries[country_code]} </option> `;


        tag.insertAdjacentHTML("beforeend",option); //adding .
        
    }
});


exchangeicon.addEventListener("click", () =>{
    // Exchange selectag and textarea values
    let temptxt = fromtext.value;
    var tempLang  = selecTag[0].value;
    fromtext.value = fromto.value;
    selecTag[0].value = selecTag[1].value;
    fromto.value = temptxt; 
    selecTag[1].value = tempLang;
});



translateBtn.addEventListener("click", () =>{
    let text = fromtext.value;
    console.log(text);
   var translatefrom = selecTag[0].value;
   var translateTo = selecTag[1].value;
    console.log(translatefrom,translateTo);
    if(!text)  return fromto.setAttribute("placeholder","Translating...")
    let apiurl =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateTo}`;

    fetch(apiurl).then(res =>  res.json()).then(data => {
        console.log(data);
        fromto.value =  data.responseData.translatedText;

    });





 });
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) =>{
        if(target.classList.contains("fa-copy")){
            // if clicked icon has from id the fromtext value else copy the totextarea value
            if(target.id == "from") {
                navigator.clipboard.writeText(fromtext.value);
            }
            else{
                navigator.clipboard.writeText(fromto.value);
            }

        }
        else{
            let utterance;
            // if clicked icon has from id , speak the fromtxt value else speak the totext value 
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selecTag[0].value; // select from tag side
            }
            else{
                utterance = new SpeechSynthesisUtterance(fromto.value);
                utterance.lang = selecTag[1].value;  // select from to text value 
        }
        speechSynthesis.speak(utterance);  // speak the passsed utterance 
        }
    })
})





