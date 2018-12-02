import React from 'react';
import {Link} from 'react-router-dom';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import App from 'grommet/components/App';
import Button from 'grommet/components/Button';

import GrandStaff from './GrandStaff/GrandStaff';
import NoteMenu from './NoteMenu/NoteMenu';
import { playMode, editMode } from '../../actions/project';

import {connect} from 'react-redux';
import PlayMenu from './PlayMenu/PlayMenu';

// NOTES FROM https://www.freepik.com/free-vector/musical-notes_795161.htm
const ProjectState = (state) => ({
    mode: state.mode
})

const ProjectActions = (dispatch) => ({
    playMode: () => dispatch(playMode()),
    editMode: () => dispatch(editMode())
})

class Project extends React.Component {

    toggleMode() {
        if(this.isPlay()) {
            this.props.editMode();
        }
        else { 
            this.props.playMode();
        }
    }

    isPlay() {
        return this.props.mode === 'play';
    }

    render() {

        const buttonText = this.isPlay() ? 'Edit' : 'Play';



        return (
            <App>
                <Split separator={true} flex='right' priority={'right'}>
                    <Sidebar size='small'>
                        <Button><Link to="/">Home</Link></Button>
                        <Button onClick={this.toggleMode.bind(this)}>{buttonText}</Button>
                        { !this.isPlay() ? <NoteMenu /> : <PlayMenu />}
                    </Sidebar>
                    <Box>
                        <GrandStaff />
                    </Box>
                </Split>
            </App>
        );
    }
}

export default Project = connect(ProjectState, ProjectActions)(Project);