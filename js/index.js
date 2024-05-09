// fetch data
const phonsData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=samsung');
    const data = await (res.json());
    ShowPnones(data.data);
    console.log(data)
}

phonsData();

const ShowPnones = (phones) => {
    // show data on page
    // get card container where put the card
    phones.forEach(element => {
       
        const cardContainer = document.getElementById('cardContainer');
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

