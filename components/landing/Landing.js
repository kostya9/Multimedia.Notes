
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import './Landing.scss'

import { Link, Redirect } from "react-router-dom";
import { INIT_PROJECT, init } from '../../actions/project';
import { connect } from 'react-redux';
import { readFile } from '../../actions/ipcActions';

const LandingDispatch = (dispatch) => {
    return {
        initNewProject: () => dispatch(init()),
        readFile: () => dispatch(readFile())
    }
}

class Landing extends React.Component {
    onNewProject() {
        this.props.initNewProject();
        this.setState({shouldOpenNewProject: true})
    }

    onReadProject() {
        this.props.readFile();
        this.setState({shouldOpenNewProject: true})
    }

    render() {
        const newProject = this.props.isProjectOpen && this.state && this.state.shouldOpenNewProject;
        return (
        <Box align='center' justify='center' alignSelf='center' flex='grow' responsive={true} full='vertical'>
            {newProject && <Redirect push to="/project" />}
            <Columns justify='center'>
                <Box align='center' textAlign='center' onClick={this.onNewProject.bind(this)}>
                    <Card heading="New project" thumbnail="http://icons.iconarchive.com/icons/matiasam/ios7-style/512/Notes-icon.png"
                        className='notes-card' margin={{ horizontal: 'small' }}>
                    </Card>
                </Box>
                <Box align='center' textAlign='center' onClick={this.onReadProject.bind(this)}>
                    <Card heading="Open" thumbnail="http://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png"
                        className='notes-card' margin={{ horizontal: 'small' }}>
                    </Card>
                </Box>
            </Columns>
        </Box>);
    }
}

Landing.propTypes = {
    initNewProject: PropTypes.func.isRequired
}

export default Landing = connect((s) => ({isProjectOpen: s.measures != null}), LandingDispatch)(Landing)