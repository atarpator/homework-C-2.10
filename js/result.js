const cats = document.querySelector("#cats")
const dogs = document.querySelector("#dogs")
const parr = document.querySelector("#parr")


const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})

// Объект-ссылка
const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats')
// Объект-событие
const ES = new EventSource(url, header)
// Ошибка сервера
ES.onerror = error => {
    ES.readyState ? $('.container').html("<h2>Server Error</h2>") : null;
}

// Получаем данные с сервера
ES.onmessage = message => {
    voteData = JSON.parse(message.data)
    procDogs = (voteData.dogs * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
    procCats = (voteData.cats * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
    procParr = (voteData.parrots * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();

    cats.style.cssText = `width: ${procCats}%`;
    cats.textContent = procCats + "%" + "\u00A0" + "\u00A0" + "/" + "\u00A0" + "\u00A0" + voteData.cats;

    dogs.style.cssText = `width: ${procDogs}%`;
    dogs.textContent = procDogs + "%" + "\u00A0" + "\u00A0" + "/" + "\u00A0" + "\u00A0" + voteData.dogs;

    parr.style.cssText = `width: ${procParr}%`;
    parr.textContent = procParr + "%" + "\u00A0" + "\u00A0" + "/" + "\u00A0" + "\u00A0" + voteData.parrots;
}
