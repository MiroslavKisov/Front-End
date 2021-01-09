//Holds the glodal constants of the project
const constants = (() => {
  let selectors = {
    profilePicture : 'profilePicture',
    recipePicture : 'recipePicture',
    messageElementSuccess : 'div#notification div#successMessage strong',
    messageElementError : 'div#notification div#errorMessage strong',
    notificationHidden : 'notification-hidden',
    successMessage : 'successMessage',
    errorMessage : 'errorMessage',
  }

  let routes = {
    homeIndex : '/index.html',
    homeSlash : '/',
    homeHashtag : '#/home',
    register : '#/register',
    login : '#/login',
    logout : '#/logout',
    createRecipe : '#/create-recipe',
    profile: '#/profile',
    profileEdit: '#/profile-edit',
    profilePictureEdit: '#/profile-picture-edit',
    recipePictureEdit: '#/recipe-picture-edit/:recipeId',
    myRecipes : '#/my-recipes',
    othersRecipes : '#/others-recipes',
    allRecipes : '#/all-recipes',
    recipeDetails : '#/recipe-details/:recipeId',
    recipeEdit : '#/recipe-edit/:recipeId',
    recipeDelete : '#/recipe-delete/:recipeId',
    recipeComment : '#/recipe-comment/:recipeId',
    searchRecipes : '#/search-recipes',
  }

  let messages = {
    successLogin : 'You have succesfully logged in.',
    successRegister : 'You have successfully registered.',
    successCreateRecipe : 'You have successfully created a recipe.',
    successUpdateProfile : 'You have succesfully updated your profile.',
    successUpdateRecipe : 'You have succesfully updated your recipe.',
    successDeleteRecipe : 'You have successfully deleted a recipe.',
    successPostComment : 'You have successfully posted a comment.',
    errorPictureSize : 'Picture size must be less or equal to 1 MB!',
    errorPictureExtension : 'Invalid file type, Try .png, .jpg, .jpeg, .gif',
  }

  let templates = {
    headerPath : './templates/common/header.hbs',
    footerPath : './templates/common/footer.hbs',
    homePath : './templates/home/home.hbs',
    registerPath : './templates/user/register.hbs',
    loginPath : './templates/user/login.hbs',
    createRecipePath : './templates/recipe/create-recipe.hbs',
    profilePath : './templates/user/profile.hbs',
    profileEditPath : './templates/user/edit-profile.hbs',
    recipesPath : './templates/recipe/recipes.hbs',
    recipePath : './templates/recipe/recipe.hbs',
    recipeDetailsPath : './templates/recipe/recipe-details.hbs',
    recipeEditPath : './templates/recipe/recipe-edit.hbs',
    recipeComment : './templates/recipe/recipe-comment.hbs',
  }

  let session = {
    userId : 'userId',
    username : 'username',
    authtoken : 'authtoken',
  }

  let authorization = {
    basic : 'basic',
    kinvey : 'kinvey',
  }

  let collection = {
    appdata : 'appdata',
    user : 'user',
  }

  let endPoint = {
    recipes : 'recipes',
  }

  let fileSize = {
    picture : 1000000,
  }

  let fileTypes = {
    png : 'image/png',
    jpeg : 'image/jpeg',
    jpg : 'image/jpg',
    gif : 'image/gif',
  }

  return {
    selectors,
    routes,
    messages,
    templates,
    authorization,
    collection,
    session,
    endPoint,
    fileSize,
    fileTypes,
  }

})();