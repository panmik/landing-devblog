import React from 'react';
//import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar.js';
import Home from './Components/Home.js';
import NotFound from './Components/NotFound.js';
import DevBlog from './Components/DevBlog.js';
import Contact from './Components/Contact.js';
import Footer from './Components/Footer.js';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
            <NavBar/>
            <div className='container'>
                <div className='main-content'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/devblog' component={DevBlog} />
                        <Route path='/contact' component={Contact} />
                        
                        <Route path='/404' component={NotFound} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(App);
