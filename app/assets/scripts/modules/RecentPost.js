import RecentPostItem from './RecentPostItem.js';

export default class RecentPost {

    constructor(recentPostUrl, dateFilter) {
        this._recentPostList = [];
        this._recentPostUrl = recentPostUrl;
        this._lastUpdated = Date.now();
        this._hasChanged = false;
        this.dateFilter = dateFilter;
    }

    Upload() {
        if (this._hasChanged) {
            fetch(this._recentPostUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'versioning' : false
                    },
                    body: JSON.stringify(this._recentPostList)
                })
                .then(response => { console.log(response.status); })
                .catch(err => { console.log(err) });

            this._hasChanged = false;
        }
    }

    Download(targetElement) {
        fetch(`${this._recentPostUrl}/latest`)
        .then(result => {
                        result.json().then(jsob => {
                    //filter only new PostItem
                    const parsedDate = new Date();
                    parsedDate.setDate(parsedDate.getDate() - 1);
                    console.log(parsedDate);
                    const filteredArray = jsob.record.post.postList.filter(postItem => Date.parse(postItem.publishedDate) > Date.parse(parsedDate));
                   // const filteredArray = jsob.record.post.postList.filter(postItem => Date.parse(postItem.publishedDate) > this.dateFilter);
                    
                    //updating own js
                    if(filteredArray.length > 0){
                        //filteredArray.forEach(newPostItem => {this._recentPostItem.push((new RecentPostItem (newPostItem))) });
                        gebi(targetElement).innerHTML = "";
                        gebi(targetElement).insertAdjacentHTML("afterbegin",

                            filteredArray 
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
    }
}

const params = new URLSearchParams(document.location.search);
const dateFilter = params.get("date");

//shortcut to getElementById
const gebi = id => document.getElementById(id);

//Create RecentNews object, with url
const recentPost = new RecentPost("https://api.jsonbin.io/v3/b/6544865f0574da7622c15ac9", Date.parse(dateFilter));

const newButton = document.querySelector(".community__new-button");

newButton.addEventListener("click", (e) => {
    const params = new URLSearchParams(document.location.search);
    const dateFilter = params.get("date");

    const recentPost = new RecentPost("https://api.jsonbin.io/v3/b/6544865f0574da7622c15ac9", Date.parse(dateFilter) - 1 );
    console.log("readyyyyyyy");
    recentPost.Download("posts-container");
});

//Load content from RecentNewsURL
//recentPost.Download("posts-container");

//Download post in every 60 seconds into #posts-container
//setInterval(() => recentPost.Download("posts-container"), 16000);

//Upload updated post in every 15 seconds back to server
setInterval(() => recentPost.Upload(), 1);