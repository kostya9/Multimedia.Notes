import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import { MeasurePropType } from '../../propTypes/grandStaff';
import { previewChange } from '../../../actions/project';
import { Cleff } from './Cleff';

const GrandStaffState = (state) => ({
    measures: state.measures,
    mode: state.mode
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
        const times = this.props.mode === 'play' ? 3 : 2;
        if(m.number % times == 0) {
            return (<span className="newline" key={'s' + m.number}><Cleff key={'c' + m.number} /> <Measure key={m.number} 
                number={m.number} /></span>)
        }

        return (<Measure key={m.number} 
            number={m.number} />);
    }

    render() {
        const {measures} = this.props;
        return <div onMouseLeave={this.onMouseLeave.bind(this)} className="grand-staff">
                {measures.map(this.getMeasure.bind(this))}
            </div>
    }
}

GrandStaff.propTypes = {
    measures: PropTypes.arrayOf(MeasurePropType).isRequired
}

export default GrandStaff = connect(GrandStaffState, GrandStaffActions)(GrandStaff);