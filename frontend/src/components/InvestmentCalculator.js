import React, { useState } from 'react';

export default function InvestmentCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [issuePrice, setIssuePrice] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('1');
  const [marginFunding, setMarginFunding] = useState(false);
  const [marginAmount, setMarginAmount] = useState('');
  const [marginRate, setMarginRate] = useState('12');
  const [showExplanation, setShowExplanation] = useState(false);

  const calculateReturns = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const price = parseFloat(issuePrice) || 0;
    const listing = parseFloat(listingPrice) || 0;
    const margin = parseFloat(marginAmount) || 0;
    const rate = parseFloat(marginRate) || 0;

    // Calculate number of shares
    const shares = Math.floor(amount / price);
    
    // Calculate listing gains
    const listingGains = (listing - price) * shares;
    
    // Calculate margin interest if applicable
    const marginInterest = marginFunding ? (margin * rate / 100) / 12 : 0;
    
    // Calculate tax implications
    const shortTermTax = holdingPeriod <= 1 ? listingGains * 0.15 : 0;
    const longTermTax = holdingPeriod > 1 ? listingGains * 0.10 : 0;
    
    // Calculate net returns
    const netReturns = listingGains - shortTermTax - longTermTax - marginInterest;
    
    // Calculate ROI
    const roi = ((netReturns / amount) * 100).toFixed(2);

    return {
      shares,
      listingGains,
      marginInterest,
      shortTermTax,
      longTermTax,
      netReturns,
      roi
    };
  };

  const results = calculateReturns();

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          color: '#2c3e50',
          margin: 0,
          fontSize: '1.5rem',
          fontFamily: "'Poppins', sans-serif"
        }}>
          IPO Investment Calculator
        </h2>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
        </button>
      </div>

      {showExplanation && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
            How Calculations Are Made
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>1. Number of Shares</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Formula:</strong> Investment Amount ÷ Issue Price
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> If you invest ₹100,000 at an issue price of ₹1,000, you get 100 shares
            </p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>2. Listing Gains</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Formula:</strong> (Listing Price - Issue Price) × Number of Shares
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> If listing price is ₹1,200, gains = (₹1,200 - ₹1,000) × 100 = ₹20,000
            </p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>3. Tax Calculations</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Short-term Capital Gains (≤ 1 year):</strong> 15% of listing gains
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Long-term Capital Gains (> 1 year):</strong> 10% of listing gains
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> For ₹20,000 gains, short-term tax = ₹3,000 (15%)
            </p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>4. Margin Funding</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Monthly Interest:</strong> (Margin Amount × Interest Rate) ÷ 12
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> For ₹50,000 margin at 12% p.a., monthly interest = ₹500
            </p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>5. Net Returns</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Formula:</strong> Listing Gains - Tax - Margin Interest
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> ₹20,000 - ₹3,000 - ₹500 = ₹16,500
            </p>
          </div>

          <div>
            <h4 style={{ color: '#34495e', marginBottom: '10px' }}>6. Return on Investment (ROI)</h4>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Formula:</strong> (Net Returns ÷ Investment Amount) × 100
            </p>
            <p style={{ color: '#666', margin: '5px 0' }}>
              <strong>Example:</strong> (₹16,500 ÷ ₹100,000) × 100 = 16.5%
            </p>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f4f8',
            borderRadius: '5px',
            border: '1px solid #bde0fe'
          }}>
            <p style={{ color: '#2c3e50', margin: 0, fontSize: '0.9rem' }}>
              <strong>Note:</strong> These calculations are for illustrative purposes. Actual returns may vary based on market conditions, brokerage charges, and other factors. Please consult a financial advisor for investment decisions.
            </p>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
            Investment Amount (₹)
          </label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
            Issue Price (₹)
          </label>
          <input
            type="number"
            value={issuePrice}
            onChange={(e) => setIssuePrice(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
            Expected Listing Price (₹)
          </label>
          <input
            type="number"
            value={listingPrice}
            onChange={(e) => setListingPrice(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
            Holding Period (Years)
          </label>
          <select
            value={holdingPeriod}
            onChange={(e) => setHoldingPeriod(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="1">1 Year or Less</option>
            <option value="2">More than 1 Year</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <input
            type="checkbox"
            checked={marginFunding}
            onChange={(e) => setMarginFunding(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          <label style={{ color: '#34495e' }}>Use Margin Funding</label>
        </div>

        {marginFunding && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
                Margin Amount (₹)
              </label>
              <input
                type="number"
                value={marginAmount}
                onChange={(e) => setMarginAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#34495e' }}>
                Margin Rate (% per annum)
              </label>
              <input
                type="number"
                value={marginRate}
                onChange={(e) => setMarginRate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
          Calculation Results
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Number of Shares</div>
            <div style={{ color: '#2c3e50', fontWeight: '500' }}>{results.shares}</div>
          </div>
          
          <div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Listing Gains</div>
            <div style={{ 
              color: results.listingGains >= 0 ? '#27ae60' : '#e74c3c',
              fontWeight: '500'
            }}>
              ₹{results.listingGains.toFixed(2)}
            </div>
          </div>
          
          {marginFunding && (
            <div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Margin Interest</div>
              <div style={{ color: '#e74c3c', fontWeight: '500' }}>
                ₹{results.marginInterest.toFixed(2)}
              </div>
            </div>
          )}
          
          <div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Tax Amount</div>
            <div style={{ color: '#e74c3c', fontWeight: '500' }}>
              ₹{(results.shortTermTax + results.longTermTax).toFixed(2)}
            </div>
          </div>
          
          <div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>Net Returns</div>
            <div style={{ 
              color: results.netReturns >= 0 ? '#27ae60' : '#e74c3c',
              fontWeight: '500'
            }}>
              ₹{results.netReturns.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div style={{ color: '#666', fontSize: '0.9rem' }}>ROI</div>
            <div style={{ 
              color: results.roi >= 0 ? '#27ae60' : '#e74c3c',
              fontWeight: '500'
            }}>
              {results.roi}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 