document.getElementById("post-button").onclick = createPost();
var el = document.getElementById("post-button");
if (el.addEventListener)
    el.addEventListener("click", createPost(), false);
else if (el.attachEvent)
    el.attachEvent('onclick', createPost());

function createPost(){
    var article = document.createElement("article");
    article.setAttribute("id", "myarticle");
    article.className = "posts";

    var p = document.createElement("p");
p.innerHTML = document.getElementById("posting-area").value;
    // test case, append the content
    document.body.appendChild(article);
    document.getElementById("myarticle").appendChild(p);

}