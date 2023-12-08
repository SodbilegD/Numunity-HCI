import { fetchData } from './dataFetcher.js';

const jsondata = await fetchData();
const currentUrl = new URL(window.location.href);
const communityId = currentUrl.searchParams.get('communityId');
const community = jsondata.record.community[communityId-1];
const posts = jsondata.record.community[communityId-1].posts;


// Filter the data based on the category and date parameters
let filteredData = data;
if (category) {
  filteredData = filteredData.filter(item => item.category === category);
}
if (date) {
  filteredData = filteredData.filter(item => item.date === date);
}

// Use the filtered data to render your posts or products
renderPosts(filteredData);

// uunuu
// const apiUrl = "https://api.jsonbin.io/v3/b/654f4bb354105e766fce7c86"

// amirda
//const apiUrl = "https://api.jsonbin.io/v3/b/655d6c2b0574da7622ca003f" 

// haliunaa
const apiUrl = "https://api.jsonbin.io/v3/b/655d82ba54105e766fd367c6"


class Anime {
  constructor(animeListItem) {
    this.name = animeListItem.name;
    this.releasedDate = animeListItem.releasedDate;
    this.totalEpisode = animeListItem.totalEpisode;
    this.animeImg = animeListItem.animeImg;
    this.malRank = animeListItem.malRank;
    this.category = animeListItem.category;
    this.id = animeListItem.id;
  }

  getCatogeries = function () {
    let categoryList = "";
    for (let i = 0; i < this.category.length; i++) {
      if (i !== this.category.length - 1) {
        categoryList += `${this.category[i]}, `;
      } else {
        categoryList += `${this.category[i]}`;
      }
    }
    return categoryList;
  };

  render = function () {
    return `
          <li>
          <div class="anime-card">
            <div class="anime-card-inner anime-card-front">
              <img src="${this.animeImg}" alt="Recommended anime" />
            </div>
            <div class="anime-card-inner anime-card-back">
              <div class="anime-card-back-content">
                <p><strong>Нэр: </strong>${this.name}</p>
                <p><strong>Гарсан он: </strong>${this.releasedDate}</p>
                <p><strong>Ангийн тоо: </strong>${this.totalEpisode}</p>
                <p><strong>Төрөл: <br></strong>${this.getCatogeries()}</p>
              </div>
              <button class="anime-card-button" onclick= "moveToAnimeDetailPage('${this.id}')" >Дэлгэрэнгүй</button>
            </div>
          </div>
        </li>
          `;
  };
}


let listDate =  document.getElementById("categoryList").getElementsByTagName('li');
for(let list of listCatogeries) {
  list.addEventListener("click" , (event) => {
    let categoryType = event.target.textContent
    const nowUrl = new URL(window.location.href);
    let newUrl = nowUrl.origin; 
    newUrl += `${nowUrl.pathname}?category=${categoryType}`;
    window.location.href = newUrl;
  })
}

document.getElementById("animeSelection").addEventListener("change" , (event) => {
  const categoryType = event.target.value;
  const nowUrl = new URL(window.location.href);
  let newUrl = nowUrl.origin; 
  newUrl += `${nowUrl.pathname}?category=${categoryType}`;
  window.location.href = newUrl;
})

// Upload() {
//   if (this._hasChanged) {
//       fetch(this._recentPostUrl,
//           {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json;charset=utf-8',
//                   'versioning' : false
//               },
//               body: JSON.stringify(this._recentPostList)
//           })
//           .then(response => { console.log(response.status); })
//           .catch(err => { console.log(err) });

//       this._hasChanged = false;
//   }
// };

Download(targetElement) {
  fetch(`${this._recentPostUrl}/latest`)
  .then(result => {
                  result.json().then(jsob => {
              //filter only new PostItem
              const params = new URLSearchParams(document.location.search);
                  const dateFilter = params.get("date");
                  const parsedDate = new Date();
                  parsedDate.setDate(parsedDate.getDate() - 1);
                  console.log(parsedDate);
                  const filteredPost = jsob.record.community[0].posts.filter(postItem => Date.parse(postItem.publishedDate) > Date.parse(parsedDate));
                  if(filteredPost.length > 0){
                      //filteredPost.forEach(newPostItem => {this._recentPostItem.push((new RecentPostItem (newPostItem))) });
                      gebi(targetElement).innerHTML = "";
                      gebi(targetElement).insertAdjacentHTML("afterbegin",

                          filteredPost 
                              .map(newPost => {
                                  const _newPost = new RecentPostItem(newPost);
                                  this._recentPostList.push(_newPost);
                                  return _newPost.Render();
                              })
                              .reduce((prevVal, curVal) => prevVal + curVal, "")
                      );
                            }
              // const mappedArray=filteredArray.map(newPost => (new RecentPostItem(newPost)).Render());
              // gebi("main").insertAdjacentHTML("afterbegin", mappedArray.reduce((prevVal, curVal) => prevVal + curVal, ""));
          })
  })
  .catch(err => { console.log(err)});
};

const newButton = document.getElementById("newButton");
newButton.addEventListener("click" , );

// enuuger anime iin delgerengu page iihe dataga url aar damjulad avn deer render dree onclick der ni zaagd ugcin
moveToAnimeDetailPage = function(id) {
  let nowUrl = new URL(window.location.href);
  let newUrl = nowUrl.origin;
  newUrl += nowUrl.pathname;
  let lastUrl = newUrl.replace("filter.html", "animeDetails.html");
  lastUrl += `?id=${id}`
  window.location.href = lastUrl;
}
const gebi = id => document.getElementById(id);
