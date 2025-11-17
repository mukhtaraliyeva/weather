const temperature = document.querySelector('.temperature-icon');
const minMaxTemp = document.querySelector('.min-max-temp');
const weatherDesc = document.querySelector('.weather-desc');
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-icon');
const headingText = document.querySelector('.heading-text');
const dateText = document.querySelector('.date-text');

let API = {
    key: '72bfd2445064100ce742140306370b9f',
    url: 'https://api.openweathermap.org/data/2.5/'
};

// Sana formatlovchi funksiya
function getFormattedDate() {
    const now = new Date();
    const kunlar = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
    const oylar = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

    return `${kunlar[now.getDay()]} / ${now.getDate()} ${oylar[now.getMonth()]} / ${now.getFullYear()}`;
}

// Qidiruv bosilganda
searchBtn.addEventListener('click', () => {
    let city = searchInput.value.trim();

    if (city) {
        fetch(`${API.url}weather?q=${city}&appid=${API.key}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === "404") {
                    headingText.textContent = "Shahar topilmadi!";
                    headingText.style.color = "red";
                    return;
                }
                

                headingText.style.color = "#eee";
                headingText.textContent = data.name;

                temperature.textContent = Math.floor(data.main.temp) + "°C";

                minMaxTemp.textContent =
                    `${Math.floor(data.main.temp_min)} Min°C / ${Math.floor(data.main.temp_max)} Max°C`;

                weatherDesc.textContent =
                    `${data.weather[0].main} (${data.weather[0].description})`;

                dateText.textContent = getFormattedDate();
            });

        searchInput.value = "";
    } else {
        headingText.textContent = "Please enter your city";
        headingText.style.color = "red";
    }
});
