import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _debounce from 'lodash.debounce';

import Search from './search';
import VideoList from './video-list';
import VideoPlayer from './video-player';

const API_KEY = 'AIzaSyBPaXv9RfzkVdoT7Ce_1ib3FG3mVwWQQ08';
export default class App extends Component {
  constructor (props) {
    super(props);
    this.searchForVideos();
  }

  searchForVideos (term = '') {
    YTSearch({
        key: API_KEY,
        term: term 
    }, videos => {
        console.log('HII');
        this.setState({
          videos: videos,
          selectedVideo: videos[0],
          term: term
        });
    });
  }

  render() {
      if (!this.state) return <div>Loading...</div>;
      const searchVideo = _debounce(term => this.searchForVideos(term), 500);
      return (
        <React.Fragment>
          <Search onSearchTermChange={searchVideo}/>
          <div className="row">
            <VideoPlayer video={this.state.selectedVideo} />
            <VideoList 
              videos={this.state.videos} 
              onSelectedVideo={selectedVideo => this.setState({ selectedVideo })}/>
          </div> 
        </React.Fragment>
      );
  }
}
