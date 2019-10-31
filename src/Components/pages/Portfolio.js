import React from 'react'



export default function Portfolio() {
    return (
        <div>
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
        </div>
    )
}


const linkstyle = {
    color: '#333',
    textDecoration: 'none'

}