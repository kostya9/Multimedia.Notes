import React from 'react';
import {connect} from 'react-redux';
import ListItem from 'grommet/components/ListItem';
import List from 'grommet/components/List';
import NoteMenuOption from './NoteMenuOption'
import { chooseLength } from '../../../actions/project';

const NoteMenuState = (state) => ({
    selectedLength: state.chosenLength
})

const NoteMenuActions = (dispatch) => ({
    chooseLength: (length) => dispatch(chooseLength(length))
})

class NoteMenu extends React.Component {
    render() {

        const notes = [{
            length: '1n',
            description: 'Full note'
        },
        {
            length: '2n',
            description: 'Half note'
        },
        {
            length: '4n',
            description: 'Quarter note'
        },
        {
            length: '8n',
            description: 'Eighth note'
        }]

        const {selectedLength, chooseLength} = this.props;
        return (
        <List selectable={true} selected={notes.findIndex(n => n.length === selectedLength)} onSelect={i => chooseLength(notes[i].length)}>
            {notes.map(n => (
                <ListItem key={n.length}>
                        <NoteMenuOption length={n.length} description={n.description}/> 
                </ListItem>))
            }
        </List>);
    }
}

export default NoteMenu = connect(NoteMenuState, NoteMenuActions)(NoteMenu);