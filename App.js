let clickedValue = null;
const btnIntraday = document.querySelector('#btn-intraday')

const btnDaily = document.querySelector('#btn-daily')
const btnWeekly = document.querySelector('#btn-weekly')
const btnMonthly = document.querySelector('#btn-monthly')
let symbol = document.getElementById('symbol-input').value
const watchlistName = document.getElementById('watchlist-name1')
const watchlistScore = document.getElementById('watchlist-score1')
const watchlistSelect = document.getElementById('watchlist-select1')
//console.log(watchlistSelect)
const holderDomElement = document.getElementById('container-single')
console.log(holderDomElement)
const containerWatchListDetails = document.getElementById('watchlist-details')
const btnCross = document.getElementById("btncross")
console.log(btnCross)



// btnCross.addEventListener('click', crossfunc)
// function crossfunc(){
//     containerWatchListDetails.style.display = 'none';

//   
// 
// }
// holderDomElement.addEventListener("click", (e) => {
//     if (e.target.classList.contains("btn-cross")) {
//         const targetedLi = e.target.parentNode.parentNode;
//         // targetedLi.remove();
//         targetedLi.innerText = '';
//         console.log("removeeee")
//     }
//     if (e.target.classList.contains("fa-xmark")) {
//         const targetedLi = e.target.parentNode.parentNode.parentNode;
//         // targetedLi.remove();
//         targetedLi.innerText = '';
//         console.log("removeeee")
//     }
//     if(e.target.classList.contains("watchlist-select")){
//         const targetedTable = e.target.parentNode.parentNode;
//         console.log("TABLEEEEEEE")
//         creatTable();
//     }


// });








const clickedFunc = (e) => {
    //console.log(e.target.innerText);
    if (e.target.innerText == btnIntraday.innerText) {
        clickedValue = e.target.innerText
        console.log(clickedValue);

    } else if (e.target.innerText == btnDaily.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else if (e.target.innerText == btnWeekly.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else if (e.target.innerText == btnMonthly.innerText) {
        clickedValue = e.target.innerText;
        console.log(clickedValue);
    } else {
        clickedValue = btnIntraday.innerText;
        console.log(clickedValue);
    }
    return clickedValue;
}

btnIntraday.addEventListener('click', clickedFunc)
btnDaily.addEventListener('click', clickedFunc)
btnWeekly.addEventListener('click', clickedFunc)
btnMonthly.addEventListener('click', clickedFunc)

console.log(clickedValue)

const convertToHTML = (htmlInStringFormat) => {
    const element = document.createElement("div");
    element.innerHTML = htmlInStringFormat;
    return element;
}


function createDomElement(responseLatestOpen, responseSymbol, clickedValue) {
    const domData = convertToHTML(`
<div id="watchlist-details" class="watchlist-details">
    <p id="watchlist-name1"  class="watchlist-name">${responseLatestOpen}</p>
    <p id="watchlist-score1" class="watchlist-score">${responseSymbol}</p>
    <button type="button" id="watchlist-select1" class="watchlist-select">${clickedValue}</button>
    <button id="btn-cross" class="btn-cross"><i class="fa-solid fa-xmark"></i></button>
    
</div>`
    )
    holderDomElement.appendChild(domData)
    // document.getElementById('watchlist-select1').addEventListener('click', getTableData);



}


//createDomElement()

// createDomElement()


// function showingWatchlistData(responseLatestOpen, responseSymbol) {

//     watchlistName.innerText = responseSymbol;
//     watchlistScore.innerText = responseLatestOpen;
//     watchlistSelect.innerText = clickedValue;



// // }

const getData = async () => {
    // let symbol = document.getElementById('symbol-input')
    // symbol = symbol.value
    // console.log(clickedValue)
    // console.log(symbol)
    let symbol = document.getElementById('symbol-input').value

    try {
        //  let symbol = document.getElementById('symbol-input').value
        if (clickedValue == "DAILY") {


            console.log(clickedValue)
            console.log(symbol)

            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValue}_ADJUSTED&symbol=${symbol}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();

            console.log(res)
            const response = Object.values(res['Meta Data'])
            const responseSymbol = response[1];

            const responseLatestOpen = Object.values(res['Time Series (Daily)'])[0]['1. open']
            console.log(responseLatestOpen)

            createDomElement(symbol, responseLatestOpen, clickedValue)

            // let responseValues = Object.values(res['Time Series (Daily)'])
            // let responseKeys = Object.keys(res['Time Series (Daily)'])
            // getTableData(res, responseValues, responseKeys)
            // showingWatchlistData(responseLatestOpen, responseSymbol)
        } else {

            console.log(clickedValue)
            console.log(symbol)
            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValue}&symbol=${symbol}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();
            const response = Object.values(res['Meta Data'])
            const responseSymbol = response[1];
            //  createDomElement(responseLatestOpen, symbol)
            if (clickedValue == "INTRADAY") {
                const responseLatestOpen = Object.values(res['Time Series (5min)'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(symbol, responseLatestOpen, clickedValue)
                // let responseValues = Object.values(res['Time Series (5min)'])
                // let responseKeys = Object.keys(res['Time Series (5min)'])
                // getTableData(res, responseValues, responseKeys)

                //   showingWatchlistData(responseLatestOpen, responseSymbol)

            }
            else if (clickedValue == "WEEKLY") {
                const responseLatestOpen = Object.values(res['Weekly Time Series'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(symbol, responseLatestOpen, clickedValue)
                // let responseValues = Object.values(res['Weekly Time Series'])
                // let responseKeys = Object.keys(res['Weekly Time Series'])
                // getTableData(res, responseValues, responseKeys)
                //  showingWatchlistData(responseLatestOpen, responseSymbol)  
            }
            else if (clickedValue == "MONTHLY") {
                const responseLatestOpen = Object.values(res['Monthly Time Series'])[0]['1. open']
                console.log(responseLatestOpen)
                createDomElement(symbol, responseLatestOpen, clickedValue)
                // let responseValues = Object.values(res['Monthly Time Series'])
                // let responseKeys = Object.keys(res['Monthly Time Series'])
                // getTableData(res, responseValues, responseKeys)
                //  showingWatchlistData(responseLatestOpen, responseSymbol)  
            }
        }
        clickedValue = "";
        symbol.innerText = ""
        console.log(holderDomElement)

    }
    catch (err) {
        console.log(err)
    }
//     console.log(document.querySelector('#watchlist-select1').innerText);
//    console.log(document.querySelector('#watchlist-name1').innerText)


};

document.getElementById('btn-search-symbol').addEventListener('click', getData);



// const clickedFuncForValue = (e) => {
//     //console.log(e.target.innerText);
//     if (e.target.innerText == btnIntraday.innerText) {
//         clickedValue = e.target.innerText
//         console.log(clickedValue);

   
//     }
//     return clickedValue;
// }





let table;
let responseValues;
let responseKeys;
//let clickedValueForTable;

holderDomElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-cross")) {
        const targetedLi = e.target.parentNode.parentNode;
        // targetedLi.remove();
        targetedLi.innerText = '';
        console.log("removeeee")
    }
    if (e.target.classList.contains("fa-xmark")) {
        const targetedLi = e.target.parentNode.parentNode.parentNode;
        // targetedLi.remove();
        targetedLi.innerText = '';
        console.log("removeeee")
    }
    if(e.target.classList.contains("watchlist-select")){
        // const targetedTable = e.target.parentNode.parentNode.querySelector('#watchlist-details').innerText;
        // table.innerText = targetedTable;
        console.log(e.target.innerText)
      let clickedValueForTable = e.target.innerText;
        getTableData(clickedValueForTable)
       // table.classList.toggle("create-table");
       // creatTable();
    }


});




async function getTableData(clickedValueForTable) {

  // let clickedValueForTable = document.querySelector('#watchlist-select1').innerText;
  
//  let clickedValueForTable = document.querySelector('#watchlist-select1');
   console.log(clickedValueForTable)
   
//    const clickedFuncForValue = () => {
//     //console.log(e.target.innerText);
//     if (clickedValueForTable.innerText == 'DAILY') {
//         clickedValueForTable = 'DAILY';
//         console.log(clickedValueForTable);

//     } else if (clickedValueForTable.innerText == 'INTRADAY') {
//         clickedValueForTable = 'INTRADAY';
//         console.log(clickedValueForTable);
//     } else if (clickedValueForTable.innerText == 'WEEKLY') {
//         clickedValueForTable = 'WEEKLY';
//         console.log(clickedValueForTable);
//     } else if (clickedValueForTable.innerText == 'MONTHLY') {
//         clickedValueForTable = 'MONTHLY';
//         console.log(clickedValueForTable);
//     } else {
//         clickedValueForTable = 'INTRADAY';
//         console.log(clickedValueForTable);
//     }
//     return clickedValueForTable;
// }
// clickedFuncForValue()

   
   let symbolForTable = document.querySelector('#watchlist-name1').innerText
   console.log(symbolForTable)
    try {
        //  let symbol = document.getElementById('symbol-input').value
        if (clickedValueForTable == "DAILY") {


            console.log(clickedValueForTable)
            console.log(symbolForTable)

            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValueForTable}_ADJUSTED&symbol=${symbolForTable}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();

            console.log(res)
           
           

             responseValues = Object.values(res['Time Series (Daily)'])
             responseKeys = Object.keys(res['Time Series (Daily)'])
           // getTableData(res, responseValues, responseKeys)
            // showingWatchlistData(responseLatestOpen, responseSymbol)
        } else {

            console.log(clickedValueForTable)
            console.log(symbolForTable)
            const getAPI = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${clickedValueForTable}&symbol=${symbolForTable}&interval=5min&apikey=P08NZN6MWQ9TE2IX`)
            const res = await getAPI.json();
            //  createDomElement(responseLatestOpen, symbol)
            if (clickedValueForTable == "INTRADAY") {
                 responseValues = Object.values(res['Time Series (5min)'])
                 responseKeys = Object.keys(res['Time Series (5min)'])
               // getTableData(res, responseValues, responseKeys)

                //   showingWatchlistData(responseLatestOpen, responseSymbol)

            }
            else if (clickedValueForTable == "WEEKLY") {
                 responseValues = Object.values(res['Weekly Time Series'])
                 responseKeys = Object.keys(res['Weekly Time Series'])
              //  getTableData(res, responseValues, responseKeys)
                //  showingWatchlistData(responseLatestOpen, responseSymbol)  
            }
            else if (clickedValueForTable == "MONTHLY") {
                 responseValues = Object.values(res['Monthly Time Series'])
                 responseKeys = Object.keys(res['Monthly Time Series'])
             //   getTableData(res, responseValues, responseKeys)
                //  showingWatchlistData(responseLatestOpen, responseSymbol)  
            }
        }
        console.log(responseValues)
               
        console.log(holderDomElement)

    }
    catch (err) {
        console.log(err)
    }




    // let api = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=P08NZN6MWQ9TE2IX'
    // let getApi = await fetch(api);
    // let res = await getApi.json();

    // let responseValues = Object.values(res['Time Series (5min)'])
    // let responseKeys = Object.keys(res['Time Series (5min)'])
    let ccc = responseValues[0];

   // let gettingClickValue = 

   // document.getElementById('watchlist-select1').addEventListener('click', creatTable)

   
    


    function creatTable() {
        // Assume that the API data is stored in an object called "data"
console.log(clickedValueForTable)
        // Create an HTML table element
         table = document.createElement("table");
        table.classList.add('create-table')


        for (let i = 0; i < responseValues.length; i++) {
            console.log(responseValues[i])

            let row = table.insertRow();
            let cell = row.insertCell();

            if (i === 0) {
                if (clickedValueForTable === 'INTRADAY') {
                    cell.innerHTML = responseKeys[i].split(" ")[0];
                }

                for (let keys in ccc) {
                    let cell = row.insertCell();
                    let spread = keys.split(' ');
                    cell.innerHTML = spread[1];
                    console.log(spread[1])

                }
                //Data for open, high, low , close, Volume

            }

            else {
                if (clickedValueForTable === 'INTRADAY') {
                    cell.innerHTML = responseKeys[i - 1].split(" ")[1]; // Data for time
                }
                for (let key in responseValues[i - 1]) {
                    let cell = row.insertCell();

                    cell.innerHTML = responseValues[i - 1][key];
                    cell.style.padding = "2px";

                }
                //Values of Data of open, high, low , close, Volume
            }

        }


        // Append the table to an existing element on the page (e.g., a div)
        document.getElementById("watchlist-details").appendChild(table);

    }
 
     creatTable();

   
    

}










//document.getElementById('watchlist-select1').addEventListener('click', creatTable)

//getTableData()
