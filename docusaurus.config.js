// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'VectorWave',
    tagline: 'Seamless Auto-Vectorization Framework',
    favicon: 'img/favicon.ico',

    url: 'https://cozymori.github.io',
    baseUrl: '/vectorwave-docs/',
    organizationName: 'cozymori',
    projectName: 'vectorwave-docs',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/cozymori/vectorwave/tree/main/docs/',
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: 'VectorWave',
                logo: {
                    alt: 'VectorWave Logo',
                    // [수정 완료] 로고 파일명을 vectorwave_logo.png로 변경했습니다.
                    // static/img 폴더 안에 이 파일이 있어야 합니다.
                    src: 'img/vectorwave_logo.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '가이드',
                    },
                    {
                        href: 'https://github.com/cozymori/vectorwave',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            { label: '시작하기', to: '/docs/getting_started' },
                            { label: '핵심 기능', to: '/docs/core_concepts' },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            { label: 'GitHub Issues', href: 'https://github.com/cozymori/vectorwave/issues' },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} VectorWave. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;