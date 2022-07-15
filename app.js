

console.log("hello");


const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey = ',&appid=2c0ef77996c8615e748bcbb141fd348f&units=metric'


let d = new Date();
let date=d.getMonth()+1+'.'+d.getDate()+'.'+d.getFullYear();

function userdata() {
    let user_response = document.getElementById("felling").value;
    let zip = document.getElementById("zip").value;

    getdatafromAPI(baseURL, zip, apiKey).then(function (data) {

        if (data.message == 'city not found') {
            alert( data.message)
        }

        postdata('http://127.0.0.1:8080/add', { date:date,temp: data.main.temp, user_response: user_response})
     
            .then(function () {
                updateui()
            })
    })
}

document.getElementById("submit").addEventListener("click",userdata)
const getdatafromAPI = async (baseURL, zip, apiKey) => {

    const res = await fetch(baseURL + zip + apiKey)

    try {
        const data = await res.json();
        console.log(data)
        return data
    }
    catch (error) {
        console.log("error", error)
    }
}

const postdata = async (url = 'http://127.0.0.1:8080/add', data = {}) => {
  
    const res = await fetch(url, {
        
        method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(data),
    });
   
    try {
        const newdata = await res.json();
        console.log(newdata)
        return newdata;


    }
    catch (error) {
        console.log("error", error)

    };
}



    const updateui = async () => {

        const req = await fetch('http://127.0.0.1:8080/all');

        try {
            const data = await  req.json();//data that reseived in json

            document.getElementById("temp").innerHTML = data.temp
            document.getElementById("content").innerHTML = data.user_response
            document.getElementById("date").innerHTML=data.date

        }
        catch (error) {
            console.log("error", error)

        }
    }

    