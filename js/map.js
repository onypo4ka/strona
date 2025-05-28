let map;
let activeInfoWindow;

function initMap() {

    const mapOptions = {
        center: { lat: 52.409538, lng: 	16.931992}, 
        zoom: 8
};


map = new google.maps.Map(document.getElementById('map'), mapOptions);

  
const locations = [
    {
        position: { lat: 50.061947, lng: 19.936856 }, 
        title: "Sklep w Krakowie",
        info: "Nasz sklep w Krakowie <br> znajduje się na ulicy Floriańskiej",
        icon: "https://img.icons8.com/color/48/000000/shop.png",
        open_day: "Poniedziałek-Piątek",
        open: "9:00-19:00",
    },
    {
        position: { lat: 51.107885, lng: 17.038538 }, 
        title: "Sklep we Wrocławiu",
        info: "Nasz sklep we Wrocławiu <br> znajduje się na ulicy Świdnickiej",
        icon: "https://img.icons8.com/color/48/000000/shop.png",
        open_day: "Poniedziałek-Sobota",
        open: "8:00-20:00",
    },
    {
        position: { lat: 52.229676, lng: 21.012229 }, 
        title: "Sklep w Warszawie",
        info: "Nasz sklep w Warszawie <br> znajduje się na ulicy Marszałkowskiej",
        icon: "https://img.icons8.com/color/48/000000/shop.png",
        open_day: "Codziennie",
        open: "9:00-21:00",
    },
    {
        position: { lat: 53.428543, lng: 14.552812 }, 
        title: "Sklep w Szczecinie",
        info: "Nasz sklep w Szczecinie <br> znajduje się na alei Wyzwolenia",
        icon: "https://img.icons8.com/color/48/000000/shop.png",
        open_day: "Poniedziałek-Piątek",
        open: "10:00-18:00",
    },
    {
        position: { lat: 54.352025, lng: 18.646638 }, 
        title: "Sklep w Gdańsku",
        info: "Nasz sklep w Gdańsku <br> znajduje się na ulicy Długiej",
        icon: "https://img.icons8.com/color/48/000000/shop.png",
        open_day: "Wtorek-Sobota",
        open: "9:00-19:00",
    },
];



locations.forEach((location) => {

    const marker = new google.maps.Marker({

        position: location.position,
        map: map,
        title: location.title,
        icon: {
            url: location.icon,
            scaledSize: new google.maps.Size(35, 35)
        },
        animation: google.maps.Animation.DROP
        
    });

    const infowindow = new google.maps.InfoWindow({

        content: `<div class="infowindow-content"><strong>${location.title}</strong><br>
        <strong>Otwarty w dniach: </strong> ${location.open_day}
        <br><strong>Otwary w godzinach: </strong>${location.open}<br>${location.info}</div>`

    });

    marker.addListener('click', () => {

        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;

    });

    marker.addListener('dblclick', () => {

        window.location.href = location.destination;

    });
});
}
