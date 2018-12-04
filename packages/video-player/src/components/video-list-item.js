import React, { Component } from 'react';

export default class VideoListItem extends Component {
    render () {
        const video = this.props.video;
        const imageUrl = video.snippet.thumbnails.default.url;
        return (
             <li 
                className="list-group-item" 
                id={video.id.videoId} 
                value={video} 
                onClick={() => this.props.onSelectedVideo(video)}>
                    <div className="video-list media">
                        <div className="media-left">
                            <img className="media-object" src={imageUrl} alt=""/>
                        </div>
                        <div className="media-body">
                            <div className="media-heading">{video.snippet.title}</div>
                        </div>                       
                    </div>
            </li>
        );
    }
}