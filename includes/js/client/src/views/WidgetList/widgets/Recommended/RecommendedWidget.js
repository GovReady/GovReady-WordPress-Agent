import React, { Component, PropTypes } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';

class RecommendedWidget extends Component {

  recommendedList (plugins) {
    return (
      <Accordion>
        {plugins.map((plugin, index) => {
          const header = () => {
            return (
              <span>
                <span className={'pull-left ' + plugin.installed ? 'warning' : 'success' } style={ {marginRight: '10px' } }>
                  {plugin.installed && 
                    <i className="fa fa-check-square-o" />
                  }
                  {!plugin.installed && 
                    <i className="fa fa-square-o" />
                  }
                </span>
                <span>{plugin.title}</span>
              </span>
            )
          }
          return (
            <Panel header={header()} eventKey={index} key={index}>
              <p>
                {plugin.free && 
                  <span className="label label-success">Free version</span>
                }
                {plugin.paid && 
                  <span className="label label-info">Paid version</span>
                }
              </p>
              <p>{plugin.description}</p>
              <hr />
              <div>
                <a href={this.props.pluginUrl + plugin.namespace}>{this.props.pluginText} page <i className="fa fa-chevron-right" /></a>
              </div>
            </Panel>
          )
        })}
      </Accordion>
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
  pluginText: PropTypes.string.isRequired,
  pluginUrl: PropTypes.string.isRequired,
  header: PropTypes.object,
  plugins: PropTypes.array.isRequired
};

export default RecommendedWidget;
