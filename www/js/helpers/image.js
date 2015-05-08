angular
    .module('cleverbaby.helpers')
    .factory("Image", ["$ionicModal", '$cordovaCamera', function($ionicModal, $cordovaCamera){

        function captureImage(){
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            return $cordovaCamera.getPicture(options);
        }

        return {
            captureImage: captureImage
        }
    }]);