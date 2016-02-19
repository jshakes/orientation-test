/*
  Data URI to Blob
  From: http://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
  Used in image uploading to convert modified dataURIs that have had their orientation fixed back to 
  a blob so it can be saved to the server
 */

module.exports = function(dataURI) {

  if(typeof(dataURI) !== 'string' || !dataURI.length) {

    return false;
  }
  var arr = dataURI.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while(n--) {
    
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
};
