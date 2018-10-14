import React from 'react';
import {observer} from "mobx-react";

import Measure from './Measure/Measure'
import './GrandStaff.scss';
import range from '../../../utils/range';
import { observable } from 'mobx';

@observer
export class GrandStaff extends React.Component {
    render() {
        const measures = range(0, 5);
        return <div>
                {measures.map(i => <Measure key={i} number={i}/>)}
            </div>
    }
}