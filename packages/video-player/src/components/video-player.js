import React, { Component } from 'react';

export default class VideoPlayer extends Component {
    render () {
        const video = this.props.video;
        if (!video) return <div>Loading...</div>;
        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${videoId}`;
        return (
            <div className="col-md-6 video-player">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={url} title={video.snippet.title}></iframe>
                    <div className="video-player-tools">
                        {/* <span role="button">Theatre</span> */}
                    </div>
                </div>
                <div className="video-details">
                    <div className="video-details-heading">{video.snippet.title}</div>
                    <div className="video-details-body">{video.snippet.description}</div>
                </div>
            </div>
        )
    }
}
