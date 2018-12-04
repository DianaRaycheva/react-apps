import React, { Component } from 'react';
import VideoListItem from './video-list-item'
export default class videoList extends Component {
    render () {
        if (!this.props.videos) return;
        return (
            <ul className="col-md-6 list-group">
                {this.props.videos.map(video => {
                    return <VideoListItem key={video.etag} video={video} onSelectedVideo={this.props.onSelectedVideo} />
                })}
            </ul>
        );
    }
}