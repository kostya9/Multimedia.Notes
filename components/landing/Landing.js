
import React from 'react';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import './Landing.scss'

import { Link, Redirect } from "react-router-dom";


export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shouldOpenNewProject: false};
      }

    onNewProject() {
        this.setState({shouldOpenNewProject: true})
    }

    render() {
        const newProject = this.state.shouldOpenNewProject;
        return (
        <Box align='center' justify='center' alignSelf='center' flex='grow' responsive={true} full='vertical'>
            {newProject && <Redirect push to="/project" />}
            <Columns justify='center'>
                <Box align='center' textAlign='center' onClick={this.onNewProject.bind(this)}>
                    <Card heading="New project" thumbnail="http://icons.iconarchive.com/icons/matiasam/ios7-style/512/Notes-icon.png"
                        className='notes-card' margin={{ horizontal: 'small' }}>
                    </Card>
                </Box>
                <Box align='center' textAlign='center'>
                    <Card heading="from Google Drive" thumbnail="http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png"
                        className='notes-card' margin={{ horizontal: 'small' }}>
                    </Card>
                </Box>
            </Columns>
        </Box>);
    }
} 