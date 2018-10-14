import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import range from '../../../utils/range';
import { MeasurePropType } from '../../propTypes/grandStaff';

const GrandStaffState = (state) => ({
    measures: state.measures
})

class GrandStaff extends React.Component {
    render() {
        const measures = this.props.measures;
        return <div>
                {measures.map(m => <Measure key={m.number} number={m.number}/>)}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState)(GrandStaff);