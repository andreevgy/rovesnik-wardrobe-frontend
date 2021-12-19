// utils/GoogleAnalytics.js
import React, {useCallback, useEffect} from 'react';
import ReactGA from 'react-ga';
import {Route} from 'react-router-dom';

const GoogleAnalytics = (props) => {
    const logPageChange = useCallback((pathname, search = '') => {
        const page = pathname + search;
        const { location } = window;
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
        });
        ReactGA.pageview(page);
    }, [])


    useEffect(() => {
        if (props.location) {
            logPageChange(
                props.location.pathname,
                props.location.search,
            );
        }
    }, [props.location, logPageChange])

    return null;
}

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = () => {
    const isGAEnabled = true;

    if (isGAEnabled && process.env.REACT_APP_GA_TAG) {
        ReactGA.initialize(process.env.REACT_APP_GA_TAG);
        console.log('Inited GA');
    }

    return isGAEnabled;
};

export default {
    GoogleAnalytics,
    RouteTracker,
    init
};