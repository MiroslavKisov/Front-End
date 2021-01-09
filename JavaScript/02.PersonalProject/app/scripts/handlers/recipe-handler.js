//Renders the form for creating recipes
handlers.getCreateRecipe = function(context) {
  context.recipeRoute = constants.routes.createRecipe;
  context.isAuth = userService.isAuth;
  context.username = sessionStorage.getItem(constants.session.username);

  context.loadPartials({
      header: constants.templates.headerPath,
      footer: constants.templates.footerPath
    }).then(function () {
      this.partial(constants.templates.createRecipePath);
    }).catch(function (error) {
      notificationService.error(error);
    });
}

//Post the create recipe form
handlers.postCreateRecipe = function(context) {

  let _this = this;
  let name = context.params.recipeName;
  let text = context.params.recipeText;
  let creatorName = sessionStorage.getItem(constants.session.username);

  let recipe = {
    name : name,
    text : text,
    comments : [],
    picture : '',
    commentCount : 0,
    creatorName : creatorName,
  }

  recipeService.addRecipe(recipe)
    .then(function() {
      _this.redirect(constants.routes.myRecipes);
      notificationService.success(constants.messages.successCreateRecipe);
    })
    .catch(function(error) {
      notificationService.error(error);
    });
  
}

//Renders the current user recipes
handlers.getMyRecipes = function(context) {
  let userId = sessionStorage.getItem(constants.session.userId);

  recipeService.getMyRecipes(userId)
    .then(function(recipes) {
      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context.recipes = recipes.data;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
        recipe : constants.templates.recipePath,
      })
      .then(function() {
        this.partial(constants.templates.recipesPath);
      });
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Renders the detailed info for the recipe
handlers.getRecipeDetails = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];
  let _this = this;

  recipeService.getRecipeById(recipeId)
    .then(function(recipe) {

      let userId = sessionStorage.getItem(constants.session.userId);
      let creatorId = recipe.data._acl.creator;

      context.isCreator = userService.isCreator(userId, creatorId);

      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context._id = recipe.data._id;
      context.picture = recipe.data.picture;
      context.name = recipe.data.name;
      context.text = recipe.data.text;
      context.comments = recipe.data.comments;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
        comment : constants.templates.recipeComment,
      })
      .then(function() {
        this.partial(constants.templates.recipeDetailsPath);
      });
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Renders the recipe edit form
handlers.getRecipeEdit = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];

  recipeService.getRecipeById(recipeId)
    .then(function(recipe) {

      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context._id = recipe.data._id;
      context.name = recipe.data.name;
      context.text = recipe.data.text;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
      })
      .then(function() {
        this.partial(constants.templates.recipeEditPath);
      });
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Posts the recipe edit form
handlers.postRecipeEdit = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];
  let _this = this;

  recipeService.getRecipeById(recipeId)
    .then(function(recipe) {

      let name = context.params.recipeName;
      let text = context.params.recipeText;

      recipe.data.name = name;
      recipe.data.text = text;

      recipeService.editRecipe(recipe.data)
        .then(function() {
          notificationService.success(constants.messages.successUpdateRecipe);
          _this.redirect(`#/recipe-details/:${recipeId}`);
        })
        .catch(function(error) {
          notificationService.error(error);
        });

    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Deletes the current recipe
handlers.postDeleteRecipe = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];
  let _this = this;

  recipeService.deleteRecipeById(recipeId)
    .then(function() {
      notificationService.success(constants.messages.successDeleteRecipe);
      _this.redirect(constants.routes.myRecipes);
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Updates the recipe picture
handlers.editRecipePicture = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];
  let pictureFile = document.getElementById(constants.selectors.recipePicture).files[0];

  if(pictureFile.size >= constants.fileSize.picture) {
    notificationService.error(constants.messages.errorPictureSize);
    return;
  }

  if(pictureFile.type !== constants.fileTypes.jpg &&
    pictureFile.type !== constants.fileTypes.jpeg &&
    pictureFile.type !== constants.fileTypes.png && 
    pictureFile.type !== constants.fileTypes.gif) {
     notificationService.error(constants.messages.errorPictureExtension);
     return;
  }

  let _this = this;

  pictureService.encodePicture(pictureFile)
    .then(function(data) {
      
      let picture = data;

      recipeService.getRecipeById(recipeId)
        .then(function(recipe) {
          recipe.data.picture = picture;

          recipeService.editRecipe(recipe.data)
            .then(function() {
              notificationService.success(constants.messages.successUpdateRecipe);
              _this.redirect(`#/recipe-details/:${recipeId}`);
            })
            .catch(function(error) {
              notificationService(error);
            });
        })
        .catch(function(error) {
          notificationService(error);
        });
    })
    .catch(function(error) {
      notificationService.error(error)
    });
}

//Posts a comment on the current recipe
handlers.commentRecipe = function(context) {
  let recipeId = context.params.recipeId.split(':')[1];
  let _this = this;

  recipeService.getRecipeById(recipeId)
    .then(function(recipe) {

      let comment = context.params.commentRecipe;

      let user = sessionStorage.getItem(constants.session.username);
      recipe.data.commentCount += 1;

      let commentObj = {
        user : user,
        comment : comment,
      }

      recipe.data.comments.push(commentObj);

      recipeService.editRecipe(recipe.data)
        .then(function() {

          notificationService.success(constants.messages.successPostComment);
          _this.redirect(`#/recipe-details/:${recipeId}`);

        })
        .catch(function(error) {
          notificationService.error(error);
        });
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Renders all recipes creted by users different than the current one
handlers.getOthersRecipes = function(context) {
  let userId = sessionStorage.getItem(constants.session.userId);

  recipeService.getOthersRecipes(userId)
    .then(function(recipes) {
      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context.recipes = recipes.data;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
        recipe : constants.templates.recipePath,
      })
      .then(function() {
        this.partial(constants.templates.recipesPath);
      });
    })
    .catch(function(error) {
      notificationService.error(error);
    });
}

//Performs case insensitive search on the recipes
handlers.searchRecipes = function(context) {

  recipeService.getAllRecipes()
    .then(function(res) {

      let searchValue = context.params.searchRecipe;
      let regex = new RegExp(searchValue, 'i');
      let recipes = res.data;
      let filteredRecipes = [];

      for(let recipe of recipes) {
        if(regex.test(recipe.name)) {
          filteredRecipes.push(recipe);
        }
      }

      filteredRecipes.sort((a, b) => (a.commentCount > b.commentCount) ? -1 : 1);

      context.isAuth = userService.isAuth;
      context.username = sessionStorage.getItem(constants.session.username);
      context.recipes = filteredRecipes;

      context.loadPartials({
        header : constants.templates.headerPath,
        footer : constants.templates.footerPath,
        recipe : constants.templates.recipePath,
      })
      .then(function() {
        this.partial(constants.templates.recipesPath);
      });

    })
    .catch(function(error) {
      notificationService.error(error);
    });
}