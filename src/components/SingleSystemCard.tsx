import { useState } from 'react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import './SingleSystemCard.css';

type SystemCard = {
  title: 'PROMPT' | 'HARNESS' | 'LOOP' | 'MES' | 'MAT' | 'ERP';
  summary: string;
  details: [string, string];
};

const systemCards: SystemCard[] = [
  {
    title: 'PROMPT',
    summary: '如何向 AI 提出清晰的问题。',
    details: [
      'Prompt，也就是提示词工程，解决的是“如何向 AI 提出清晰的问题”。',
      '我学习到，一个好的 Prompt 需要明确 AI 的角色、业务背景、输入数据、任务目标、输出格式，以及哪些内容不能编造、如何验证结果。通过这部分学习，我认识到，AI 的表现不仅取决于模型能力，也取决于人能不能把问题描述清楚。',
    ],
  },
  {
    title: 'HARNESS',
    summary: '为 Agent 准备运行框架与安全边界。',
    details: [
      'Harness 可以理解为 Agent 的运行框架和安全护栏。它负责管理输入输出、工具权限、数据来源、任务状态、错误处理、结果校验以及人工确认节点。',
      '这让我明白，真正可用的 AI 系统不能让模型完全自由发挥，而是要为它准备好合适的数据、工具和边界。',
    ],
  },
  {
    title: 'LOOP',
    summary: '让 Agent 持续执行、检查并修正任务。',
    details: [
      'Loop 指的是 Agent 的任务执行循环。它通常包括理解任务、分析现状、制定计划、调用工具、检查结果、根据反馈调整，最后再交付结果。',
      '通过学习 Loop，我理解到 Agent 不是一次性问答，而是一个持续执行、检查和修正的过程。',
    ],
  },
  {
    title: 'MES',
    summary: '让制造现场的生产执行可视、可追溯。',
    details: [
      'MES，即制造执行系统，连接订单、工艺、设备与人员，让生产过程可视、可控、可追溯。',
      '它面向制造现场，帮助企业掌握计划执行、生产进度、质量记录与设备状态，为柔性制造提供稳定的数据基础。',
    ],
  },
  {
    title: 'MAT',
    summary: '统一管理物料计划、库存与流转。',
    details: [
      'MAT 作为物料管理系统，负责对物料计划、库存、领用、流转和追溯进行统一管理。',
      '它让物料信息随生产过程流动，减少账实不符与等待，帮助现场更准确地保障供料。',
    ],
  },
  {
    title: 'ERP',
    summary: '连接企业经营所需的核心业务数据。',
    details: [
      'ERP，即企业资源计划系统，将采购、库存、生产、财务等核心业务整合在同一套经营管理体系中。',
      '它让部门间的业务数据更连贯，为企业提供计划协同、资源配置与经营决策的基础。',
    ],
  },
];

export function SingleSystemCard() {
  const [expandedTitle, setExpandedTitle] = useState<SystemCard['title'] | null>(null);

  return <div className="system-card-group" aria-label="Agent concepts">
    {expandedTitle && <button className="system-card__backdrop" type="button" aria-label={`收起 ${expandedTitle} 介绍`} onClick={() => setExpandedTitle(null)} />}
    {systemCards.map((card) => {
      const isExpanded = card.title === expandedTitle;

      return <aside key={card.title} className={`system-card${isExpanded ? ' is-expanded' : ''}`} aria-label={`${card.title} explainer card`}>
        <CardContainer className="system-card__tilt">
          <CardBody className="system-card__body">
            <CardItem as="p" translateZ={60} className="system-card__description">{card.summary}</CardItem>
            <CardItem translateZ={50} className="system-card__title">{card.title}</CardItem>
            {isExpanded && <CardItem as="div" translateZ={80} className="system-card__details">
              <p>{card.details[0]}</p>
              <p>{card.details[1]}</p>
            </CardItem>}
            <div className="system-card__actions">
              <CardItem as="button" translateZ={20} type="button" onClick={() => setExpandedTitle(isExpanded ? null : card.title)}>
                {isExpanded ? '收起' : '了解更多'}
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </aside>;
    })}
  </div>;
}
