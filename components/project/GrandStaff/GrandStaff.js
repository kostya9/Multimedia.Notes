import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import { MeasurePropType } from '../../propTypes/grandStaff';
import { previewChange } from '../../../actions/project';

const GrandStaffState = (state) => ({
    measures: state.measures
})

const GrandStaffActions = (dispatch) => ({
    previewChange: (measureNumber, note, position) => dispatch(previewChange(measureNumber, note, position)),
})

class GrandStaff extends React.Component {
    onMouseLeave() {
        const {previewChange} = this.props;
        previewChange(null, null, null);
    }

    render() {
        const {measures} = this.props;
        return <div onMouseLeave={this.onMouseLeave.bind(this)}>
                {measures.map(m => 
                    <Measure key={m.number} 
                             number={m.number} />)}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState, GrandStaffActions)(GrandStaff);