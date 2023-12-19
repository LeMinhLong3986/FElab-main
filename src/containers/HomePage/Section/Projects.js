import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box'

// Import css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Projects.scss'
import { getAllProjectService } from '../../../services/userService'
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions'
class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProject: []
        }
    }

    async componentDidMount() {
        let res = await getAllProjectService()
        if (res && res.errCode === 0) {
            this.setState({
                dataProject: res.data ? res.data : []
            })
        }
    }

    handleViewDetailProject = (item) => {
        // console.log('view infor: ', member)
        if (this.props.history) {
            this.props.history.push(`/detail-project/${item.id}`)
        }

    }
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { dataProject } = this.state
        return (

            <div className='section-project'>
                <div className='project-container'>
                    <div className='project-header'>
                        <span className='title-section'>Projects</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='project-body'>
                        <Slider {...settings} >
                            {dataProject && dataProject.length > 0 &&
                                dataProject.map((item, index) => {
                                    return (
                                        <div className='project-cusomize'
                                            key={index}
                                            onClick={() => this.handleViewDetailProject(item)}>
                                            <div className='bg-image-projects' style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className='name-project'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));
