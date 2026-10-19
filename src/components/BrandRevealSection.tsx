import { useState, type CSSProperties } from 'react';
import './BrandRevealSection.css';

type WordTier = 'core' | 'product' | 'direction' | 'brand' | 'technology';

const positions = [
  [18, 17], [49, 9], [79, 16], [9, 38], [91, 39], [16, 76], [79, 82],
  [34, 25], [65, 26], [37, 73], [62, 72], [21, 55], [80, 55], [50, 18], [47, 82], [5, 58], [95, 60], [53, 92],
  [30, 7], [68, 7], [5, 26], [95, 28], [27, 92], [74, 92], [3, 72], [97, 73], [49, 4],
  [50, 96], [5, 15], [94, 13], [5, 85], [95, 86],
  [17, 31], [82, 30], [14, 67], [86, 68], [34, 94], [66, 94],
];

const words: Array<{ label: string; tier: WordTier }> = [
  { label: '毕博智联', tier: 'core' },
  { label: '柔性MES', tier: 'core' },
  { label: '制造业数字化转型', tier: 'core' },
  { label: '智能制造', tier: 'core' },
  { label: '工业AI', tier: 'core' },
  { label: '智能工厂', tier: 'core' },
  { label: '生产执行系统', tier: 'core' },
  { label: 'WMS', tier: 'product' },
  { label: 'SCADA', tier: 'product' },
  { label: 'PFMEA', tier: 'product' },
  { label: '数字化双胞胎', tier: 'product' },
  { label: '工业互联网', tier: 'product' },
  { label: '物联网', tier: 'product' },
  { label: '大数据', tier: 'product' },
  { label: '数据采集', tier: 'product' },
  { label: '质量追溯', tier: 'product' },
  { label: '智能终端', tier: 'product' },
  { label: '企业数字化解决方案', tier: 'product' },
  { label: '高新技术企业申报', tier: 'direction' },
  { label: 'AI智能体', tier: 'direction' },
  { label: '工业软件', tier: 'direction' },
  { label: '精益制造', tier: 'direction' },
  { label: '中小企业数智升级', tier: 'direction' },
  { label: '生产管理', tier: 'direction' },
  { label: '智能决策', tier: 'direction' },
  { label: '业务自动化', tier: 'direction' },
  { label: '数字中台', tier: 'direction' },
  { label: '洞察为始·落地为证', tier: 'brand' },
  { label: '智改数转', tier: 'brand' },
  { label: '数据驱动智造', tier: 'brand' },
  { label: '数字化落地', tier: 'brand' },
  { label: '浙江杭州', tier: 'brand' },
  { label: 'MES实施', tier: 'technology' },
  { label: '低代码', tier: 'technology' },
  { label: '生产透明化', tier: 'technology' },
  { label: '流程优化', tier: 'technology' },
  { label: '工业大数据', tier: 'technology' },
  { label: '制造AI应用', tier: 'technology' },
];

export function BrandRevealSection() {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <section
      id="brand"
      className="brand-reveal"
      aria-label="BIBO Intelligence"
    >
      <div className={`brand-word-cloud${logoHovered ? ' is-visible' : ''}`} aria-hidden="true">
        {words.map(({ label, tier }, index) => {
          const [x, y] = positions[index];
          return <span className={`brand-word brand-word--${tier}`} key={label} style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties}>{label}</span>;
        })}
      </div>
      <div
        className="brand-logo-lockup"
        onPointerEnter={() => setLogoHovered(true)}
        onPointerLeave={() => setLogoHovered(false)}
      >
        <img src="/bibo-logo.jpg" alt="BIBO 毕博智联" />
      </div>
    </section>
  );
}
