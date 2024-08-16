export interface NodeData {
  id: number;
  skill: string;
  nodes_skilled: number;
}

export class SkilledNode {
  id: number;
  skillId: string;
  nodesSkilled: number;

  constructor(data: NodeData) {
    this.id = data.id || -1;
    this.skillId = data.skill || '';
    this.nodesSkilled = data.nodes_skilled || 0;
  }
}
