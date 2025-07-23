export interface NodeData {
  id: number | null;
  skill: number;
  nodes_skilled: number;
}

export class SkilledNode {
  id: number | null;
  skillId: number;
  nodesSkilled: number;

  constructor(data: NodeData) {
    this.id = data.id || null;
    this.skillId = data.skill || -1;
    this.nodesSkilled = data.nodes_skilled || 0;
  }

  asJson() {
    return {
      id: this.id,
      skill_id: this.skillId,
      nodes_skilled: this.nodesSkilled,
    };
  }
}
