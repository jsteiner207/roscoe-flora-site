import React from 'react'
import { Gallery, GalleryImage } from "react-photo-gallery";
//import { photos } from "\Photos.js";
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
const demoPhotos = [
	{
		id : 1, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 2, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 3, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 4, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 5, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	},
	{
		id : 6, src : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg"
	},
	{
		id : 7, src : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg",
		bigSrc : "https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg"
	}
]
export default function Portfolio() {
    return (
        <div>
<<<<<<< Updated upstream
            <h2 style={linkstyle}>Portfolio is under deat</h2>
            <script type="text/javascript">
    var feed = new Instafeed(
        get: 'popular',
        
        clientId: '10420343974',
        template: '<a class="animation" href="{{link}}"><img src="{{image}}" /></a>'
    });
    feed.run();
</script>
<script type="text/javascript" src="path/to/instafeed.min.js"></script>
=======
            <h2 style={linkstyle}>Portfolio is under constructoin</h2>
            
            <PhotoGrid columns={3} photos={demoPhotos} />
>>>>>>> Stashed changes
        </div>
    )
}
//import React from "react";




// ReactDOM.render(
// 	<div>
// 		<PhotoGrid columns={3} photos={demoPhotos} />
// 	</div>,
// 	document.getElementById('root')
// );

const linkstyle = {
    color: '#333',
    textDecoration: 'none'

}