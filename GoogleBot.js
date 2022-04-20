// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Luybov Masalova
// @match       https://www.google.com/*
// @match       https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


let keywords = ["Редакции - это резервные копии","10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];

if(btnK !== undefined) {
  //console.log(keyword);
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  },500);
}else if (location.hostname == "napli.ru") {

  setInterval(()=>{
    let index = getRandom(0, links.length);
    if (getRandom (0, 101) >= 80) {
      location.href = "https://www.google.com/";
    } else if(links[index].href.indexOf("napli.ru") !== -1) {
      links[index].click();
    }
  }, getRandom(1500, 5000));
  //console.log(Мы на "napli.ru");

}else {
  let nextGooglePage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") !== -1) {
      let link = links[i]
      nextGooglePage = false;
      // console.log("Нашел строку " + links[i]);
      setTimeout(()=>{
        link.click();
      }, getRandom(1500,4000));
      break;
    }
  }
  if (document.querySelector(".YyVfkd").innerText == "5") {
    nextGooglePage = false;
    location.href = "https://www.google.com/";
  }
  if (nextGooglePage) {
    setTimeout(()=>{pnnext.click();
                   }, getRandom(2000,4000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
