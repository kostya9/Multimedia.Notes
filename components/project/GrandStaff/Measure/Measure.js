import React from 'react';
import PropTypes from 'prop-types';
import MeasureLine from './MeasureLine';

import './Measure.scss';
import { NotePropType } from '../../../propTypes/grandStaff';

import {connect} from 'react-redux';
import { previewChange, addNote, removeNote } from '../../../../actions/project';

const Bar = () => <div className="note-bar"></div>

const MeasureState = (state, ownProps) => ({
    notes: state.measures[ownProps.number].notes,
    previewNote: state.previewNote && state.previewNote.measureNumber === ownProps.number && state.previewNote
})

const MeasureActions = (dispatch, ownProps) => ({
    addNote: () => dispatch(addNote()),
    removeNote: (note, position) => dispatch(removeNote(ownProps.number, note, position)),
    previewChange: (note, position) => dispatch(previewChange(ownProps.number, note, position)),
})

class Measure extends React.Component {
    render() {
        const {notes, addNote, previewNote, removeNote, previewChange} = this.props;
        const lines = ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4']
        const writtenNotes = lines.map(line => ({line, notes: notes.filter(n => n.value === line)}));
        return (
        <span className="note-measure">
            <div className="note-measure-inner">
                {writtenNotes.map((n, i) => 
                    <MeasureLine key={n.line} 
                                 addNote={addNote} 
                                 removeNote={(p) => removeNote(n.line, p)} 
                                 previewChange={(p) => previewChange(n.line, p)} 
                                 value={n.line} 
                                 notes={n.notes} 
                                 isSpace={i % 2 === 1}
                                 previewNote={previewNote && previewNote.value === n.line ? previewNote : null}/>)}
            </div>
            <Bar />
        </span>)
    }
}

Measure.propTypes = {
    number: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(NotePropType).isRequired
}

export default Measure = connect(MeasureState, MeasureActions)(Measure);