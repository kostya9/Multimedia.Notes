import React from 'react';
import PropTypes from 'prop-types';

import Tone from 'tone';

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

function play(n) {
    console.log(n)
    synth.triggerAttackRelease(n, "8n");
}
//play a middle 'C' for the duration of an 8th note

export default class MeasureLine extends React.Component {
    render() {
        const classOuter = this.props.isSpace ? 'note-space' : 'note-line';
        const classInner = classOuter + '-internal';
        const addNote = this.props.addNote;
        const note = this.props.value;
        return (<div className={classOuter} onClick={() => {play(note); addNote(note);}}>
            <div className={classInner}>
            {this.props.notes.map(n => <span>1</span>)}
            </div>
        </div>);


    }
}

MeasureLine.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    isSpace: PropTypes.bool.isRequired,
    addNote: PropTypes.func.isRequired
};