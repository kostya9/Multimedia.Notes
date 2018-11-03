import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import Tone from 'tone';
import { NotePropType } from '../../../propTypes/grandStaff';

//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

function play(n) {
    synth.triggerAttackRelease(n, "8n");
}
//play a middle 'C' for the duration of an 8th note

export default class MeasureLine extends React.Component {

    refCallback(element) {
        if (element) {
            const {width, left} = element.getBoundingClientRect();
            if(!this.state || width != this.state.width || left != this.state.left) {
                this.setState({width: width, left: left});
            }
        }
      };

    renderNote(n, i) {
        const left = n.position * 100 + '%';
        return <SVG src='img/note.svg' className='note-staff-img' style={{left: left}} key={i}/>
    }

    onNoteClick(e) {
        const {addNote, value} = this.props;
        const {width, left} = this.state;
        const offset = (e.nativeEvent.clientX - left) - 5;
        const position = offset / width;
        play(value); 
        addNote(value, position);
    } 

    render() {
        const classOuter = this.props.isSpace ? 'note-space' : 'note-line';
        const classInner = classOuter + '-internal';
        return (<div ref={this.refCallback.bind(this)} className={classOuter} onClick={this.onNoteClick.bind(this)}>
            <div className={classInner}>
            {this.props.notes.map(this.renderNote)}
            </div>
        </div>);


    }
}

MeasureLine.propTypes = {
    notes: PropTypes.arrayOf(NotePropType).isRequired,
    value: PropTypes.string.isRequired,
    isSpace: PropTypes.bool.isRequired,
    addNote: PropTypes.func.isRequired
};