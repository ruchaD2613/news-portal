const cards = document.querySelector(".cards");
const categories = document.querySelector(".categories");
const categories_span = document.querySelectorAll(".categories span");

const baseURL = "https://newsdata.io/api/1/news?";
const apiKey = "apikey=pub_182137e02b1569b853d4e4ea28a73216dad81&";
const backUpImage = "Images/default.jpg";


async function dataRequest(url){
    try {
        const responce = await fetch(baseURL + apiKey + url);
        const json = responce.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.results.forEach(item => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${item.image_url ? item.image_url : backUpImage}" alt="Default News Image">
                                    </div>
                                    <div class="info">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${item.description}</p>
                                            <p class="time">
                                                <span>${item.pubDate.split(" ")[0]}</span>
                                                <span>${item.pubDate.split(" ")[1]}</span>
                                            </p>
                                        </div>
                                        <div class="other">
                                            <span class="source">${item.source_id}source_id</span>
                                            <a class="url" href="${item.link}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>`
        });
    })
}

categories.addEventListener("click", event => {
    if(event.target.tagName === 'SPAN'){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.url);
        categories_span.forEach(item => {
            item.classList.remove("active");
        });
        event.target.classList.add("active");
    }
})

urlRequest("country=us&language=en");