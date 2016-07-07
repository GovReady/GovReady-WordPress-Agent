import React, { PropTypes as PT } from 'react';
import config from 'config';
import '../../styles/bootstrap-partial.scss';
import '../../styles/core.scss';


// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container govready-container'>
      <div className='view-container container'>
        {config.siteId && children}
        {!config.siteId && (
          <div>
            <h2>Looks like something didn't load properly</h2>
            <p>Please try refreshing the page</p>
          </div>
        )}
        <br />
        <br />
        <p className="well well-sm well-faint text-center">
          <small>Dashboard connected to {config.connectUrl}</small>
        </p>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PT.element
};

export default CoreLayout;
