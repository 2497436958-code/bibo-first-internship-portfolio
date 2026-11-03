export type AgentSystem = {
  id: 'mes' | 'inspection' | 'meeting' | 'high-tech';
  title: string;
  command: string;
  url: string;
  colour: string;
  /** Shell command that brings this local agent system online. */
  startHint: string;
};

export const agentSystems: AgentSystem[] = [
  {
    id: 'mes',
    title: 'MES Agent',
    command: 'open mes',
    url: 'http://127.0.0.1:5173/',
    colour: '#bb4b5b',
    startHint: 'cd ~/Desktop/AI\\ agent/02_MES_Agent/frontend && npm run dev -- --strictPort --port 5173',
  },
  {
    id: 'inspection',
    title: 'Equipment Inspection',
    command: 'open inspection',
    url: 'http://127.0.0.1:8001/',
    colour: '#519579',
    startHint: 'cd ~/Desktop/AI\\ agent/01_设备点检Agent && API_PORT=8001 python3 api_server.py',
  },
  {
    id: 'meeting',
    title: 'Meeting Agent',
    command: 'open meeting',
    url: 'http://127.0.0.1:8000/',
    colour: '#547ac7',
    startHint: 'cd ~/Desktop/AI\\ agent/03_meeting-agent/backend && PATH="$PWD/../frontend/node_modules/.bin:$PATH" ALEMBIC_SKIP=1 ./.venv/bin/python -m uvicorn app.main:app --port 8000',
  },
  {
    id: 'high-tech',
    title: 'High-Tech Enterprise',
    command: 'open high-tech',
    url: 'http://127.0.0.1:3000/',
    colour: '#8c69ad',
    startHint: 'cd ~/Documents/ChatGPT/重点专精特长企业/frontend && npm run dev -- --port 3000 --host 127.0.0.1 --strictPort'
        + '  # 前端；后端另开: cd ~/Documents/ChatGPT/重点专精特长企业 && uvicorn backend.app:app --host 127.0.0.1 --port 8004',
  },
];
