import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
class About extends Component {
    render() {
        return (

            <Box>
                Nothing
            </Box>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
