import React, { Component, PropTypes } from 'react';

class RecommendedWidget extends Component {

  recommendedList (plugins) {
    return (
      <div className="panel-group" id="collapse-recommended" role="tablist" aria-multiselectable="true">
        {plugins.map((plugin, index) => (
          <div key={index} className="panel panel-default">
            <div className="panel-heading" role="tab" id={'heading-item-' + plugin.namespace}>
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse-item-' + plugin.namespace} aria-expanded="true" aria-controls={'collapse-item-' + plugin.namespace}>
                  <span className={'pull-left ' + plugin.installed ? 'warning' : 'success' } style={ {marginRight: '10px' } }>
                    {plugin.installed && 
                      <i className="fa fa-check-square-o" />
                    }
                    {!plugin.installed && 
                      <i className="fa fa-square-o" />
                    }
                  </span>
                  <span>{plugin.title}</span>
                </a>
              </h4>
            </div>
            <div id={'collapse-item-' + plugin.namespace} className="panel-collapse collapse" role="tabpanel" aria-labelledby={'heading-item-' + plugin.namespace}>
              <div className="panel-body">
                <p>
                  {plugin.free && 
                    <span className="label label-success">Free version</span>
                  }
                  {plugin.paid && 
                    <span className="label label-info">Paid version</span>
                  }
                </p>
                <p>{plugin.description}</p>
              </div>
              <div className="panel-footer">
                <a href={'https://wordpress.org/plugins/' + plugin.namespace}>Plugin page <i className="fa fa-chevron-right" /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.recommendedList(this.props.plugins)}
      </div>
    );
  }
}

RecommendedWidget.propTypes = {
  header: PropTypes.object,
  plugins: PropTypes.array.isRequired
};

export default RecommendedWidget;
