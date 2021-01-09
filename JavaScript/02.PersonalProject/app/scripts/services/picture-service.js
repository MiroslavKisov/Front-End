const pictureService = (() => {

  //Encodes the picture data into string
  function encodePicture(pictureData) {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onloadend = x => resolve(fr.result);
      fr.readAsDataURL(pictureData);
  })}

  return {
    encodePicture,
  }
})();