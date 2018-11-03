import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import SVG from 'react-inlinesvg';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import range from '../../../utils/range';
import { MeasurePropType } from '../../propTypes/grandStaff';
import { addNote, removeNote, previewChange } from '../../../actions/project';

const GrandStaffState = (state) => ({
    measures: state.measures,
    previewNote: state.previewNote
})

const GrandStaffActions = (dispatch) => ({
    addNote: (measureNumber, note, position) => dispatch(addNote(measureNumber, note, position)),
    removeNote: (measureNumber, note, position) => dispatch(removeNote(measureNumber, note, position)),
    previewChange: (measureNumber, note, position) => dispatch(previewChange(measureNumber, note, position)),
})

class GrandStaff extends React.Component {

    getCurrentMeasurePreview(previewNote, measure) {
        if(!previewNote) {
            return null;
        }

        if(previewNote.measureNumber === measure.number) {
            return previewNote;
        }

        return null;
    }

    render() {
        const {measures, previewNote, addNote, removeNote, previewChange} = this.props;
        return <div>
                {measures.map(m => 
                    <Measure key={m.number} 
                             number={m.number} 
                             notes={m.notes} 
                             addNote={(v, p) => addNote(m.number, v, p)} 
                             removeNote={(v, p) => removeNote(m.number, v, p)}
                             previewChange={(v, p) => previewChange(m.number, v, p)}
                             previewNote={this.getCurrentMeasurePreview(previewNote, m)}/>)}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState, GrandStaffActions)(GrandStaff);