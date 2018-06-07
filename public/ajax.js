const getAllBoilerplates = function(cb) {
  $.get("./api/boilerplates/", function(data) {
    // returns an array containing all Boilerplates
    cb(data);
  });
};

const searchBoilerplates = function(query, cb) {
  $.ajax({
    url: "./api/search",
    type: "POST",
    data: {
      searchQuery: query
    },
    success: function(result) {
      cb(result);
    }
  });
};

const postBoilerplate = function(boilerplate, cb) {
  $.post(
    "./api/boilerplates",
    {
      title: boilerplate.title,
      description: boilerplate.description,
      lang: boilerplate.lang,
      content: boilerplate.content,
      tags: boilerplate.tags
    },
    function(result) {
      cb(result);
    }
  );
};

const putBoilerplate = function(boilerplate, cb) {
  const apiUrl = "./api/boilerplates/" + boilerplate.id;
  $.ajax({
    url: apiUrl,
    type: "PUT",
    data: {
      title: boilerplate.title,
      description: boilerplate.description,
      lang: boilerplate.lang,
      content: boilerplate.content,
      tags: boilerplates.tags
    },
    success: function(result) {
      cb(result);
    }
  });
};

const putUpVote = function(boilerplate, cb) {
  const apiUrl = `/api/boilerplates/${
    boilerplate.id
  }/upvotes/${boilerplate.upvotes + 1}`;
  $.ajax({
    url: apiUrl,
    type: "PUT",
    success: function(result) {
      cb(result);
    }
  });
};

const putDownVote = function(boilerplate, cb) {
  const apiUrl = `/api/boilerplates/${
    boilerplate.id
  }/downvotes/${boilerplate.downvotes + 1}`;
  $.ajax({
    url: apiUrl,
    type: "PUT",
    success: function(result) {
      cb(result);
    }
  });
};

const deleteBoilerplate = function(boilerplate, cb) {
  const apiUrl = `/api/boilerplates/${boilerplate.id}`;
  $.ajax({
    url: apiUrl,
    type: "DELETE",
    success: function(result) {
      cb(result);
    }
  });
};

const getAllTags = function(cb) {
  $.get("./api/tags", function(data) {
    // returns an array containing all tags
    cb(data);
  });
};

const postTag = function(tag, cb) {
  $.post(
    "./api/tags",
    {
      title: tag.title,
      color: tag.color
    },
    function(result) {
      cb(result);
    }
  );
};

const putTag = function(tag, cb) {
  const apiUrl = "./api/tags" + tag.id;
  $.ajax({
    url: apiUrl,
    type: "PUT",
    data: {
      title: tag.title,
      color: tag.color
    },
    success: function(result) {
      cb(result);
    }
  });
};

const deleteTag = function(tag, cb) {
  const apiUrl = `/api/tags/${tag.id}`;
  $.ajax({
    url: apiUrl,
    type: "DELETE",
    success: function(result) {
      cb(result);
    }
  });
};

const getUser = function(cb) {
  $.get("/api/users/me", function(data) {
    cb(data);
  });
};
