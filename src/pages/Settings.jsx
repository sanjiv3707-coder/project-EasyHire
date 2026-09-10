export default function Settings() {
  return (
    <div className="settings-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Application Settings</h2>
        </div>
        <div className="card-body">
          <div className="settings-section">
            <h3>Profile Settings</h3>
            <form className="settings-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input id="name" className="form-input" defaultValue="Sanjay Mehta" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" className="form-input" defaultValue="sanjay@easyhire.com" />
              </div>
              <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Save Profile
              </button>
            </form>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-100)', margin: 'var(--space-8) 0' }} />
          
          <div className="settings-section">
            <h3>Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <label className="form-checkbox-group">
                <input type="checkbox" className="form-checkbox" defaultChecked />
                <span>Email me when a candidate is Client Ready</span>
              </label>
              <label className="form-checkbox-group">
                <input type="checkbox" className="form-checkbox" defaultChecked />
                <span>Email me when an assessment is flagged for suspicious activity</span>
              </label>
              <label className="form-checkbox-group">
                <input type="checkbox" className="form-checkbox" />
                <span>Daily summary report</span>
              </label>
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: 'var(--space-5)' }}>
              Save Preferences
            </button>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-100)', margin: 'var(--space-8) 0' }} />
          
          <div className="settings-section">
            <h3>SNS Workbench Integration</h3>
            <p className="text-small text-muted" style={{ marginBottom: 'var(--space-4)' }}>
              Configure webhooks and API keys for the SNS Workbench workflow engine.
            </p>
            <form className="settings-form">
              <div className="form-group">
                <label className="form-label" htmlFor="webhookUrl">Webhook URL</label>
                <input id="webhookUrl" className="form-input" placeholder="https://api.sns-workbench.example.com/webhook" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="apiKey">API Key</label>
                <input id="apiKey" type="password" className="form-input" placeholder="************************" />
              </div>
              <button type="button" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} disabled>
                Connect (Coming Soon)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
