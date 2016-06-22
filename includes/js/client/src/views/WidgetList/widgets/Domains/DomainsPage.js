import React, { Component, PropTypes as PT } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';

class DomainsPage extends Component {

  render () {
    return (
      <div>
        {this.props.header}
        <h3>Domains</h3>
        <div className='domains'>
          {this.props.domains.map((domain, index) => (
            <div key={index}>
              <p><strong>Domain:</strong><span> {domain.domain}</span></p>
              <p><strong>Expires:</strong><span>  {domain.expires}</span></p>
              <Accordion>
                <Panel header="Show whois record" eventKey={'whois-' + index}>
                  <pre>{domain.whois}</pre>
                </Panel>
              </Accordion>
            </div>
          ))}
        </div>
        <div>
          <h3>SSL</h3>
          {!this.props.ssl.domain && (
            <p className="alert alert-danger">No SSL active</p>
          )}
          {this.props.ssl.domain && (
            <div>
              <p><strong>Domain:</strong><span>  {this.props.ssl.domain}</span></p>
              <p><strong>Expires:</strong><span>  {this.props.ssl.expires}</span></p>
              <p><strong>Issued by:</strong><span>  {this.props.ssl.issuedBy}</span></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DomainsPage.propTypes = {
  header: PT.object.isRequired,
  domains: PT.array.isRequired,
  ssl: PT.object.isRequired
};

export default DomainsPage;
