import React from 'react';
import Tone from 'tone';

import './GrandStaff.scss';

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note

const Line = ({ note }) => <div className="note-line" onClick={() => play(note)}><div className="note-line-internal"></div></div>
const Space = ({ note }) => <div className="note-space" onClick={() => play(note)}><div className="note-space-internal"></div></div>
const Bar = () => <div className="note-bar"></div>

function play(n) {
    console.log(1)
    synth.triggerAttackRelease(n, "8n");
}

const Measure = () => (<span className="note-measure">
    <div className="note-measure-inner">
        <Line  note='F5'/>
        <Space note='E5'/>
        <Line note='D5'/>
        <Space note='C5'/>
        <Line note='B4'/>
        <Space note='A4'/>
        <Line note='G4'/>
        <Space note='F4'/>
        <Line note='E4'/>
    </div>
    <Bar />
</span>);

export class GrandStaff extends React.Component {
    render() {
        return <div>
                <Measure />
                <Measure />
                <Measure />
                <Measure />
                <Measure />
                <Measure />
            </div>
    }
}