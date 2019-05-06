var menu = document.querySelector(".main-navigation");
var toggle = document.querySelector(".main-navigation__toggle");

menu.classList.remove("main-navigation--nojs");

toggle.addEventListener("click",function(){
	if(menu.classList.contains("main-navigation--opened")) {
		menu.classList.remove("main-navigation--opened");
		menu.classList.add("main-navigation--closed");
	} else {
		menu.classList.remove("main-navigation--closed");
		menu.classList.add("main-navigation--opened");
	}
});


