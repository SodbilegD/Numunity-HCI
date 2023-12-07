document.addEventListener("onkeyup", () => {
    // Declare variables
    var input, filter, postsContainer, listArticles, a, i, txtValue;
    input = document.getElementById('searchId');
    filter = input.value.toUpperCase();
    postsContainer = document.getElementById("posts-container");
    listArticles = postsContainer.getElementsByTagName('article');
    console.log(listArticles);
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < listArticles.length; i++) {
      a = listArticles[i].getElementsByTagName("")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        listArticles[i].style.display = "";
      } else {
        listArticles[i].style.display = "none";
      }
  }
})