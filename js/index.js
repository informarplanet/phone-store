// fetch data
const phonsData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone");
    const data = await (res.json());
    ShowPnones(data.data);

}
phonsData();

const ShowPnones = (phones) => {
    // show data on page
    // get card container where put the card
    const cardContainer = document.getElementById('cardContainer');
    // clear the result
    cardContainer.textContent = '';

    // display no data found
    const datanotFoundcont = document.getElementById('datanotFoundcond');
    if (!phones.length > 0) {
        datanotFoundcont.removeAttribute('hidden');
        showloader(false);
    } else {
        datanotFoundcont.setAttribute('hidden', '')
    }
    // display show more button
    const displayShowMore = document.getElementById('showMore');
    if (phones.length > 10) {
        displayShowMore.removeAttribute('hidden')
    } else {
        displayShowMore.setAttribute('hidden', '')
    }
    // show 10 data only
    const phone = phones.slice(0, 10)
    // display data each iten on each container
    phone.forEach(element => {
        // creat a dive
        const div = document.createElement('div');
        div.classList = 'card';

        // inner part of div
        div.innerHTML = `
            <img width="250px" src="${element.image}" alt="" srcset="">
            <p> Nmae: <span>${element.phone_name}</span></p>
            <p> Price: <span>200000</span></p>
            <button class="details-btn" type="submit" onclick="handleShowdetails('${element.slug}')"> Show Details</button>
        `;
        cardContainer.appendChild(div);
    });
    // hide loader
    showloader(false);
}

// Search button click 

document.getElementById('searchBtn').addEventListener('click', function () {
    // loader running
    showloader(true);
    // Get input search value from id
    const searchfield = document.getElementById('searchFied');
    const searchValue = searchfield.value;

    // Fetching data from the API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data => ShowPnones(data.data))

});

// show loader
const showloader = (isLoading) => {
    const loader = document.getElementById('loderContainer')
    if (isLoading) {
        loader.removeAttribute('hidden')
    } else {
        loader.setAttribute('hidden', '')
    }
}

const handleShowdetails=async(id)=>{
    const  res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json()
    console.log(data.data)
   
    const modalBox = document.getElementById('modalBox');
    modalBox.innerHTML=`
    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            
            <h3 class="font-bold text-lg">${data.data.brand}</h3>
            <img src="${data.data.image}" alt="" srcset="">
            <p class="py-4">chipSet : ${data.data?.mainFeatures?.chipSet}</p>
            <p class="py-4">displaySize : ${data.data?.mainFeatures?.displaySize}</p>
            <p class="py-4">memory : ${data.data?.mainFeatures?.memory}</p>
            <p class="py-4">storage : ${data.data?.mainFeatures?.storage}</p>
            <p class="py-4">Bluetooth : ${data.data?.others?.Bluetooth || ' No blooth Available'}</p>
            <p class="py-4">WLAN : ${data.data?.others?.WLAN || 'No WLAN Available'} </p>
            <p class="py-4">GPS : ${data.data?.others?.GPS || 'No GPS Available'}</p>
            <p class="py-4">USB : ${data.data?.others?.USB || 'No USB Available'}</p>

        </div>
    </dialog>
    `
    my_modal_3.showModal()
}


