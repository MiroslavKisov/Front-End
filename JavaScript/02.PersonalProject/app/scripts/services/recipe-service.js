const recipeService = (() => {
  function addRecipe(data) {
    return dataService
      .post(constants.collection.appdata, constants.endPoint.recipes, data, constants.authorization.kinvey);
  }
  
  function getRecipeById(recipeId) {
    return dataService.get(constants.collection.appdata, `recipes/${recipeId}`, constants.authorization.kinvey);
  }

  function getMyRecipes(userId) {
    return dataService.get(constants.collection.appdata, `recipes?query={"_acl.creator":"${userId}"}&fields=name,text,commentCount,creatorName&sort={"commentCount": -1}`, constants.authorization.kinvey);
  }

  function getOthersRecipes(userId) {
    return dataService.get(constants.collection.appdata, `recipes?query={"_acl.creator":{"$ne":"${userId}"}}&fields=name,text,commentCount,creatorName&sort={"commentCount": -1}`, constants.authorization.kinvey);
  }

  function editRecipe(recipe) {
    return dataService.put(constants.collection.appdata, `recipes/${recipe._id}`, recipe, constants.authorization.kinvey);
  }

  function deleteRecipeById(recipeId) {
    return dataService.remove(constants.collection.appdata, `recipes/${recipeId}`, constants.authorization.kinvey);
  }

  function getAllRecipes() {
    return dataService.get(constants.collection.appdata, constants.endPoint.recipes, constants.authorization.kinvey);
  }

  return {
    addRecipe,
    getRecipeById,
    getMyRecipes,
    editRecipe,
    deleteRecipeById,
    getOthersRecipes,
    getAllRecipes,
  }
})();