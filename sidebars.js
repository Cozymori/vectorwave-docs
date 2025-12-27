/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'VectorWave Guide',
      collapsible: false, // 항상 펼쳐둠
      items: [
        'intro',             // 1. 소개
        'getting_started',   // 2. 시작하기 (수정됨: - -> _)
        'core_concepts',     // 3. 핵심 기능 (수정됨: - -> _)
        'advanced_features', // 4. 심화 기능 (수정됨: - -> _)
        'configuration',     // 5. 설정 및 운영
        'reference',         // 6. 참고 자료
      ],
    },
  ],
};

module.exports = sidebars;