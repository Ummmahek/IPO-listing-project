import React from 'react';

export default function About() {
    const faqs = [
        {
            question: "What is an IPO?",
            answer: "An Initial Public Offering (IPO) is when a private company becomes public by selling shares to investors. It's a way for companies to raise capital and allow public trading of their shares."
        },
        {
            question: "What are the types of IPOs?",
            answer: "There are two main types: Fixed Price Issue (where price is predetermined) and Book Building Issue (where price is determined through bidding within a price band)."
        },
        {
            question: "Who can invest in an IPO?",
            answer: "There are three main categories: RII (Retail Individual Investors) with max ₹2 lakh investment, NII (Non-Institutional Investors), and QIB (Qualified Institutional Bidders)."
        },
        {
            question: "How long does an IPO stay open?",
            answer: "IPOs typically remain open for 3-7 days, with a maximum of 10 working days as per SEBI guidelines."
        },
        {
            question: "What is ASBA?",
            answer: "ASBA (Applications Supported by Blocked Amount) is a process where your bank account is blocked for the IPO amount until allotment, rather than paying upfront."
        }
    ];

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{
                color: '#2c3e50',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>About IPOs</h1>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{
                    color: '#2c3e50',
                    marginBottom: '1.5rem'
                }}>Frequently Asked Questions</h2>

                {faqs.map((faq, index) => (
                    <div key={index} style={{
                        marginBottom: '2rem',
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{
                            color: '#2c3e50',
                            marginBottom: '0.5rem'
                        }}>{faq.question}</h3>
                        <p style={{
                            color: '#666',
                            lineHeight: '1.6'
                        }}>{faq.answer}</p>
                    </div>
                ))}

                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#e8f4f8',
                    borderRadius: '8px'
                }}>
                    <h3 style={{
                        color: '#2c3e50',
                        marginBottom: '1rem'
                    }}>Important Note</h3>
                    <p style={{
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        This is a simplified overview of IPOs. Always consult with financial advisors and read the IPO prospectus carefully before investing. Past performance is not indicative of future results.
                    </p>
                </div>
            </div>
        </div>
    );
} 