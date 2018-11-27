import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from "../../actions/userActions";
import FlatButton from 'material-ui/FlatButton'
import _ from 'lodash';
import './style.css';
import scheme from '../../scheme.png';
import { Link } from 'react-router-dom'

class _Page extends Component{
  render(){
    return(
      <div className="wrapper">
        <div className="main-title">Единая база людей попавших в трудную жизненную ситуацию</div>
        <div className="linear">
          <div className="img">
            <img src={scheme} style={{width: '600px', marginLeft: '80px'}}/>
          </div>
          <div className="secondary">
            <div className="txt">
              В рамках Программной статьи «Взгляд в будущее: Модернизация общественного сознания» МТСЗН РК 
              подготовил новую Концепцию развития системы соцуслуг. Она разработана с учетом результатов 
              предыдущих преобразований и того качества, которое является для нас примером – это опыт развитых 
              стран с высоким индексом человеческого развития.
            </div>
            <div className="linkBtn">
              <Link to="/createCase">
                <FlatButton 
                  className="auth-btn" 
                  label="Создать заявку" 
                  labelStyle={{color: '#fff', backgroundColor: '#2CACBD', padding: '40px'}}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
};

const Page = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Page);

export default Page;