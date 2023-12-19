import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Component } from 'react'

import { handleLoginApi } from '../../services/userService'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import * as actions from '../../store/actions'

const defaultTheme = createTheme()


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password')
        })
    }
    /*lệnh setState cập nhật biến thay đổi trạng thái của react */
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        // console.log('username: ', this.state.username, 'password: ', this.state.password)
        // console.log('all state: ', this.state)
        // alert('an')
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    // console.log(error)
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    render() {
        return (
            <Box>
                <ThemeProvider theme={defaultTheme}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid item xs={false} sm={4} md={7}
                            sx={{
                                backgroundImage: 'url(https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                {/*   - cái này trong Box bên dưới*/}
                                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                                    <TextField margin="normal" required fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        // autoComplete="email"
                                        // value={this.state.username}
                                        onChange={(event) => this.handleOnChangeUsername(event)}
                                        autoFocus
                                    />
                                    <TextField margin="normal" required fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        // autoComplete="current-password"
                                        // value={this.state.password}
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Typography sx={{ color: 'red' }}>
                                        {this.state.errMessage}
                                    </Typography>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => { this.handleLogin() }}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                <Typography>
                                                    Dont have an account? Sign Up
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Box >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default SignInSide