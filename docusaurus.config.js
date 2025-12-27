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
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // [수정] Edit URL을 GitHub 리포지토리 주소로 맞춤
          editUrl: 'https://github.com/cozymori/vectorwave-docs/tree/main/',
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
            src: 'img/vectorwave_logo.png',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              position: 'left',
              label: 'Docs',
            },
            {
              type: 'localeDropdown', // [추가] 언어 변경 드롭다운 추가
              position: 'right',
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
                { label: 'Getting Started', to: '/docs/getting_started' }, // [수정] 시작하기 -> Getting Started
                { label: 'Core Concepts', to: '/docs/core_concepts' },     // [수정] 핵심 기능 -> Core Concepts
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