let registerBtn = document.getElementById("registerBtn");
let loginBtn = document.getElementById("loginBtn");
let nicknameInput = document.getElementById("nicknameInput");
let passwordInput = document.getElementById("passwordInput");
let form = document.querySelector("#formLogin");
let blogPosts = document.getElementById("blogPosts");
let id = 0;

let data = JSON.stringify();
let register = new FormData();
register.append("Nickname", "Nickname");
register.append("Password", "Password");

let blogInputs = document.getElementById("blogInputs");
blogInputs.style.display = "none";

registerBtn.addEventListener("click", (e) => {
  //   e.preventDefault();

  const registerNewUser = (register) => {
    fetch(`https://testapi.io/api/lukenzas/resource/loginRegister`, {
      method: "POST",
      body: register,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  registerNewUser();
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`https://testapi.io/api/lukenzas/resource/loginRegister`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      let found = false;
      for (i = 0; i < result.data.length; i++) {
        if (
          result.data[i].Nickname === nicknameInput.value &&
          result.data[i].Password === passwordInput.value
        ) {
          found = true;
          console.log("veikia");
          form.style.display = "none";
          blogInputs.style.display = "flex";
          blogInputs.style.justifyContent = "center";

          localStorage.setItem("identification", nicknameInput.value);
          getData();
        }
      }

      const loggedUser = localStorage.getItem("identification");
      console.log(loggedUser);

      // submitNewBlogPost.getAll("author")
      // console.log(submitNewBlogPost.getAll("url"));
      const postData = (sendnewBlogPost) => {
        fetch(`https://testapi.io/api/lukenzas/resource/blogpostai`, {
          method: "POST",
          body: sendnewBlogPost,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.log(error));
      };
      let postNewBlog = document.getElementById("postNewBlog");
      let submitNewPost = document.getElementById("submitNewPost");
      postNewBlog.addEventListener("submit", (e) => {
        let submitNewBlogPost = new FormData(postNewBlog);
        submitNewBlogPost.append("author", loggedUser);
        // submitNewBlogPost.append("url", "url");
        // submitNewBlogPost.append("title", "title");
        // submitNewBlogPost.append("content", "content");
        e.preventDefault();

        postData(submitNewBlogPost);
        e.target.elements;
        console.log(e.target);
      });
    });
});
console.log(localStorage.getItem("identification"));

const getData = () => {
  fetch("https://testapi.io/api/lukenzas/resource/blogpostai", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      for (i = 0; i < result.data.length; i++) {
        let postId = document.createElement("p");
        let postTitle = document.createElement("h3");
        let postContent = document.createElement("p");
        let postUrl = document.createElement("img");
        let div = document.createElement("div");
        let divPicture = document.createElement("div");
        let divContent = document.createElement("div");

        let deleteBtn = document.createElement("button");
        let authorDiv = document.createElement("div");
        div.append(authorDiv);
        authorDiv.textContent = `Autorius: ${result.data[i].author}`;
        divPicture.style.width = "90%";

        postUrl.setAttribute("src", result.data[i].url);
        postUrl.style.height = "100px";
        postUrl.style.height = "100%";
        postUrl.style.width = "80%";

        blogPosts.append(div);
        div.setAttribute("id", result.data[i].id);
        // div.append(postId);
        div.append(divPicture);
        div.append(divContent);
        div.append(authorDiv);

        divPicture.append(postUrl);
        divContent.append(postTitle);
        divContent.append(postContent);
        // divContent.append(deleteBtn);

        if (result.data[i].author === localStorage.getItem("identification")) {
          divContent.append(deleteBtn);
        }

        divContent.style.width = "100%";
        divContent.style.display = "flex";
        divContent.style.flexWrap = "wrap";
        divContent.style.flexDirection = "column";

        deleteBtn.style.width = "20%";

        div.style.background = "#d5cbcb";
        div.style.maxHeight = "350px";
        div.style.minHeight = "250px";
        div.style.maxWidth = "650px";
        div.style.minWidth = "350px";
        div.style.marginLeft = "5px";
        div.style.border = "1px solid grey";
        div.style.display = "flex";

        blogPosts.style.display = "flex";
        blogPosts.style.flexWrap = "wrap";
        blogPosts.style.gap = "10px";
        blogPosts.style.marginTop = "20px";

        postId.textContent = result.data[i].id;
        postTitle.textContent = result.data[i].title;
        postContent.textContent = result.data[i].content;
        deleteBtn.textContent = "Delete";
        // console.log(result.data[i]);
        // result.data[i].author = localStorage.getItem("identification");
        deleteBtn.addEventListener("click", (e) => {
          let id = (e.target.id = div.id);
          console.log(id);
          const deleteData = () => {
            fetch(`https://testapi.io/api/lukenzas/resource/blogpostai/${id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
              })
              .catch((error) => console.log(error));
          };
          deleteData();
        });
      }
    });
};

// window.addEventListener("load", () => {
//   localStorage.clear();
// });
