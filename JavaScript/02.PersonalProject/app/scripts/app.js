const handlers = {}

$(() => {
  const app = Sammy('#root', function () {
    
    //use
    this.use('Handlebars', 'hbs');

    //get
    this.get(constants.routes.homeIndex, handlers.getHome);
    this.get(constants.routes.homeSlash, handlers.getHome);
    this.get(constants.routes.homeHashtag, handlers.getHome);
    this.get(constants.routes.register, handlers.getRegister);
    this.get(constants.routes.login, handlers.getLogin);
    this.get(constants.routes.logout, handlers.logoutUser);
    this.get(constants.routes.createRecipe, handlers.getCreateRecipe);
    this.get(constants.routes.profile, handlers.getProfile);
    this.get(constants.routes.profileEdit, handlers.getProfileEdit);
    this.get(constants.routes.myRecipes, handlers.getMyRecipes);
    this.get(constants.routes.othersRecipes, handlers.getOthersRecipes);
    this.get(constants.routes.recipeDetails, handlers.getRecipeDetails);
    this.get(constants.routes.searchRecipes, handlers.searchRecipes);
    this.get(constants.routes.recipeEdit, handlers.getRecipeEdit);

    //post
    this.post(constants.routes.recipeDelete, handlers.postDeleteRecipe);
    this.post(constants.routes.recipeEdit, handlers.postRecipeEdit);
    this.post(constants.routes.profilePictureEdit, handlers.editProfilePicture);
    this.post(constants.routes.recipePictureEdit, handlers.editRecipePicture);
    this.post(constants.routes.profileEdit, handlers.postProfileEdit);
    this.post(constants.routes.register, handlers.postRegister);
    this.post(constants.routes.login, handlers.postLogin);
    this.post(constants.routes.createRecipe, handlers.postCreateRecipe);
    this.post(constants.routes.recipeComment, handlers.commentRecipe);
  });
  app.run();
});