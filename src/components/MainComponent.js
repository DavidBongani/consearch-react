import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import LessonDetail from './LessonDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchLessons, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
  return {
    lessons: state.lessons,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  
  postComment: (lessonId, rating, author, comment) => dispatch(postComment(lessonId, rating, author, comment)),
  fetchLessons: () => { dispatch(fetchLessons())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())

});




class Main extends Component {

  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
    this.props.fetchLessons();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  
  render() {

    const HomePage = () => {
      return(
          <Home 
              lesson={this.props.lessons.lessons.filter((lesson) => lesson.featured)[0]}
              lessonsLoading={this.props.lessons.isLoading}
              lessonsErrMess={this.props.lessons.errMess}              
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const LessonWithId = ({match}) => {
      return(
          <LessonDetail lesson={this.props.lessons.lessons.filter((lesson) => lesson.id === parseInt(match.params.lessonId,10))[0]}
            isLoading={this.props.lessons.isLoading}
            errMess={this.props.lessons.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.lessonId === parseInt(match.params.lessonId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      );
    };
    
    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                  <Switch location={this.props.location}>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path='/menu' component={() => <Menu lessons={this.props.lessons} />} />
                    <Route path='/menu/:lessonId' component={LessonWithId} />              
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to="/home" />
                  </Switch>           
                </Switch>
            </CSSTransition>
        </TransitionGroup>           
        <Footer />       
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));