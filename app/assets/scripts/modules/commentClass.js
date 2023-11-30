export default class Comment {
    //constructor

    constructor(commentData) {
        this.id = commentData.id;
        this.body = commentData.body;
        this.username = commentData.user.username;
        this.profileImage = commentData.user.profileImage;
        this.publishedDate = commentData.publishedDate;
    }

    Render() {
        return `<div class="single-comment" id="single-comment_${this.id}">
                    <div class="single-comment__profile">
                        <img src="${this.profileImage}" alt="profile" class="single-comment__profile__img">
                        <p class="single-comment__profile__name">${this.username}</p>
                    </div>
                    <p class="single-comment__detail">${this.body}</p>

                    <div class="single-comment__reactions">                            
                        <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-up"></i>Agree</p>
                        <p class="single-comment__reactions__list"><i class="fa-solid fa-arrow-down"></i></p>                                
                        <p class="single-comment__reactions__list"><i class="fa-solid fa-reply"></i>Reply</p>
                    </div>
                </div>` 
    }
}