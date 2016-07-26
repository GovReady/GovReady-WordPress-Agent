import React, { Component, PropTypes as PT } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Vulnerability from 'components/Vulnerability';


class CmsVulnerabilitiesWidget extends Component {

  coreVulnerabilty (core) {
    return !core || !core.vulnerabilities || !core.vulnerabilities.length;
  }

  coreSection (core) {
    if(this.coreVulnerabilty(core)) {
      return (
        <div className="alert alert-success">No {this.props.cms} core vulnerabilities.</div>
      )
    }
    else {
      return (
        <Panel header={this.props.cms} eventKey="0">
          {core.vulnerabilities.map((vulnerability, index) => (
            <Vulnerability data={vulnerability} version={core.version} key={index} />
          ))}
        </Panel>
      )
    }
  }

  render () {
    const indexMod = this.coreVulnerabilty(this.props.core) ? 1 : 0;
    console.log(this.props);
    return (
      <div>
        {this.props.header}
        <Accordion>
          {this.coreSection(this.props.core)}
          {this.props.plugins.map((plugin, index) => (
            <Panel header={plugin.label} eventKey={index + indexMod} key={index}>
              {plugin.vulnerabilities.map((vulnerability, j) => (
                <Vulnerability data={vulnerability} version={plugin.version} key={j} />
              ))}
            </Panel>
          ))}
        </Accordion>
      </div>
    );
  }
}

CmsVulnerabilitiesWidget.propTypes = {
  cms: PT.string.isRequired,
  header: PT.object,
  core: PT.object.isRequired,
  plugins: PT.array.isRequired
};

export default CmsVulnerabilitiesWidget;
