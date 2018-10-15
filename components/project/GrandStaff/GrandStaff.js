import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import SVG from 'react-inlinesvg';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import range from '../../../utils/range';
import { MeasurePropType } from '../../propTypes/grandStaff';
import { addNote } from '../../../actions/project';

const GrandStaffState = (state) => ({
    measures: state.measures
})

const GrandStaffActions = (dispatch) => ({
    addNote: (measureNumber, note) => dispatch(addNote(measureNumber, note))
})

class GrandStaff extends React.Component {
    render() {
        const measures = this.props.measures;
        return <div>
                {measures.map(m => <Measure key={m.number} number={m.number} notes={m.notes} addNote={(n) => this.props.addNote(m.number, n)}/>)}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState, GrandStaffActions)(GrandStaff);