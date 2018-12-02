import React from 'react';
import {connect} from 'react-redux';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import NumberInput from 'grommet/components/NumberInput';
import { startPlaying, stopPlaying, setPosition } from '../../../actions/play';
import { setBpm } from '../../../tonejs/play';

import './PlayMenu.scss';

const PlayMenuState = (state) => ({
    playing: state.playState && state.playState.playing,
    position: state.playState && (state.playState.position / state.measures.length),
})

const PlayMenuActions = (dispatch) => ({
    startPlaying: () => dispatch(startPlaying()),
    stopPlaying: () => dispatch(stopPlaying()),
    setPosition: (p) => dispatch(setPosition(p))
})

class PlayMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bpm: 80, position: 0};
        setBpm(this.state.bpm);
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

    positionChange(e) {
        const position = e.target.value;
        this.props.setPosition(position);
    }

    render() {
        const text = this.isPlaying() ? '||' : '|>';
        const {bpm} = this.state;
        const position = this.props.position;
        return <Box direction='row' justify='between' full='horizontal'>
            <FormField size='large' label='Song position'><input type='range' min={0} max={1} step={0.01} value={position} onChange={this.positionChange.bind(this)}></input></FormField>
            <FormField className='bpm-input' label={'bpm: ' + bpm}><NumberInput min={60} max={250} step={10} value={bpm} onChange={this.bpmChange.bind(this)}></NumberInput></FormField>
            <Button onClick={this.togglePlaying.bind(this)} label={text} />
            </Box>
    }
}

export default PlayMenu = connect(PlayMenuState, PlayMenuActions)(PlayMenu);
