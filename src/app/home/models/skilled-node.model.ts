export interface NodeData {
  id: number;
  skill: number;
  nodes_skilled: number;
}

export class SkilledNode {
  id: number | null;
  skillId: number;
  nodesSkilled: number;

  constructor(data: NodeData) {
    this.id = data.id || -1;
    this.skillId = data.skill || -1;
    this.nodesSkilled = data.nodes_skilled || 0;
  }

  asJson() {
    return {
      id: this.id,
      skillId: this.skillId,
      nodesSkilled: this.nodesSkilled,
    };
  }
}
