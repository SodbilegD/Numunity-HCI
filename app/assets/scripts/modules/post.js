document.addEventListener("DOMContentLoaded", function () {
    // Simulated JSON data
    const data = {
        "post": [
            {
              "post__profile__name": "user1",
              "post__detail": "This is a sample post.",
              "timestamp": "2023-11-01 10:00:00"
            },
            {
              "post__profile__name": "user2",
              "post__detail": "Another post on the platform.",
              "timestamp": "2023-11-01 10:30:00"
            }
        ]
    };
  
    const postsContainer = document.getElementById("post__detail");
  
    // json datag html element dr gargah loop
    data.post.forEach((post) => {
      const postElement = document.createElement("p");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h3>${post.post__profile__name}</h3>
        <p>${post.post__detail}</p>
        <p>${post.timestamp}</p>
      `;

    });
  });
  