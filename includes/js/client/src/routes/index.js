import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import AccessDenied from 'components/AccessDenied'; 
import EmptyPage from 'components/EmptyPage'; 
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import SiteState from 'views/SiteState';
import WidgetList from 'views/WidgetList/WidgetList';
import WidgetPage from 'views/WidgetList/WidgetPage';
import { SITE_LOADED, sitePre, isSiteLoaded } from 'redux/modules/siteReducer';

export default (store) => {

  const requireSiteInit = (nextState, replace, cb) => {
    function checkInit() {
      // Still not working, so redirect
      if (!isSiteLoaded(store.getState())) {
        replace('/');
      }
      cb();
    }
    // Not loaded, try to dispatch before redirect
    if(!isSiteLoaded(store.getState())) {
      store.dispatch(sitePre()).then(checkInit);
    }
    else{
      cb();
    }
  };

  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={SiteState} />
      { /* Routes requiring init */ }
      <Route onEnter={requireSiteInit}>
        <Route path="/dashboard" component={WidgetList}/>
        <Route path="/dashboard/:widget" component={WidgetPage}/>
        <Route path="/dashboard/:widget/:individual" component={WidgetPage}/>
        <Route path="/dashboard/:widget/:individual/:view" component={WidgetPage}/>
      </Route>
      <Route path="/reload" component={AccessDenied} />
      { /* Catch all route */ }
      <Route path="*" component={EmptyPage} status={404} />
    </Route>
  )
};
