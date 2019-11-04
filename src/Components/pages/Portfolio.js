import React from 'react'
import { Gallery, GalleryImage } from "react-photo-gallery";
//import { photos } from "\Photos.js";
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
//import photos from './photos.js'
const demoPhotos = [
	{
		id : 1, src : "https://i.imgur.com/IHu4dkl.png",
		bigSrc : "https://i.imgur.com/IHu4dkl.png"
	},
	{
		id : 2, src : "https://i.imgur.com/qkCCZN2.png",
		bigSrc : "https://i.imgur.com/qkCCZN2.png"
	},
	{
		id : 3, src : "https://i.imgur.com/NQIT1JH.png",
		bigSrc : "https://i.imgur.com/NQIT1JH.png"
	},
	{
		id : 4, src : "https://i.imgur.com/nUbzYZO.png",
		bigSrc : "https://i.imgur.com/nUbzYZO.png"
	},
	{
		id : 5, src : "https://i.imgur.com/nO8j7cI.png",
		bigSrc : "https://i.imgur.com/nO8j7cI.png"
	},
	{
		id : 6, src : "https://i.imgur.com/iLJbh7E.png",
		bigSrc : "https://i.imgur.com/iLJbh7E.png"
	}
	
]
export default function Portfolio() {
    return (
       <div>
<script type="text/javascript" src="path/to/instafeed.min.js"></script>
            <h2 style={linkstyle}>Portfolio is under constructoin</h2>
            
            <PhotoGrid columns={3} photos={demoPhotos} />
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