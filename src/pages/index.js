import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

// 1. Hero Section (Clean White)
function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', 'heroBanner')}>
            <div className="container">
                <h1 className="heroTitle">{siteConfig.title}</h1>
                <p className="hero__subtitle" style={{color: '#4b5563', fontWeight: 500, fontSize: '1.25rem', marginBottom: '3rem'}}>
                    {siteConfig.tagline}
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--primary button--lg"
                        to="/docs/getting_started">
                        Get Started
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        style={{marginLeft: '12px'}}
                        to="/docs/intro">
                        Documentation
                    </Link>
                </div>
            </div>
        </header>
    );
}

// 2. Feature List (Text-centric without icons)
const FeatureList = [
    {
        title: 'Auto Vectorization',
        description: 'Automatically vectorizes code and data with a single decorator.',
    },
    {
        title: 'Semantic Search',
        description: 'Search by intent and context, not just simple keywords.',
    },
    {
        title: 'Self-Healing',
        description: 'AI analyzes error logs and suggests code patches.',
    },
];

function Feature({title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="card margin-bottom--lg" style={{padding: '1.5rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827'}}>{title}</h3>
                <p style={{color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, margin: 0}}>{description}</p>
            </div>
        </div>
    );
}

function HomepageFeatures() {
    return (
        <section style={{padding: '6rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #f3f4f6'}}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// 3. Code Demo (Minimal)
function CodeDemo() {
    return (
        <section style={{padding: '6rem 0', backgroundColor: '#f9fafb'}}>
            <div className="container">
                <div className="row" style={{alignItems: 'center'}}>
                    <div className="col col--5">
                        <h2 style={{fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2}}>
                            Simple.<br/>Powerful.
                        </h2>
                        <p style={{fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8}}>
                            No complex configuration needed.<br/>
                            We focus solely on <strong>developer productivity</strong>.
                        </p>
                    </div>

                    <div className="col col--7">
                        {/* Light shadow for cleanliness */}
                        <div style={{boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb'}}>
                            <CodeBlock language="python" title="Clean & Simple">
                                {`@vectorize
def process_data(data):
    """
    This function is now:
    1. Searchable
    2. Traceable
    3. Recoverable
    """
    return clean(data)`}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Clean Auto-Vectorization Framework">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <CodeDemo />
            </main>
        </Layout>
    );
}