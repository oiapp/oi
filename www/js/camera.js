function takePicture(img) {
        navigator.camera.getPicture(
                function(imageURI) {
			// Success
			img.attr('src', imageURI);
			img.css({width: '100%', height: '100%'});
                },
                function() {
			// Failure
			// Following setTimeout works around an iOS bug
                        setTimeout(
                                function() {
                                        console.log('Picture taking failed');
                                },
                                0
                        );
                },
                {
                        destinationType: Camera.DestinationType.FILE_URI,
			allowEdit: false,
			saveToPhotoAlbum: false
                }
        );
}
