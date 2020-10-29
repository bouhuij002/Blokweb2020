//Gebruik gemaakt van https://www.youtube.com/watch?v=KcdBOoK3Pfw voor het maken en gebruik van deze javascript code.

//Geeft het eerste element in het document dat overeenkomt met de opgegeven selector, in dit geval de class carousel-slide
const carouselSlide = document.querySelector('.carousel-slide');

//Geeft alle elementen in het document dat overeenkomt met de opgegeven selector, in dit geval pakt hij dus alle images uit de class carousel-slide
const carouselImages = document.querySelectorAll('.carousel-slide img');

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//let wordt hier gebruikt zodat de waarden nog kan worden geupdate, met de 1 wordt simpelweg de eerste image gepakt
let counter = 1;

//Hier wordt de width van 1 image geselecteert zodat je weet hoeveel je opzij moet schuiven. Dit geeft je de originele width terug.
const size = carouselImages[0].clientWidth;


//Omdat je op de eerste originele img wilt beginnen (en niet op de fake eerste), wordt hiermee 1 foto opzij geschoven, naar links vanwege de -, zodat je begint op de juiste foto
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';


//Button Listeners

nextBtn.addEventListener('click', () => { //Wanneer je op de next button klikt, voert hij een opdracht uit
    if (counter >= carouselImages.length - 1) return; //Ook hier return je een oorspronkelijk waarde, zodat je niet uit de carousel vliegt wanneer de counter geen tijd heeft om te herstellen
    carouselSlide.style.transition = "transform 0.4s ease-in-out"; //Hier geef je het een transition (animatie) mee
    counter++; //Hier geef je de counter een +1, dus als hij 1 was dan is die nu 2
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)'; //Hiermee ga je nu weer verder naar de volgende image, aangezien je counter nu +1 gaat als je op de knop drukt
});

//Hier gebeurt hetzelfde als boven, alleen als je drukt gaat de counter -1 in plaats van plus  
prevBtn.addEventListener('click', () => {
    if (counter <= 0) return; //Zonder deze regel geef je de counter geen tijd om te herladen, waardoor je een bug krijgt waarmee je uit de carousel schiet en de images verdwijnen. Als de counter gelijk of kleiner is dan 0, dan returned hij een naar de oorspronkelijke foto
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

//Wanneer de transform hierboven klaar is, dan begint de listener hierbeneden te werken


carouselSlide.addEventListener('transitionend', () => { //is een evenlistener die triggered wanneer een transition klaar is.  
    if (carouselImages[counter].id === 'lastClone') { //Hierin maak je een if statement waarbij je zegt dat als de id lastClone (1 van de fake images) gelijk staat aan 1 van de images, dan gebeurt er iets
        carouselSlide.style.transition = "none"; //Hier haal je de transition weg, zodat je meteen door kan spelen naar de volgende image, zonder een raar effect  
        counter = carouselImages.length - 2; //Hier geef je de counter een nieuwe waarde van alle images de lengte, waarbij die -2 de fake foto's aangeven
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    //Hier gebeurt hetzelfde als boven, alleen de andere kant op
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter; //Hier is het idee hetzelfde als met de -2, alleen snap ik niet zo goed waarom je hier counter gebruikt, wordt ook niet uitgelegd in het filmpje, zou je dit nog kunnen uitleggen Robert?
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});
