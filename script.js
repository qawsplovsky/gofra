

function carouselActivator(){
	document.querySelectorAll("[data-carousel-button]").forEach(button => {
		button.addEventListener("click", () => {
			console.log(button.dataset)
			const offset = button.dataset.carouselButton === "next" ? 1 : -1;
			const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
			const active = slides.querySelector("[data-active]");
			let newIndex = [...slides.children].indexOf(active) + offset;
			if(newIndex < 0) newIndex = slides.children.length - 1;
			if(newIndex >= slides.children.length) newIndex = 0;
			slides.children[newIndex].dataset.active = true;
			delete active.dataset.active;
		})
	})
}


function autoSlide(){
	const slides = document.querySelector("[data-slides]");
	const active = slides.querySelector("[data-active]");
	let newIndex = [...slides.children].indexOf(active) + 1;
	if(newIndex >= slides.children.length) newIndex = 0;
	slides.children[newIndex].dataset.active = true;
	delete active.dataset.active;
	setTimeout(autoSlide, 5000);
}

function navBarer(){
	const NavActivator = document.getElementById("burger")[0];
	const navUl = document.getElementsByClassName("navul")[0];
	NavActivator.addEventListener("click", () => {
		navUl.classList.toggle("navbar-active");
	})
}

function productOpacity(){
	function onEntry(entry) {
	  entry.forEach(change => {
	    if (change.isIntersecting) {
	      change.target.classList.add('element-show');
	    }
	  });
	}
	let options = { threshold: [0.5] };
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.product__item');
	for (let elm of elements) {
	  observer.observe(elm);
	}
}
function serviceOpacity(){
	function onEntry(entry) {
	  entry.forEach(change => {
	    if (change.isIntersecting) {
	      change.target.classList.add('element-show');
	    }
	  });
	}
	let options = { threshold: [0.5] };
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.service__item');
	for (let elm of elements) {
	  observer.observe(elm);
	}
}



function sendForm(){
	let data = {};
	data.name = document.querySelector('[name="name"]').value;
	data.contact = document.querySelector('[name="contact"]').value;
	data.theme = document.querySelector('[name="theme"]').value;
	data.message = document.querySelector('[name="message"]').value;
	if(!data.name) {alert("Имя не может быть пустым"); return};
	if(!data.contact) {alert("Контактные даннык не могут быть пустыми"); return};
	if(!data.theme) {alert("Тема не может быть пустой"); return};
	if(!data.message) {alert("Сообщение не может быть пустым"); return};
	fetch("http://localhost:3000", {
	  method: "POST",
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify(data)
	}).then(res => {
	  alert("Сообщение отправлено")
	}).catch(err => {
		console.log(err);
		alert("Возникла неизвестная ошибка. Пожалуйста, попробуйте заново");
	});
}

function start(){
	carouselActivator()
	autoSlide();
	productOpacity();
	serviceOpacity();
	navBarer();

}
start()