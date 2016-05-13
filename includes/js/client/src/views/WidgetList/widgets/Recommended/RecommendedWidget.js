import React, { Component, PropTypes } from 'react';
import {Accordion, Panel} from 'react-bootstrap';

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
                <a href={'https://wordpress.org/plugins/' + plugin.namespace}>{this.props.plugText} page <i className="fa fa-chevron-right" /></a>
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
  plugText: PropTypes.string.isRequired,
  header: PropTypes.object,
  plugins: PropTypes.array.isRequired
};

export default RecommendedWidget;
