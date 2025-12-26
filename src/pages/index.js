import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

// 1. 히어로 섹션 (Clean White)
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

// 2. 기능 목록 (아이콘 없이 텍스트 중심)
const FeatureList = [
    {
        title: 'Auto Vectorization',
        description: '데코레이터 한 줄로 코드와 데이터를 자동으로 벡터화합니다.',
    },
    {
        title: 'Semantic Search',
        description: '단순 키워드가 아닌, 코드의 의도와 맥락으로 검색하세요.',
    },
    {
        title: 'Self-Healing',
        description: 'AI가 에러 로그를 분석하여 수정 코드를 제안합니다.',
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

// 3. 코드 데모 (미니멀)
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
                            복잡한 설정은 필요 없습니다.<br/>
                            우리는 오직 <strong>개발자의 생산성</strong>에 집중합니다.
                        </p>
                    </div>

                    <div className="col col--7">
                        {/* 그림자를 옅게 처리하여 깔끔함 강조 */}
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