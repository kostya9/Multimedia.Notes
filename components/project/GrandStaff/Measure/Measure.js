import React from 'react';
import Tone from 'tone';
import PropTypes from 'prop-types';

import './Measure.scss';

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note

const Line = ({ note, addNote }) => <div className="note-line" onClick={() => {play(note); addNote(note);}}><div className="note-line-internal"></div></div>
const Space = ({ note, addNote }) => <div className="note-space" onClick={() => {play(note); addNote(note);}}><div className="note-space-internal"></div></div>
const Bar = () => <div className="note-bar"></div>

function play(n) {
    console.log(n)
    synth.triggerAttackRelease(n, "8n");
}

export default class Measure extends React.Component {
    render() {
        const number = this.props.number;
        const notes = ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4']
        return (
        <span className="note-measure">
            <div className="note-measure-inner">
                {notes.map((n, i) => i % 2 == 0 ? <Line key={n} note={n} addNote={this.props.addNote} /> : <Space key={n} addNote={this.props.addNote} note={n} />)}
            </div>
            <Bar />
        </span>)
    }
}

Measure.propTypes = {
    number: PropTypes.number.isRequired
}