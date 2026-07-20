import { SecurityResult } from "../gateway.types";

type SecurityRule = {
  pattern: RegExp;
  finding: string;
  penalty: number;
};

export class PromptScanner {
  private static readonly RULES: SecurityRule[] = [
    {
      pattern: /ignore previous instructions|forget previous instructions|system prompt|jailbreak|bypass/i,
      finding: "Potential Prompt Injection",
      penalty: 35,
    },
    {
      pattern: /drop table|delete from|insert into|update\s+.+\s+set|select\s+.+\s+from/i,
      finding: "Potential SQL Injection",
      penalty: 30,
    },
    {
      pattern: /api[_-]?key|secret|password|access token|bearer/i,
      finding: "Sensitive Information Request",
      penalty: 20,
    },
    {
      pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
      finding: "PII Detected",
      penalty: 10,
    },
  ];

  static scan(prompt: string): SecurityResult {
    let score = 100;
    const findings: string[] = [];

    for (const rule of this.RULES) {
      if (rule.pattern.test(prompt)) {
        findings.push(rule.finding);
        score -= rule.penalty;
      }
    }

    score = Math.max(score, 0);

    let risk: SecurityResult["risk"] = "low";

    if (score < 50) {
      risk = "high";
    } else if (score < 80) {
      risk = "medium";
    }

    return {
      score,
      risk,
      findings,
    };
  }
}