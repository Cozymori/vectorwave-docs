import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

// SVG Icons
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
);

const DatabaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
        <path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const WaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M2 17c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M12 12c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M12 17c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M2 7c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
        <path d="M12 7c.6-.5 1.2-1 2.5-1 2.5 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/>
    </svg>
);

const SurferIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

// Wave Background Component
function WaveBackground() {
    return (
        <div className={styles.waveBackground}>
            <svg className={styles.waveSvg} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0066ff" stopOpacity="0.3"/>
                        <stop offset="50%" stopColor="#0099ff" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#00ccff" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0044cc" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#0088ff" stopOpacity="0.05"/>
                    </linearGradient>
                </defs>
                <path className={styles.wave1} fill="url(#waveGrad1)"
                      d="M0,400 C150,350 350,450 500,400 C650,350 750,300 900,350 C1050,400 1200,450 1440,400 L1440,800 L0,800 Z"/>
                <path className={styles.wave2} fill="url(#waveGrad2)"
                      d="M0,500 C200,450 400,550 600,500 C800,450 1000,400 1200,450 C1350,480 1400,500 1440,500 L1440,800 L0,800 Z"/>
                <path className={styles.wave3} fill="url(#waveGrad1)" style={{opacity: 0.3}}
                      d="M0,600 C180,550 380,650 580,600 C780,550 980,500 1180,550 C1300,580 1380,600 1440,600 L1440,800 L0,800 Z"/>
            </svg>
            <div className={styles.gridOverlay}></div>
        </div>
    );
}

// Code Window Component
function CodeWindow() {
    const [copied, setCopied] = useState(false);

    const codeContent = `from vectorwave import vectorize

@vectorize(
    collection="documents",
    cache=True,
    trace=True
)
def process_document(text: str) -> dict:
    """Your logic here - we handle the rest."""
    return {"content": text, "processed": True}

# That's it. Auto-vectorization enabled. ✨`;

    const copyCode = () => {
        navigator.clipboard.writeText(codeContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.codeWindow}>
            <div className={styles.codeWindowHeader}>
                <div className={styles.windowDots}>
                    <span className={styles.dotRed}></span>
                    <span className={styles.dotYellow}></span>
                    <span className={styles.dotGreen}></span>
                </div>
                <span className={styles.fileName}>example.py</span>
                <button className={styles.copyBtn} onClick={copyCode}>
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <pre className={styles.codeContent}>
        <code>
          <span className={styles.keyword}>from</span> <span className={styles.module}>vectorwave</span> <span className={styles.keyword}>import</span> <span className={styles.function}>vectorize</span>{'\n\n'}
            <span className={styles.decorator}>@vectorize</span>({'\n'}
            {'    '}<span className={styles.param}>collection</span>=<span className={styles.string}>"documents"</span>,{'\n'}
            {'    '}<span className={styles.param}>cache</span>=<span className={styles.boolean}>True</span>,{'\n'}
            {'    '}<span className={styles.param}>trace</span>=<span className={styles.boolean}>True</span>{'\n'}
            ){'\n'}
            <span className={styles.keyword}>def</span> <span className={styles.functionName}>process_document</span>(<span className={styles.param}>text</span>: <span className={styles.type}>str</span>) -&gt; <span className={styles.type}>dict</span>:{'\n'}
            {'    '}<span className={styles.docstring}>"""Your logic here - we handle the rest."""</span>{'\n'}
            {'    '}<span className={styles.keyword}>return</span> {'{'}<span className={styles.string}>"content"</span>: text, <span className={styles.string}>"processed"</span>: <span className={styles.boolean}>True</span>{'}'}{'\n\n'}
            <span className={styles.comment}># That's it. Auto-vectorization enabled. ✨</span>
        </code>
      </pre>
            <div className={styles.codeGlow}></div>
        </div>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.featureIconWrap} style={{ background: gradient }}>
                {icon}
            </div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDesc}>{description}</p>
            <div className={styles.featureCardGlow}></div>
        </div>
    );
}

// Ecosystem Node Component
function EcosystemNode({ icon, name, description, isCenter }) {
    return (
        <div className={`${styles.ecosystemNode} ${isCenter ? styles.centerNode : ''}`}>
            <div className={styles.nodeIcon}>{icon}</div>
            <h4 className={styles.nodeName}>{name}</h4>
            <p className={styles.nodeDesc}>{description}</p>
        </div>
    );
}

// Main Home Component
export default function Home() {
    return (
        <Layout
            title="VectorWave - Seamless Auto-Vectorization Framework"
            description="Add @vectorize decorator to auto-enable Vector DB storage, semantic caching, and distributed tracing.">

            {/* Hero Section */}
            <header className={styles.hero}>
                <WaveBackground />
                <div className={styles.heroContent}>
                    <div className={styles.heroTag}>
                        <span className={styles.tagIcon}>⚡</span>
                        Open Source Python Framework
                    </div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleGradient}>Seamless</span>
                        <br />
                        Auto-Vectorization
                        <br />
                        <span className={styles.titleAccent}>Framework</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Add one decorator. Get Vector DB storage, semantic caching,
                        and distributed tracing — automatically.
                    </p>
                    <div className={styles.heroCta}>
                        <Link className={styles.primaryBtn} to="/docs/intro">
                            Get Started
                            <ArrowRightIcon />
                        </Link>
                        <Link className={styles.secondaryBtn} to="https://github.com/vectorwave/vectorwave">
                            <GithubIcon />
                            GitHub
                        </Link>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>10k+</span>
                            <span className={styles.statLabel}>GitHub Stars</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>500k+</span>
                            <span className={styles.statLabel}>Monthly Downloads</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>99.9%</span>
                            <span className={styles.statLabel}>Uptime SLA</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroCode}>
                    <CodeWindow />
                </div>
            </header>

            <main className={styles.main}>
                {/* Features Section */}
                <section className={styles.features}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTag}>CORE FEATURES</span>
                        <h2 className={styles.sectionTitle}>
                            Everything you need for
                            <span className={styles.gradientText}> intelligent vectorization</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Built for AI engineers who want to ship faster without sacrificing quality.
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <FeatureCard
                            icon={<FileTextIcon />}
                            title="AI Documentation"
                            description="Automatically generate embeddings and store in your preferred Vector DB. Supports Pinecone, Weaviate, Qdrant, and more."
                            gradient="linear-gradient(135deg, #0066ff 0%, #00ccff 100%)"
                        />
                        <FeatureCard
                            icon={<DatabaseIcon />}
                            title="Semantic Caching"
                            description="Intelligent cache layer that understands context. Reduce redundant computations by up to 80% with similarity-based retrieval."
                            gradient="linear-gradient(135deg, #00ccff 0%, #00ffcc 100%)"
                        />
                        <FeatureCard
                            icon={<ActivityIcon />}
                            title="Distributed Tracing"
                            description="Full observability out of the box. Track every vectorization call with OpenTelemetry-compatible spans and metrics."
                            gradient="linear-gradient(135deg, #6600ff 0%, #0066ff 100%)"
                        />
                    </div>
                </section>

                {/* Ecosystem Section */}
                <section className={styles.ecosystem}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTag}>ECOSYSTEM</span>
                        <h2 className={styles.sectionTitle}>
                            Intelligent
                            <span className={styles.gradientText}> Workflow</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            Three powerful tools working together seamlessly.
                        </p>
                    </div>

                    <div className={styles.ecosystemVisual}>
                        <div className={styles.ecosystemNodes}>
                            <EcosystemNode
                                icon={<WaveIcon />}
                                name="VectorWave"
                                description="Core vectorization engine with decorator-based API"
                            />
                            <EcosystemNode
                                icon={<SurferIcon />}
                                name="VectorSurfer"
                                description="Interactive exploration and visualization dashboard"
                                isCenter
                            />
                            <EcosystemNode
                                icon={<CheckIcon />}
                                name="VectorCheck"
                                description="Testing and validation toolkit for vector quality"
                            />
                        </div>
                    </div>

                    <div className={styles.workflowSteps}>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>01</span>
                            <h4>Vectorize</h4>
                            <p>Decorate your functions with @vectorize</p>
                        </div>
                        <div className={styles.stepArrow}>→</div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>02</span>
                            <h4>Explore</h4>
                            <p>Visualize and navigate your vector space</p>
                        </div>
                        <div className={styles.stepArrow}>→</div>
                        <div className={styles.step}>
                            <span className={styles.stepNumber}>03</span>
                            <h4>Validate</h4>
                            <p>Ensure quality with automated testing</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>
                            Ready to <span className={styles.gradientText}>ride the wave</span>?
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            Start building intelligent, vectorized applications in minutes.
                        </p>
                        <div className={styles.ctaCode}>
                            <code>pip install vectorwave</code>
                        </div>
                        <div className={styles.ctaButtons}>
                            <Link className={styles.primaryBtn} to="/docs/intro">
                                Read the Docs
                                <ArrowRightIcon />
                            </Link>
                            <Link className={styles.secondaryBtn} to="/docs/intro">
                                Quick Start Guide
                            </Link>
                        </div>
                    </div>
                    <div className={styles.ctaGlow}></div>
                </section>
            </main>
        </Layout>
    );
}