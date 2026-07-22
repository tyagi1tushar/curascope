export function formatCost(cost: number): string {
  return `$${cost.toFixed(6).replace(/\.?0+$/, "")}`;
}