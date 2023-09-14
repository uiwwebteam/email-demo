// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import EmailDemoCard from '../cards/EmailDemoCard';
// import HomePage from '../page/Home';

// const AppRouter = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/" exact component={EmailDemoCard} />
//                 <Route path="/home/:schoolEmail" component={HomePage} />
//             </Switch>
//         </Router>
//     );
// };

// export default AppRouter;

import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './Home';

// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const RouterPage = (props) => {
    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route path='/'>
                    <Home {...props} />
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;
