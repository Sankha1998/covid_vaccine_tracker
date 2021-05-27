function reverseString(str) {
    const arrayStrings = str.split("-");
   
    const reverseArray = arrayStrings.reverse();
 
    const joinArray = reverseArray.join("-");
   
    return joinArray;
}




var url_st = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';

fetch(url_st)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        (data.states).forEach(element => {
    
            document.querySelector('#optionstate').innerHTML+=`<li><a class="dropdown-item stateselectedbyuser" data-id="${element.state_id}">${element.state_name}</a></li>`;
    
        });
    
      });



document.querySelector('.selectstate').addEventListener('click',(event)=>{
        target = event.target;
        if (target.classList.contains('stateselectedbyuser')) { 

          document.querySelector('#setst').innerHTML=``;

            var stateid = target.getAttribute('data-id');

            document.querySelector('#setst').innerHTML = `${target.innerHTML}`;
    

            district(stateid);
        }
    
    })



function district(stateid){
    var url_dist = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+ stateid;

    fetch(url_dist)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector('#optiondata').innerHTML=``;
        (data.districts).forEach(element => {

    
            document.querySelector('#optiondata').innerHTML+=`<li><a class="dropdown-item optionselectedbyuser" data-id="${element.district_id}">${element.district_name}</a></li>`;

    
        });
    
    
      });

      document.querySelector('.selectoption').addEventListener('click',(event)=>{
        target = event.target;
        if (target.classList.contains('optionselectedbyuser')) { 

          document.querySelector('#setdist').innerHTML=``;

          var distid = target.getAttribute('data-id');

          document.querySelector('#setdist').innerHTML=`${target.innerHTML}`;




            document.querySelector('#submitall').addEventListener('click',()=>{

                var dateselected = document.querySelector('#availabledate').value;

                dateselected = reverseString(dateselected);

                console.log(distid);

                findbydist(distid,dateselected);

            })

            

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();


            today = dd + '-' + mm + '-' + yyyy;

            findbydist(distid,today);
        }
    
    })
       

}

function findbydist(distid,dateselected){

    url_findbydist = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+distid+'&date='+dateselected;

    fetch(url_findbydist)
    .then((response) => {
    return response.json();
    })
    .then((data) => {

      if(data.sessions.length===0){

        document.querySelector('#displaycontent').innerHTML=``;
        document.querySelector('#displaycontent').innerHTML=`<h1 class="text-light">No Date Available ! Try Another Date<h5>`

      }else{

        document.querySelector('#displaycontent').innerHTML=``;

        (data.sessions).forEach((element) => {

          document.querySelector('#displaycontent').innerHTML+=`<div class="card bg-dark" style="width: 19rem; padding:2px;">
                                                                  <div class="card-body" style="background-color:#eee;">
                                                                    <Strong class="card-title">${element.name}</Strong>
                                                                    <span class="text-muted"><small>(Center-ID:${element.center_id})</small></span>
                                                                    <br>
                                                                    <span class="card-text">
                                                                    <svg height="12" viewBox="0 0 512.00069 512" width="15" xmlns="http://www.w3.org/2000/svg"><path d="m316 376h-120c-2.820312 3.554688-97.179688 122.449219-100 126h320c-2.820312-3.554688-97.179688-122.445312-100-126zm0 0" fill="#eafaff"/><path d="m402 376h-86c2.820312 3.554688 97.179688 122.449219 100 126h86c-2.820312-3.554688-97.179688-122.445312-100-126zm0 0" fill="#96c8ef"/><path d="m256 439c-.449219-.703125-124.746094-195.65625-124.808594-195.757812-15.910156-23.820313-25.191406-52.453126-25.191406-83.242188 0-82.839844 67.160156-150 150-150s150 67.160156 150 150c0 30.789062-9.28125 59.421875-25.191406 83.242188-.0625.097656-124.371094 195.070312-124.808594 195.757812zm74.921875-229.121094c9.867187-14.738281 15.078125-32 15.078125-49.878906 0-49.628906-40.371094-90-90-90s-90 40.371094-90 90c0 17.878906 5.210938 35.140625 15.089844 49.898438 16.78125 25.113281 44.769531 40.101562 74.910156 40.101562s58.128906-14.988281 74.921875-40.121094zm0 0" fill="#ff523d"/>
                                                                    <path d="m110 376c-2.820312 3.554688-97.179688 122.449219-100 126h86c2.820312-3.554688 97.179688-122.445312 100-126zm0 0" fill="#96c8ef"/><path d="m316 260c-5.519531 0-10 4.480469-10 10s4.480469 10 10 10 10-4.480469 10-10-4.480469-10-10-10zm0 0"/>
                                                                    <path d="m102.167969 369.785156-100 126c-2.386719 3.003906-2.839844 7.109375-1.171875 10.5625 1.667968 3.457032 5.167968 5.652344 9.003906 5.652344h492c3.835938 0 7.335938-2.195312 9.003906-5.652344 1.671875-3.453125 1.214844-7.558594-1.171875-10.5625l-100-126c-1.894531-2.390625-4.78125-3.785156-7.832031-3.785156h-87.597656l74.785156-117.296875c17.542969-26.300781 26.8125-56.972656 26.8125-88.703125 0-88.222656-71.773438-160-160-160s-160 71.777344-160 160c0 31.730469 9.269531 62.398438 26.8125 88.703125l74.785156 117.296875h-87.597656c-3.050781 0-5.933594 1.394531-7.832031 3.785156zm-37.335938 79.214844h60.464844l-34.125 43h-60.46875zm145.519531-63 27.414063 43h-71.0625l34.128906-43zm91.300782 0h9.519531l34.125 43h-71.058594zm59.519531 63 34.125 43h-278.59375l34.128906-43zm59.660156 43-34.128906-43h60.46875l34.125 43zm10.464844-63h-60.464844l-34.128906-43h60.46875zm-291.789063-191.3125c-15.378906-23.023438-23.507812-49.886719-23.507812-77.6875 0-77.195312 62.804688-140 140-140s140 62.804688 140 140c0 27.800781-8.128906 54.664062-23.503906 77.6875-.042969.058594-.078125.117188-.117188.175781-6.566406 10.300781-111.320312 174.605469-116.378906 182.535157-12.722656-19.957032-103.421875-162.214844-116.378906-182.535157-.035156-.058593-.074219-.117187-.113282-.175781zm35.789063 148.3125-34.125 43h-60.46875l34.128906-43zm0 0"/>
                                                                    <path d="m256 260c54.898438 0 100-44.457031 100-100 0-55.140625-44.859375-100-100-100s-100 44.859375-100 100c0 55.558594 45.117188 100 100 100zm0-180c44.113281 0 80 35.886719 80 80 0 44.523438-36.175781 80-80 80-43.835938 0-80-35.476562-80-80 0-44.113281 35.886719-80 80-80zm0 0"/><path d="m298.121094 294.125c-4.726563-2.851562-10.875-1.328125-13.726563 3.402344l-36.960937 61.320312c-2.851563 4.730469-1.328125 10.875 3.402344 13.726563 4.75 2.863281 10.886718 1.308593 13.726562-3.402344l36.960938-61.320313c2.851562-4.730468 1.328124-10.875-3.402344-13.726562zm0 0"/></svg>
                                                                    <small>${element.address}</small><br>
                                                                    <strong>Block:</strong> ${element.block_name}<br>
                                                                    <strong>Fee:</strong> ${element.fee}<br>
                                                                    <h6 class="text-center"><strong>--Availablility Information--</strong></h6>
                                                                    <div class="row">
                                                                      <div class="col">
                                                                      <small>
                                                                        <strong>Min Age</strong> ${element.min_age_limit}
                                                                      </small>
                                                                      </div>
                                                                      <div class="col">
                                                                        <small><strong class="text-danger">${element.vaccine}</strong></small>
                                                                      </div>
                                                                    </div>
                                                                    <div class="row">
                                                                      <div class="col">
                                                                        <small><strong>Dose 1 :</strong> ${element.available_capacity_dose1}</small>
                                                                      </div>
                                                                      <div class="col">
                                                                        <small><strong>Dose 2 :</strong> ${element.available_capacity_dose2}</small>
                                                                      </div>
                                                                    </div>
                                                                    <h6 class="text-center"><strong>--Timing Information--</strong></h6>
                                                                    <div class="row">
                                                                      <div class="col">
                                                                        <small><strong>Start Time:</strong> ${element.from}</small>
                                                                      </div>
                                                                      <div class="col">
                                                                        <small><strong>End Time :</strong> ${element.to}</small>
                                                                      </div>
                                                                    </div>
                                                                    <strong>Slots:</strong>
                                                                    <ul>
                                                                      ${(element.slots).map(ele => `<small><li>${ele}</li></small>`).join("")}
                                                                    </ul>
                                                                    </span>
                                                                  </div>
                                                                </div>`;

        });

      }
        
      


    });


}


document.querySelector('#search-nearby').addEventListener('click',()=>{
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(latitude,longitude);
    searchnearby(latitude,longitude);
  });
})


function searchnearby(lat,long){
var url = 'https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat='+lat+'&long='+long;

document.querySelector('#displaycontent').innerHTML=``;
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {

    console.log(data.centers);

    var count = 0;

    (data.centers).forEach((ele)=>{

      console.log(ele);
      if(count<12){
        document.querySelector('#displaycontent').innerHTML+=`<div class="card bg-dark text-light" style="width: 19rem; padding:2px;">
                                                          <h5 class="card-header text-info">${ele.name}</h5>
                                                          <div class="card-body">
                                                              <h5 class="card-title">
                                                              <svg height="12" viewBox="0 0 512.00069 512" width="15" xmlns="http://www.w3.org/2000/svg"><path d="m316 376h-120c-2.820312 3.554688-97.179688 122.449219-100 126h320c-2.820312-3.554688-97.179688-122.445312-100-126zm0 0" fill="#eafaff"/><path d="m402 376h-86c2.820312 3.554688 97.179688 122.449219 100 126h86c-2.820312-3.554688-97.179688-122.445312-100-126zm0 0" fill="#96c8ef"/><path d="m256 439c-.449219-.703125-124.746094-195.65625-124.808594-195.757812-15.910156-23.820313-25.191406-52.453126-25.191406-83.242188 0-82.839844 67.160156-150 150-150s150 67.160156 150 150c0 30.789062-9.28125 59.421875-25.191406 83.242188-.0625.097656-124.371094 195.070312-124.808594 195.757812zm74.921875-229.121094c9.867187-14.738281 15.078125-32 15.078125-49.878906 0-49.628906-40.371094-90-90-90s-90 40.371094-90 90c0 17.878906 5.210938 35.140625 15.089844 49.898438 16.78125 25.113281 44.769531 40.101562 74.910156 40.101562s58.128906-14.988281 74.921875-40.121094zm0 0" fill="#ff523d"/>
                                                                    <path d="m110 376c-2.820312 3.554688-97.179688 122.449219-100 126h86c2.820312-3.554688 97.179688-122.445312 100-126zm0 0" fill="#96c8ef"/><path d="m316 260c-5.519531 0-10 4.480469-10 10s4.480469 10 10 10 10-4.480469 10-10-4.480469-10-10-10zm0 0"/>
                                                                    <path d="m102.167969 369.785156-100 126c-2.386719 3.003906-2.839844 7.109375-1.171875 10.5625 1.667968 3.457032 5.167968 5.652344 9.003906 5.652344h492c3.835938 0 7.335938-2.195312 9.003906-5.652344 1.671875-3.453125 1.214844-7.558594-1.171875-10.5625l-100-126c-1.894531-2.390625-4.78125-3.785156-7.832031-3.785156h-87.597656l74.785156-117.296875c17.542969-26.300781 26.8125-56.972656 26.8125-88.703125 0-88.222656-71.773438-160-160-160s-160 71.777344-160 160c0 31.730469 9.269531 62.398438 26.8125 88.703125l74.785156 117.296875h-87.597656c-3.050781 0-5.933594 1.394531-7.832031 3.785156zm-37.335938 79.214844h60.464844l-34.125 43h-60.46875zm145.519531-63 27.414063 43h-71.0625l34.128906-43zm91.300782 0h9.519531l34.125 43h-71.058594zm59.519531 63 34.125 43h-278.59375l34.128906-43zm59.660156 43-34.128906-43h60.46875l34.125 43zm10.464844-63h-60.464844l-34.128906-43h60.46875zm-291.789063-191.3125c-15.378906-23.023438-23.507812-49.886719-23.507812-77.6875 0-77.195312 62.804688-140 140-140s140 62.804688 140 140c0 27.800781-8.128906 54.664062-23.503906 77.6875-.042969.058594-.078125.117188-.117188.175781-6.566406 10.300781-111.320312 174.605469-116.378906 182.535157-12.722656-19.957032-103.421875-162.214844-116.378906-182.535157-.035156-.058593-.074219-.117187-.113282-.175781zm35.789063 148.3125-34.125 43h-60.46875l34.128906-43zm0 0"/>
                                                                    <path d="m256 260c54.898438 0 100-44.457031 100-100 0-55.140625-44.859375-100-100-100s-100 44.859375-100 100c0 55.558594 45.117188 100 100 100zm0-180c44.113281 0 80 35.886719 80 80 0 44.523438-36.175781 80-80 80-43.835938 0-80-35.476562-80-80 0-44.113281 35.886719-80 80-80zm0 0"/><path d="m298.121094 294.125c-4.726563-2.851562-10.875-1.328125-13.726563 3.402344l-36.960937 61.320312c-2.851563 4.730469-1.328125 10.875 3.402344 13.726563 4.75 2.863281 10.886718 1.308593 13.726562-3.402344l36.960938-61.320313c2.851562-4.730468 1.328124-10.875-3.402344-13.726562zm0 0"/>
                                                              </svg>
                                                                    
                                                              <small>
                                                                ${ele.location},
                                                                pincode: ${ele.pincode}
                                                              </small></h5>
                                                          </div>
                                                        </div>`;

      }
      count += 1;
    })

    
  });

}