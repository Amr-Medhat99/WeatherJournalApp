/* Global Variables */
//key that website take me to access api
const apiKey='&APPID=3d3e3135411dedd712824adca7555871';
//base url of website
//add unit to url to covert unit to Celcius
const baseURL='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Create a new date instance dynamically with JS
let d = new Date;
//i'm add +1 behaind the d.getMonth because the object start from 0 ex: january=0,february=1,march=2
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
//add event listener click when i clid of button that has it (generate)
document.getElementById('generate').addEventListener('click',callBack);
function callBack(){
    //select date from specific element from dom which user enter zip code here 
    let zipCode=document.getElementById('zip').value;
    //collect all part of URL
    let mainURL=baseURL+zipCode+apiKey;
    //select date from specific element from dom which user enter what he is feel in this weather here 
    let feel=document.getElementById('feelings').value;
    //call chain promise function that include chain promise methods
    chainPromises(mainURL,feel);
}
//chain Promise function
function chainPromises(mainURL,feel){
    //call function which include get request that det data from api with argument full URL
    getData(mainURL)
    //then method that execute function after the pervious function is finshed
    .then(function(data){
        //call function that include post request with two argument:first=name of route in server side,second:object that include data which will stode in endpoint object 
        postData('/addElement',{temp:data.main.temp,date:newDate,content:feel});
    })
    //then method that execute function after the pervious function is finshed
    .then(function(){
        //call function that include get request that get data from endpoint object to update UI after post request finished that's have 1 argument the name of route 
        updateUI('/returnAll');
    })
}
//get request to return all data 
const getData=async (fullURL)=>{
    //using fetch to get data from api and store response in variable response 
    const response=await fetch(fullURL);
    //handle any error
    try{
        //tranform into to json
        const data=await response.json();
        return data;
    }catch(error){
        console.log('Error: ',error);
    }
}

//Post Data
const postData=async(url='',data={})=>{
    //using fetch to post data to endpoint with 2 arguments ,fisrt:url of name route ,second:object has some properties of how post request will send and transform data that will sent to string 
    const response=await fetch(url,{
        method:'post',
        credentials:"same-origin",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data) //tranform into to string
    });
    //handle Errors 
    try{
        //tranform into to json
        const res=await response.json();
        return res;
    }catch(error){
        console.log('Error: ',error)
    }
}

//update UI
const updateUI=async(url)=>{
    //using fetch to get data from endpoint with 1 arguments ,fisrt:url of name route 
    const response=await fetch(url);
    //handle any errors
    try{
        //tranform into to json
        const res=await response.json();
        //Update DOM
        document.getElementById('date').innerHTML=`Date: ${res.date}`;
        document.getElementById('temp').innerHTML=`Temperature: ${Math.round(res.temperature)}`;
        document.getElementById('content').innerHTML=`User Feeling: ${res.userResponse}`;
    }catch(error){
        console.log('Error: ',error);
    }
}