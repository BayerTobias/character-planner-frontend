export interface NodeData {
  id: number;
  skill: number;
  nodes_skilled: number;
}

export class SkilledNode {
  id: number;
  skillId: number;
  nodesSkilled: number;

  constructor(data: NodeData) {
    this.id = data.id || -1;
    this.skillId = data.skill || -1;
    this.nodesSkilled = data.nodes_skilled || 0;
  }
}
