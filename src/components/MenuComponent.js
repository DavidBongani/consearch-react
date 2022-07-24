import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem ({lesson, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${lesson.id}`} >
                <CardImg width="100%" src={baseUrl + lesson.image} alt={lesson.name} />
                <CardImgOverlay>
                    <CardTitle>{lesson.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

    const Menu = (props) => {

        const menu = props.lessons.lessons.map((lesson) => {
            return (
                <div className="col-12 col-md-5 m-1"  key={lesson.id}>
                    <RenderMenuItem lesson={lesson} onClick={props.onClick} />
                </div>
            );
        });

        if (props.lessons.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.lessons.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.lessons.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }

export default Menu;