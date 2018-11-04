import React from 'react';
import './NoteMenuOption.scss';
import SVG from 'react-inlinesvg';
import Card from 'grommet/components/Card';
import ListItem from 'grommet/components/ListItem';
import { mapNoteLengthToSvg } from '../../resources/noteLengthResourceMap';

export default class NoteMenuOption extends React.Component {
    render() {
        const svg = mapNoteLengthToSvg(this.props.length);
        const width = svg.size + 'px';
        return (<Card
            textAlign='center'
            textSize='small'
            thumbnail={<SVG src={svg.src} className='note-tool-img' style={{width: width}}/>}
            label={this.props.description} >
        </Card>);
    }
}