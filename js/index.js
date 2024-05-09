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
    cardContainer.textContent='';

    phones.forEach(element => {     
        // creat a dive
        const div = document.createElement('div');
        div.classList = 'card';

        // inner part of div
        div.innerHTML = `
            <img width="250px" src="${element.image}" alt="" srcset="">
            <p> Nmae: <span>${element.phone_name}</span></p>
            <p> Price: <span>200000</span></p>
            <button class="details-btn" type="submit"> Show Details</button>
        `;
        cardContainer.appendChild(div);
        
    });

}

document.getElementById('searchBtn').addEventListener('click', function (){
    // Get input search value from id
    const searchfield = document.getElementById('searchFied');
    const searchValue = searchfield.value;
    
    // Fetching data from the API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(res=> res.json())
    .then(data=> ShowPnones(data.data))
});


