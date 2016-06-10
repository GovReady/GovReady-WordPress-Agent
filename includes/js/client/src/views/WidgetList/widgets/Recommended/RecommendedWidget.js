import React, { Component, PropTypes as PT } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';

class RecommendedWidget extends Component {

  recommendedList (plugins) {

    const header = (plugin) => {
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
      <Accordion>
        {plugins.map((plugin, index) => {
          return (
            <Panel header={header(plugin)} eventKey={index} key={index}>
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
  pluginText: PT.string.isRequired,
  pluginUrl: PT.string.isRequired,
  header: PT.object,
  plugins: PT.array.isRequired
};

export default RecommendedWidget;
