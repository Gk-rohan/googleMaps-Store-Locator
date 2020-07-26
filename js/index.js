var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
    var LosAngeles = { lat: 34.063380, lng: -118.358080 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: LosAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });

    infoWindow = new google.maps.InfoWindow();
    searchStores();
    // displayStores();
    // setOnClickListener();
    // showStoreMarkers();
}

function searchStores(){
    var foundStores = [];
    var zipCode = document.getElementById('zip-code-input').value;
    if(zipCode){
        stores.forEach((store, index) =>{
            var postal = store.address.postalCode.substring(0, 5);
            if(postal == zipCode){
                foundStores.push(store);
            }
        
        })
    } else{
        foundStores = stores;
    }

    clearLocations();
    displayStores(foundStores);
    showStoreMarkers(foundStores);
    setOnClickListener()
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }

function setOnClickListener(){
    var storesElements =  document.querySelectorAll('.store-container')
    storesElements.forEach((elem, index) =>{
        elem.addEventListener('click', function(){
            new google.maps.event.trigger(markers[index], 'click')
        })
    })
    // console.log(storesElements)
}

function displayStores(stores){
    var storesHtml = '';
    stores.forEach(function(store, index){
        var address = store.addressLines;
        var phone = store.phoneNumber;
        storesHtml += `
        <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${index+1}</div>
                    </div>

                </div>
            </div>
        `
    });

    document.querySelector('.stores-list').innerHTML = storesHtml;
}


function showStoreMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    // console.log(stores) just for checking
    stores.forEach(function(stores, index){
        var latlng = new google.maps.LatLng(
            stores.coordinates.latitude,
            stores.coordinates.longitude);

            var name = stores.name;
            var address = stores.addressLines[0];
            createMarker(latlng, name, address, index);
            bounds.extend(latlng);
    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index){
    var html = "<b>" + name + "</b> <br/>" + address;
          var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            label: `${index+1}`
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          });
          markers.push(marker);
}
