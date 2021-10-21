const cityName = document.getElementById("cityName");
const submitbtn = document.getElementById("submitbtn");
const city_name = document.getElementById("city_name");
const temp_real_value = document.getElementById("temp_real_value");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector('.middle_layer');
const tem_min = document.getElementById('tem_min');
const temp_max = document.getElementById('temp_max');
const feels_like = document.getElementById('feels_like');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const sea_level = document.getElementById('sea_level');
const grnd_level = document.getElementById('grnd_level');
const lon = document.getElementById('lon');
const lat = document.getElementById('lat');
const speed = document.getElementById('speed');
const deg = document.getElementById('deg');
const gust = document.getElementById('gust');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');7
// const readMoreDiv= document.getElementById("readMoreDiv");

const getInfo = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;

    if (cityval === "") {
        city_name.innerText = `Plz write the name before search`;
        data_hide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=5fbdc068eeea96dcc8622b2747c89e20`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}  , ${arrData[0].sys.country}`;
            temp_real_value.innerText = arrData[0].main.temp;
            tem_min.innerHTML = `Min Temp :   ${arrData[0].main.temp_min} `
            temp_max.innerHTML = `Max Temp :   ${arrData[0].main.temp_max} `
            feels_like.innerHTML = `Feels Like :   ${arrData[0].main.feels_like} `
            pressure.innerHTML = `Pressure :   ${arrData[0].main.pressure} `
            humidity.innerHTML = `Humidity :  ${arrData[0].main.humidity} `
            sea_level.innerHTML = `Sea Level :   ${arrData[0].main.sea_level} `
            grnd_level.innerHTML = `Ground Level :   ${arrData[0].main.grnd_level} `
            lon.innerHTML = `Longitute :   ${arrData[0].coord.lon} `
            lat.innerHTML = `Latitute :   ${arrData[0].coord.lat} `
            speed.innerHTML = `Wind Speed :   ${arrData[0].wind.speed} `
            deg.innerHTML = `Wind Direction :   ${arrData[0].wind.deg} `
            gust.innerHTML = `Wind Gust :   ${arrData[0].wind.gust} `

            function timeConverter(UNIX_timestamp) {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();


                let periods = "AM";

                if (hour > 11) {
                    periods = "PM";
                    if (hour > 12) hour -= 12;
                }
                if (min < 10) {
                    min = "0" + min;
                }

                var time = date + ' ' + month + ' ' + year + '    ' + hour + ':' + min + ':' + sec + ' ' + periods;
                return time;
            }
            // console.log(timeConverter(1633740998));


            let orgsunrise = timeConverter(`${arrData[0].sys.sunrise}`)
            sunrise.innerHTML = `Sunrise :   ${orgsunrise} `

            let orgsunset = timeConverter(`${arrData[0].sys.sunset}`)
            sunset.innerHTML = `Sunset :   ${orgsunset} `;



            // *******************
            // condition to check sunny or cloudy
            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else if (tempMood == "Haze") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun-haze' style='color: blue;'></i>";

            }

            else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }

            data_hide.classList.remove('data_hide');

            // console.log(data);
            // console.log("hello status")
            // console.log(temp_status);
            // console.log("hello temp")
            // console.log(temp_real_value)
            // console.log("hello city")
            // console.log(cityName)


        } catch {
            city_name.innerText = "Plz enter the name city name properly";
            // readMoreDiv.innerText="";
            data_hide.classList.add('data_hide');
        

        }
    }
};
submitbtn.addEventListener('click', getInfo);

