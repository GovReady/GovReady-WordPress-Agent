import React, { Component, PropTypes } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';

class Vulnerability extends Component {
  render() {
    const { data } = this.props;
    const references = () => {
      if(!data.references || !data.references.url || !data.references.url.length) {
        return '';
      }
      return (
        <div>
          <h6>References</h6>
          <ul>
            {data.references.url.map((reference, index) => (
              <li key={index}>
                <a href={reference} target="_blank">{reference}</a>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="vulnerability">
        <h5>
          {data.title}
        </h5>
        <p><span className="label label-warning pull-left">{data.vuln_type}</span><strong>Fixed in:</strong><span> {data.fixed_in}</span></p>
        {references()}
      </div>
    )  
  }
}

Vulnerability.propTypes = {
  data: PropTypes.object.isRequired
}

class CmsVulnerabilitiesWidget extends Component {

  coreVulnerabilty (core) {
    return !core || !core.vulnerabilities || !core.vulnerabilities.length;
  }

  coreSection (core) {
    if(this.coreVulnerabilty(core)) {
      return (
        <div className="alert alert-success">{this.props.cms} core is up-to-date</div>
      )
    }
    else {
      return (
        <Panel header={this.props.cms} eventKey="0">
          {core.vulnerabilities.map((vulnerability, index) => (
            <Vulnerability data={vulnerability} key={index} />
          ))}
        </Panel>
      )
    }
  }

  render () {
    const indexMod = this.coreVulnerabilty(this.props.core) ? 1 : 0;
    return (
      <div>
        {this.props.header}
        <Accordion>
          {this.coreSection(this.props.core)}
          {this.props.plugins.map((plugin, index) => (
            <Panel header={plugin.name} eventKey={index + indexMod} key={index}>
              {plugin.vulnerabilities.map((vulnerability, j) => (
                <Vulnerability data={vulnerability} key={j} />
              ))}
            </Panel>
          ))}
        </Accordion>
      </div>
    );
  }
}

CmsVulnerabilitiesWidget.propTypes = {
  cms: PropTypes.string.isRequired,
  header: PropTypes.object,
  core: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired
};

export default CmsVulnerabilitiesWidget;
