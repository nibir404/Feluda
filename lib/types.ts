export interface Finding {
  id: string;
  confidence: string;
  text: string;
  why: string;
  evidence: string[];
}

export interface Integration {
  name: string;
  description: string;
  icon: string;
}

export interface WorkflowTab {
  id: string;
  label: string;
  context?: string;
  scenario?: string;
  questions: string[];
}