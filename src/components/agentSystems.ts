export type AgentSystem = {
  id: 'mes' | 'inspection' | 'meeting' | 'high-tech';
  title: string;
  command: string;
  url: string;
  colour: string;
};

export const agentSystems: AgentSystem[] = [
  { id: 'mes', title: 'MES Agent', command: 'open mes', url: 'http://127.0.0.1:5173/', colour: '#bb4b5b' },
  { id: 'inspection', title: 'Equipment Inspection', command: 'open inspection', url: 'http://127.0.0.1:8001/', colour: '#519579' },
  { id: 'meeting', title: 'Meeting Agent', command: 'open meeting', url: 'http://127.0.0.1:8000/', colour: '#547ac7' },
  { id: 'high-tech', title: 'High-Tech Enterprise', command: 'open high-tech', url: 'http://127.0.0.1:3000/', colour: '#8c69ad' },
];
