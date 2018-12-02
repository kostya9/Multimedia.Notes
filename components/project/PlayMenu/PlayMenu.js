import React from 'react';
import {connect} from 'react-redux';
import Button from 'grommet/components/Button';
import { startPlaying, stopPlaying, metronomeBeat } from '../../../actions/play';


const PlayMenuState = (state) => ({
    playing: state.playState && state.playState.playing
})

const PlayMenuActions = (dispatch) => ({
    startPlaying: () => dispatch(startPlaying()),
    stopPlaying: () => dispatch(stopPlaying()),
})

class PlayMenu extends React.Component {

    togglePlaying() {
        if(this.isPlaying()) {
            this.props.stopPlaying();
        } else {
            this.props.startPlaying();
        }
    }

    isPlaying() {
        return this.props.playing;
    }

    render() {
        const text = this.isPlaying() ? '||' : '|>';
        return <Button onClick={this.togglePlaying.bind(this)}>{text}</Button>
    }
}

export default PlayMenu = connect(PlayMenuState, PlayMenuActions)(PlayMenu);
