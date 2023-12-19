import Container from '@mui/material/Container'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Projects from './Section/Projects';
import Box from '@mui/material/Box';
import LabMembers from './Section/LabMembers'
import About from './Section/About';
import HomeFooter from './HomeFooter';
import Divider from '@mui/material/Divider';
class HomePage extends Component {

    render() {
        return (
            <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
                <HomeHeader isShowBanner={true} />
                <Divider sx={{ fontFamily: '', fontSize: '1.4rem', fontWeight: '550', color: '#435278', marginY: '30px', paddingX: '60px' }}>
                    PROJECTS
                </Divider>
                <Projects />
                <Divider sx={{ fontFamily: '', fontSize: '1.4rem', fontWeight: '550', color: '#435278', marginY: '30px', paddingX: '60px' }}>
                    LAB MEMBERS
                </Divider>
                <LabMembers />
                <About />
                <HomeFooter />
            </Container >
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
