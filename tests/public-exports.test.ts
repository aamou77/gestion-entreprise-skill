import assert from "node:assert/strict";

import {
  calculateBreakEven,
  calculateManagementSummary,
  calculatePricing,
  calculateRevenueLedger,
  calculateTreasury,
  composeSum,
} from "gestion-entreprise-skill";
import type {
  ContributionReference,
  EngineDomain,
  OrchestrationSource,
  Period,
  QualifiedOrigin,
  RouteIntent,
  ValueMeaning,
} from "gestion-entreprise-skill";

const orchestrationTypesResolve: [
  EngineDomain,
  RouteIntent,
  ValueMeaning,
  Period,
  QualifiedOrigin,
  OrchestrationSource,
  ContributionReference,
] | undefined = undefined;

void orchestrationTypesResolve;

for (const exportedFunction of [
  calculateBreakEven,
  calculatePricing,
  calculateTreasury,
  calculateManagementSummary,
  calculateRevenueLedger,
  composeSum,
]) {
  assert.equal(typeof exportedFunction, "function");
}

console.log("public package exports: ok");
