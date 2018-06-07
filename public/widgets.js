// an enum for the views
const VIEWS = {
  MAIN: 1,
  OWN: 2
};

// state of the app
let state = {
  isLogged: false,
  view: VIEWS.MAIN
};

// constructor for boilerplate, every field is always defined even if empty (null)
const Boilerplate = function(
  title,
  description,
  lang,
  content,
  upvotes,
  downvotes,
  tags,
  author
) {
  this.title = title ? title : null;
  this.description = description ? description : null;
  this.lang = lang ? lang : null;
  this.content = content ? content : null;
  this.upvotes = upvotes ? upvotes : null;
  this.downvotes = downvotes ? downvotes : null;
  this.tags = tags ? tags : null;
  this.author = author ? author : null;
};

const Tag = function(title, color) {
  this.title = title ? title : null;
  this.color = color ? color : null;
};

// function that returns a Boilerplate card as a Jquery object
const createBoilerplateCard = boilerplate => {
  return $(`<div class="card">
  <div class="top">
    <h1 class="title">${boilerplate.title}</h1>
    <p class="tag">${boilerplate.tags}</p>
  </div>
  <p class="author">${boilerplate.author}</p>
  <p class="desc">${boilerplate.description}</p>
  <p class="lang">${boilerplate.lang}</p>
  <textarea class="content">
${boilerplate.content}
</textarea>
<div class="buttons">
  <button class="js-copy-button">Copy</button>
  <button class="js-edit-button">Edit</button>
  <button class="js-delete-button">Delete</button>
</div>
</div>`);
};

// function that displays an array of boilerplates in the UI
const displayAllBoilerplates = boilerplates => {
  $("main").empty();
  for (bp of boilerplates) {
    let bpUiFormatted = new Boilerplate(
      bp.title,
      bp.description,
      bp.lang,
      bp.content,
      bp.upvotes,
      bp.downvotes,
      bp.tags,
      bp.User.displayName
    );
    $("main").append(createBoilerplateCard(bpUiFormatted));
  }
};

const appendNewBoilerplate = boilerplate => {
  boilerplate.author = boilerplate.User.displayName;
  boilerplate.tags = "A Tag";
  $("main").append(createBoilerplateCard(boilerplate));
};

const displayUserInfo = user => {
  if (user) {
    $(".login")
      .empty()
      .append(`<h2 class="logged">Logged in as ${user.displayName}</h2>`);
  } else {
    console.log("no user is connected");
  }
};

$(document).ready(function() {
  $(".animate").addClass("move");

  // get user info
  getUser(displayUserInfo);

  // call the AJAX function and pass the display action as a callback
  getAllBoilerplates(displayAllBoilerplates);

  // AJAX goes here: get 20 posts
  // getAllPosts();

  // set tag colors based on content
  // • backend = blue
  // • frontend = red
  $("div.card p.tag").each(function(index) {
    if (
      $(this)
        .text()
        .trim() == "backend"
    ) {
      $(this).css("background", "blue");
    } else if (
      $(this)
        .text()
        .trim() == "frontend"
    ) {
      $(this).css("background", "red");
    } else {
      $(this).css("background", "grey");
    }
  });
  //$('.modal').modal('hide');

  $(".add-card").click(function() {
    console.log(" is clicked");
    modal.style.display = "block";
  });

  $(".close").click(function() {
    modal.style.display = "none";
  });

  $(".add-tag").click(function() {
    tagModal.style.display = "block";
  });

  $(".closeTag").click(function() {
    tagModal.style.display = "none";
  });

  // new Boilerplate creation
  $(document).on("click", ".post-boilerplate", function(event) {
    event.preventDefault();
    // hides the modal
    modal.style.display = "none";

    // get the values from the fields
    const title = $("#title").val();
    const description = $("#description").val();
    const lang = $("#lang").val();
    const content = $("#content").val();

    // create a Boilerplate
    const boilerplateToPost = new Boilerplate(
      title,
      description,
      lang,
      content,
      null,
      null,
      null,
      null
    );

    //call the ajax function
    postBoilerplate(boilerplateToPost, appendNewBoilerplate);
  });

  //new Tag action
  $(document).on("click", ".post-tag", function(event) {
    event.preventDefault();

    //hide the modal
    tagModal.style.display = "none";

    //get the values from the fields
    const title = $("#tag-title").val();
    const color = $("#color").val();

    // create a Tag
    const tagToPost = new Tag(title, color);

    postTag(tagToPost, data => {
      console.log(data);
    });
  });
});
let modal = document.getElementById("bpModal");
let tagModal = document.getElementById("tagModal");
// make cards active when selected
$(document).on("click", "div.card", function() {
  if (!$(this).hasClass("active")) {
    $(this).toggleClass("active");
    $(this)
      .siblings("div.card")
      .removeClass("active");
  }
});

// when typing in filter box, every 500ms, update posts
let filterResults = function() {
  let query = $(".js-filter").val();
  if (query !== "") {
    searchBoilerplates(query, displayAllBoilerplates);
  } else {
    getAllBoilerplates(displayAllBoilerplates);
  }
  // AJAX: get posts using above string as query
};
$(".js-filter").keyup(_.debounce(filterResults, 500));

//
$(".js-copy-button").click(function() {
  var copyText = $(this).siblings("textarea.content");
  copyText.focus();
  copyText.select();
  document.execCommand("copy");
});
