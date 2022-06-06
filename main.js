'use strict'

//Elements
const adviceIdElem = document.getElementsByClassName('advice__id')[0]
const adviceElem = document.getElementsByClassName('advice__text')[0]
const langDropdownElem = document.getElementsByClassName('advice__lang-dropdown')[0]
const adviceButtonElem = document.getElementsByClassName('advice__btn')[0]

//Listeners
langDropdownElem.addEventListener('change', translateAdvice)
adviceButtonElem.addEventListener('click', newAdvice)

//Variables
let advice;
let lang = 'en-GB';

//Functions
function newAdvice() {
    adviceElem.innerText = 'Loading advice...'
    adviceIdElem.innerText = '...'
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            if (lang != 'en-GB') {
                advice = data.slip.advice
                translateAdvice()
                adviceIdElem.innerText = data.slip.id
            } else {
                advice = data.slip.advice
                adviceElem.innerText = data.slip.advice
                adviceIdElem.innerText = data.slip.id
            }
        })
}
function translateAdvice() {
    lang = langDropdownElem.value
    fetch(`https://api.mymemory.translated.net/get?q=${advice}&langpair=en|${lang}`)
        .then(response => response.json())
        .then(data => {
            adviceElem.innerText = data.responseData.translatedText
        })
}

//OnLoad
fetch('langs.json')
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            let option = document.createElement('option')
            option.value = key
            option.innerText = data[key]
            langDropdownElem.appendChild(option)
        }
        langDropdownElem.value = 'en-GB'
    })
newAdvice()