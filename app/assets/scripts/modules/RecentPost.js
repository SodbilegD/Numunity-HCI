class RecentPostItem {
    //constructor

    constructor(post) {
        this.id = post.id;
        this.profileName = post.profileName;
        this.profimg = post.profimg;
        this.timeAgo = post.timeAgo;
        this.title = post.title;
        this.detail = post.detail;
        this.community = post.community;
        this.publishedDate = post.publishedDate;
    }

    Render() {
        return `<article class="${postClass}" id="recentPost_${this.id}">
        <div class="post__profile" id="posts-container">
            <img src="${this.profimg}" alt="profile" class="post__profile__img">
            <p class="post__profile__name">${this.profileName}</p>
            <p class="post__profile__time">${isNew ? 'New post' : this.timeAgo}</p>
        </div>
        <hr>
        <h3 class="post__title">${this.title}</h3>
        <p class="post__detail">${this.detail}</p>
        <div class="post__reactions">
            <p class="post__reactions__list">
                <i class="fa-regular fa-face-smile-beam post__reactions__icon"></i>
                <span class="reaction-count">${this.likeCount}</span> <button class="reaction-button ">Agree</button>
            </p>
            <p class="post__reactions__list">
                <i class="fa-regular fa-face-frown post__reactions__icon"></i>
                <span class="reaction-count">0</span> <button class="reaction-button ">Disagree</button>
            </p>
            <p class="post__reactions__list">
                <i class="fa-regular fa-comment post__reactions__icon"></i>
                <span class="reaction-count">0</span> Comment
            </p>
            <p class="post__reactions__list">
                <i class="fa-regular fa-share-from-square post__reactions__icon"></i>
                <span class="reaction-count">0</span> Share
            </p>
        </div>
    </article>`;
    }
    
    Bind(eventType, element, property) {
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property] = event.target.innerHTML;
            this._hasChanged = true;
            console.log(`event: ${event} this: ${JSON.stringify(this)}`);
        });
        return this;
    }
    
}

function initialize() {
    const params = new URLSearchParams(document.location.search);
    const dateFilter = params.get("date");
    
    //shortcut to getElementById
    const gebi = id => document.getElementById(id);
    
    //Create RecentNews object, with url
    const recentPost = new RecentPost("https://api.jsonbin.io/v3/b/6544865f0574da7622c15ac9", Date.parse(dateFilter));
    
    //Load content from RecentNewsURL
    recentPost.Download("posts-container");
    
    //Download post in every 60 seconds into #posts-container
    setInterval(() => recentPost.Download("posts-container"), 60000);
    
    //Upload updated post in every 15 seconds back to server
    setInterval(() => recentPost.Upload(), 15000);
        }

class RecentPost {

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
                if (Array.isArray(jsob.record)) {
                    // Filter only new PostItem
                    const filteredArray = jsob.record.filter(postItem => Date.parse(postItem.publishedDate) > this.dateFilter);
    
                    // Updating own js
                    if (filteredArray.length > 0) {
                        gebi(targetElement).insertAdjacentHTML("afterbegin",
                            filteredArray
                                .map(newPost => {
                                    const _newPost = new RecentPostItem(newPost);
                                    this._recentPostList.push(_newPost);
                                    return _newPost.Render();
                                })
                                .reduce((prevVal, curVal) => prevVal + curVal, "")
                        );
    
                        this._recentPostList.forEach(postItem => postItem.Bind("input", "recentpost_title", "title"));
                    }
                } else {
                    console.log("jsob.record is not an array.");
                }
            })
        })
        .catch(err => { console.log(err)});
    }

}
    initialize();
    export default RecentPost;