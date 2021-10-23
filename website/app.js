/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=db0cf27e5d39120dcb2c3079ea59c057&units=metric';


//const daTe = document.getElementById('date').value;
const Temperature = document.getElementById('temp');
//const Content = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate() +'.'+ d.getFullYear();



document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const newFeeling = document.getElementById('feelings').value;
    const city = ''
    
    
    let info = {
        zip: newZip,
        //content: Content,
        date: newDate,
        feeling: newFeeling,
        temp: Temperature,
        city: city
    }

    //let data = getWeather(baseURL,newZip, apiKey)
    //console.log (data)
    getWeather(baseURL,newZip, apiKey).then(function (wData) {

        
        
        info.temp = wData.list[0].main.temp
        info.city = wData.city.name
        console.log(info.temp)
        console.log(info)
        
        postData("/addweather",info)

    })
    
    setTimeout(function(){
      console.log(document.getElementById('zip1').innerHTML)
    if(document.getElementById('zip1').innerHTML == "InValid Zipcode !! --&gt; Enter another ZipCode")
    console.log('emptyUI')
    else
     updateUI(); 
    }, 2000);
    
    
    }

    const getWeather = async (baseURL, zip , key)=>{
    
      const res = await fetch(baseURL+zip+key)
      try {
        const data = await res.json();
        if (data.cod != 200)
        { document.getElementById('zip1').innerHTML = "InValid Zipcode !! --> Enter another ZipCode"
        emptyUI ()
        console.log("wrong Zipcode")  }
        else {
          document.getElementById('zip1').innerHTML = ""
        console.log(data)
        return data; }
      }  catch(error) {
        console.log("error", error);
        
      }
    }






// Async POST
const postData = async ( url, data ) =>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
    try {
      const newData = await response.json();
      
      return newData;

    } catch(error) {
    console.log("error", error);
    }
};



// TODO-Chain your async functions to post an animal then GET the resulting data

/* document.getElementById('generate').addEventListener('click', performAction);



// TODO-Call the chained function



// -----------------------------------------------------------------------------------------------

/* WEB API WITH FETCH DEMO--  */

// const newZip =  document.getElementById('zip').value;





const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('titlee').innerHTML = allData.city + " City";
    document.getElementById('date').innerHTML = "Date: "+ allData.date;
    document.getElementById('temp').innerHTML = "Tempreature: " + allData.temp + " C° (Celsius)";
    document.getElementById('content').innerHTML = "You feel --> " + allData.feeling;


  }catch(error){
    console.log("error", error);
  }
}

function emptyUI () {
  document.getElementById('titlee').innerHTML = "Most Recent Entry";
    document.getElementById('date').innerHTML = "";
    document.getElementById('temp').innerHTML = "" ;
    document.getElementById('content').innerHTML = "" ;
} 