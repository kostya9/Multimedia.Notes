import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import { MeasurePropType } from '../../propTypes/grandStaff';
import { previewChange } from '../../../actions/project';
import { Cleff } from './Cleff';

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

    getMeasure(m) {
        if(m.number % 2 == 0) {
            return (<span className="newline" key={'s' + m.number}><Cleff key={'c' + m.number} /> <Measure key={m.number} 
                number={m.number} /></span>)
        }

        return (<Measure key={m.number} 
            number={m.number} />);
    }

    render() {
        const {measures} = this.props;
        return <div onMouseLeave={this.onMouseLeave.bind(this)}>
                {measures.map(this.getMeasure)}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState, GrandStaffActions)(GrandStaff);