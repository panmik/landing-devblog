import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import DevBlog from './Components/DevBlog';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

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
