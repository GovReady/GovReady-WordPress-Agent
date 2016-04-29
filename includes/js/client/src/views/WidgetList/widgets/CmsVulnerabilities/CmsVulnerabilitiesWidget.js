import React, { Component, PropTypes } from 'react';

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

class CmsVulnerabilities extends Component {

  coreSection (core) {
    if(!core || !core.vulnerabilities || !core.vulnerabilities.length) {
      return (
        <div className="alert alert-success">Wordpress core is up-to-date</div>
      )
    }
    else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id={'heading-item-core'}>
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse-item-core'} aria-expanded="true" aria-controls={'collapse-item-core'}>
                {core.application}
              </a>
            </h4>
          </div>
          <div id={'collapse-item-core'} className="panel-collapse collapse" role="tabpanel" aria-labelledby={'collapse-item-core'}>
            <div className="panel-body">
              {core.vulnerabilities.map((vulnerability, index) => (
                <Vulnerability data={vulnerability} key={index} />
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        {this.props.header}
        <div className="panel-group" id="collapse-cms-vulnerable" role="tablist" aria-multiselectable="true">
          {this.coreSection(this.props.core)}
          {this.props.plugins.map((plugin, index) => (
            <div key={index} className="panel panel-default">
              <div className="panel-heading" role="tab" id={'heading-item-' + plugin.name}>
                <h4 className="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#collapse-item-' + plugin.name} aria-expanded="true" aria-controls={'collapse-item-' + plugin.name}>
                    {plugin.name}
                  </a>
                </h4>
              </div>
              <div id={'collapse-item-' + plugin.name} className="panel-collapse collapse" role="tabpanel" aria-labelledby={'heading-item-' + plugin.name}>
                <div className="panel-body">
                  {plugin.vulnerabilities.map((vulnerability, j) => (
                    <Vulnerability data={vulnerability} key={j} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CmsVulnerabilities.propTypes = {
  header: PropTypes.object,
  core: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired
};

export default CmsVulnerabilities;
