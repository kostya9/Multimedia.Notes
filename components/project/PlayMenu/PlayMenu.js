import React from 'react';
import {connect} from 'react-redux';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import { startPlaying, stopPlaying, metronomeBeat } from '../../../actions/play';
import { setBpm } from '../../../tonejs/play';


const PlayMenuState = (state) => ({
    playing: state.playState && state.playState.playing
})

const PlayMenuActions = (dispatch) => ({
    startPlaying: () => dispatch(startPlaying()),
    stopPlaying: () => dispatch(stopPlaying()),
})

class PlayMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bpm: 80};
    }

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

    bpmChange(e) {
        const bpm = e.target.value
        this.setState({bpm});
        setBpm(bpm);
    }

    render() {
        const text = this.isPlaying() ? '||' : '|>';
        const bpm = this.state.bpm;
        return <Box direction='row' justify='between' full='horizontal'>
            <FormField label={'bpm: ' + bpm}><input type="range" min="60" max="250" step="10" value={bpm} onChange={this.bpmChange.bind(this)}></input></FormField>
            <Button onClick={this.togglePlaying.bind(this)} label={text} />
            </Box>
    }
}

export default PlayMenu = connect(PlayMenuState, PlayMenuActions)(PlayMenu);
