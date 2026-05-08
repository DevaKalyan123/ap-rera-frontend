import React, { useState } from 'react';
import '../styles/AgentChangeRequestPayment.css';
import AgentChangeRequestStepper from '../components/agent_changerequest_steper';

const AgentChangeRequestPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardType, setCardType] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState(null);
  const amount = 5000;

  const heroHighlights = [
    {
      title: '256‑bit TLS',
      detail: 'Encrypted checkout'
    },
    {
      title: 'Instant Verification',
      detail: 'Payment confirmed automatically'
    },
    {
      title: '24/7 Support',
      detail: 'Helpdesk ready whenever you need it'
    }
  ];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: '📱',
      desc: 'Google Pay, PhonePe, Paytm, BHIM & others'
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: '💳',
      desc: 'Visa, Mastercard, RuPay, Amex'
    },
    {
      id: 'netbanking',
      name: 'Instant Netbanking',
      icon: '🏦',
      desc: 'All major bank portals + wallets'
    }
  ];

  const popularUpiApps = [
    {
      name: 'PhonePe',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-phonepe-logo-icon-download-in-svg-png-gif-file-formats--upi-payment-apps-pack-logos-icons-2249157.png'
    },
    {
      name: 'Google Pay',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png'
    },
    {
      name: 'Paytm',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--digital-wallet-payment-apps-pack-logos-icons-2249155.png'
    }
  ];

  const popularWalletsNetbanking = [
    'SBI YONO Business',
    'HDFC NetBanking',
    'ICICI iMobile',
    'Axis Mobile',
    'Kotak 811',
    'Wallets: Mobikwik, JioMoney'
  ];

  const handleProceedToPay = () => {
    if (!selectedMethod) {
      alert('Please select a payment method first.');
      return;
    }

    let message = `Initiating secure payment of ₹${amount.toLocaleString('en-IN')} via ${selectedMethod.name}`;

    if (selectedMethod.id === 'card' && cardType) {
      message += ` (${cardType === 'credit' ? 'Credit' : 'Debit'} Card)`;
    }

    alert(message + '\n\n(Payment gateway integration placeholder – use Razorpay/PayU in production)');
  };

  const toggleMethod = (method) => {
    setSelectedMethod(selectedMethod?.id === method.id ? null : method);
    if (method.id !== 'card') setCardType('');
  };

  return (
    <div className="payment-page">
      <div className="background-glow"></div>
      <div className="payment-shell">
        <AgentChangeRequestStepper activeStep={3} />
        <header className="payment-hero">
          <p className="hero-eyebrow">AP RERA • Agent Services</p>
          <h1>Agent Change Request Payment</h1>
          <p className="hero-subtitle">
            Choose a secure payment option and confirm your request seamlessly.
          </p>
          <div className="hero-highlights">
            {heroHighlights.map((item) => (
              <div key={item.title} className="highlight-pill">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="payment-body">
          <article className="amount-card">
            <div className="amount-header">
              <span className="amount-label">Amount to Pay</span>
              <span className="amount">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            <p className="fee-description">Agent Change Request Fee (Non-refundable)</p>
          </article>

          <div className="methods-section">
            <h2 className="section-title">Choose Payment Method</h2>

            <div className="methods-grid">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-option ${selectedMethod?.id === method.id ? 'selected' : ''}`}
                  onClick={() => toggleMethod(method)}
                >
                  <div className="option-icon">{method.icon}</div>
                  <div className="option-content">
                    <div className="option-name">{method.name}</div>
                    <p className="option-desc">{method.desc}</p>
                  </div>
                  <span className="option-radio">
                    <span className="option-radio-inner" />
                  </span>
                </div>
              ))}
            </div>

            {selectedMethod && (
              <div className="method-details">
                {selectedMethod.id === 'upi' && (
                  <div className="upi-details">
                    <h3>Select UPI App</h3>
                    <div className="upi-apps">
                      {popularUpiApps.map((app) => (
                        <button
                          key={app.name}
                          className={`upi-btn ${selectedUpiApp === app.name ? 'active' : ''}`}
                          onClick={() => setSelectedUpiApp(app.name)}
                        >
                          <img src={app.icon} alt={app.name} />
                          <span>{app.name}</span>
                        </button>
                      ))}
                    </div>
                    {selectedUpiApp && (
                      <button className="pay-button small" onClick={() => alert(`Redirecting to ${selectedUpiApp}...`)}>
                        Pay ₹{amount} with {selectedUpiApp}
                      </button>
                    )}
                  </div>
                )}

                {selectedMethod.id === 'card' && (
                  <div className="card-details">
                    <h3>Select Card Type</h3>
                    <div className="card-type-buttons">
                      <button
                        className={`type-btn ${cardType === 'debit' ? 'active' : ''}`}
                        onClick={() => setCardType('debit')}
                      >
                        Debit Card
                      </button>
                      <button
                        className={`type-btn ${cardType === 'credit' ? 'active' : ''}`}
                        onClick={() => setCardType('credit')}
                      >
                        Credit Card
                      </button>
                    </div>
                    {cardType && (
                      <div className="card-form">
                        <h4>Card Details (Placeholder)</h4>
                        <input type="text" placeholder="Card Number" disabled />
                        <div className="card-row">
                          <input type="text" placeholder="MM/YY" disabled />
                          <input type="text" placeholder="CVV" disabled />
                        </div>
                        <input type="text" placeholder="Name on Card" disabled />
                        <p className="info">You will be redirected to a secure payment gateway (3D Secure).</p>
                      </div>
                    )}
                  </div>
                )}

                {selectedMethod.id === 'netbanking' && (
                  <div className="netbanking-details">
                    <h3>Popular Banks & Wallets</h3>
                    <ul>
                      {popularWalletsNetbanking.map((wallet) => (
                        <li key={wallet}>{wallet}</li>
                      ))}
                    </ul>
                    <p className="info">
                      Pick your bank/wallet → complete the transaction on their secure page.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button className="pay-button" onClick={handleProceedToPay} disabled={!selectedMethod}>
            Pay ₹{amount.toLocaleString('en-IN')} Now
          </button>

          <p className="secure-note">⚡ Secure Payment | All transactions are encrypted and protected.</p>
        </section>
      </div>
    </div>
  );
};

export default AgentChangeRequestPayment;