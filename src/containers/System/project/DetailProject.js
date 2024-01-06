import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailProject.scss';
import { getAllDetailProjectById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { Divider } from '@mui/material';

class DetailProject extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            detailProject: {}
        })
    }
    async componentDidMount() {
        if (this.props.match
            && this.props.match.params
            && this.props.match.params.id) {

            let id = this.props.match.params.id
            let res = await getAllDetailProjectById(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailProject: res.data
                })

            }

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    render() {
        console.log(this.props.match.params.id)
        let { detailProject } = this.state
        let nameVi = `${detailProject.name}`
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='project-detail-container'>
                    <div className='project-detail-header'>
                        {nameVi}
                    </div>
                    <Divider sx={{ fontFamily: '', fontSize: '1.5rem', fontWeight: '700', color: '#7f8c8d', marginY: '30px', paddingX: '60px' }}>
                        Thông tin chi tiết
                    </Divider>
                    <div className='project-detail-page'>
                        <div className='project-image'
                            style={{ backgroundImage: `url(${detailProject && detailProject.image ? detailProject.image : ''})` }}
                        ></div>
                        <div className='project-infor'>

                            

                            {detailProject  && detailProject.descriptionHTML
                                && <div dangerouslySetInnerHTML={{ __html: detailProject.descriptionHTML }}>
                                </div>}
                        </div>
                    </div>
                    <HomeFooter />
                </div>

            </React.Fragment>
        );
    }

        
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject);
