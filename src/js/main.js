var $          = require('jquery');
var foundation = require('../../node_modules/foundation-sites/dist/foundation.js');
var fixOrientation = require('fix-orientation');
var dataURItoBlob = require('./lib/dataURItoBlob.js');

$(document).foundation();

$('#image-upload-input').on('change', function(event) {

  var data = new FormData();
  var file = event.target.files[0];
  var fileName = file.name;
  fixit(file, fileName);
});

function fixit(file, fileName) {

  var _this = this;
  var reader = new FileReader();
  reader.onload = function(e) {

    imageDataUrl = e.target.result;
    displayPreview(imageDataUrl, '.not-fixed');
    fixOrientation(imageDataUrl, function(fixedImageDataUrl) {

      displayPreview(fixedImageDataUrl, '.fixed');
      setDownloadLink(fixedImageDataUrl, fileName);
    });
  };
  reader.readAsDataURL(file);
}

function displayPreview(imageDataUrl, elClass) {

  $('div' + elClass).css('background-image', 'url(' + imageDataUrl + ')');
  $('img' + elClass).attr('src', imageDataUrl);
}

function setDownloadLink(imageDataUrl, fileName) {

  var blob = new Blob([imageDataUrl], {
    type: 'octet/stream'
  });
  var url = window.URL.createObjectURL(blob);
  $('.download-fixed').attr({
    href: url,
    download: fileName
  });
  window.URL.revokeObjectURL(url);
}