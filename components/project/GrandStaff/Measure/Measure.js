import React from 'react';
import PropTypes from 'prop-types';
import MeasureLine from './MeasureLine';

import './Measure.scss';
import { NotePropType } from '../../../propTypes/grandStaff';


const Bar = () => <div className="note-bar"></div>

export default class Measure extends React.Component {
    render() {
        const number = this.props.number;
        const propNotes = this.props.notes;
        const notes = ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4']
        const writtenNotes = notes.map(n => ({n, written: propNotes.map(pn => pn.value === n ? pn.length : null)}));
        return (
        <span className="note-measure">
            <div className="note-measure-inner">
                {writtenNotes.map((n, i) => <MeasureLine key={n.n} addNote={this.props.addNote} value={n.n} notes={n.written} isSpace={i % 2 === 1}/>)}
            </div>
            <Bar />
        </span>)
    }
}

Measure.propTypes = {
    number: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(NotePropType).isRequired
}