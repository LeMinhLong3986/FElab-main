import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
class HomeFooter extends Component {
    render() {
        return (

            <Box
                sx={{
                    height: '50px',
                    textAlign: 'center',
                    paddingTop: '8px',
                }}>
                <Typography variant="body2" color="text.secondary" align="center" >
                    {'Copyright © '}
                    <Link color="inherit" href="https://www.instagram.com/sooyaaa__/" underline='hover' target="_blank" rel="noopener">
                        CLQA Lab
                    </Link>
                    {' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
