var burgerMenu = document.getElementById("burger-menu");
var overlay = document.getElementById("menu");
burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});
let blogFeedPosts = document.getElementById("blogFeedPosts");
window.addEventListener("load", (e) => {
  getData();
});

const getData = () => {
  fetch("https://testapi.io/api/lukenzas/resource/blogpostai", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      let blogFeedPosts = document.getElementById("blogFeedPosts");
      for (i = 0; i < 6; i++) {
        let postTitle = document.createElement("h3");
        let postContent = document.createElement("p");
        let postUrl = document.createElement("img");
        let div = document.createElement("div");
        let divPicture = document.createElement("div");
        let divContent = document.createElement("div");

        divPicture.style.width = "100%";
        divPicture.style.height = "50%";

        postUrl.setAttribute("src", result.data[i].url);
        postUrl.style.maxHeight = "200px";
        postUrl.style.height = "100%";
        postUrl.style.width = "100%";
        postUrl.style.objectFit = "cover";

        blogFeedPosts.append(div);

        div.setAttribute("id", result.data[i].id);
        // div.append(postId);
        div.append(divPicture);
        div.append(divContent);

        divPicture.append(postUrl);
        divContent.append(postTitle);
        divContent.append(postContent);
        let authorDiv = document.createElement("div");
        div.append(authorDiv);
        authorDiv.textContent = `Autorius: ${result.data[i].author}`;
        divContent.style.width = "90%";
        divContent.style.display = "flex";
        divContent.style.flexWrap = "wrap";
        divContent.style.flexDirection = "column";
        divContent.style.margin = "auto";

        div.style.background = "#d5cbcb";
        div.style.maxHeight = "650px";
        div.style.minHeight = "250px";
        div.style.minWidth = "250px";
        div.style.maxWidth = "30%";
        div.style.marginLeft = "5px";
        div.style.border = "1px solid grey";
        div.style.display = "block";

        postTitle.style.fontSize = "2vh";
        postContent.style.fontSize = "1.3vh";
        postContent.style.marginTop = "10px";

        blogFeedPosts.style.display = "flex";
        blogFeedPosts.style.flexWrap = "wrap";
        blogFeedPosts.style.gap = "10px";
        blogFeedPosts.style.marginTop = "20px";
        blogFeedPosts.style.flexDirection = "column";
        blogFeedPosts.style.alignContent = "center";
        blogFeedPosts.style.justifyContent = "center";

        postTitle.textContent = result.data[i].title;
        postContent.textContent = result.data[i].content;
      }
    });
};
