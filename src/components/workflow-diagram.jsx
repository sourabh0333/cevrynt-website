import Link from "next/link";
import { workflow } from "@/content/site-pages";

const workflowLinks = {
  "Intake": "/platform",
  "Documents": "/product/document-intelligence",
  "Financials": "/product/bank-statement-analysis",
  "Verification": "/product/business-verification",
  "Fraud": "/product/fraud-signals",
  "Policy": "/product/policy-engine",
  "Report": "/product/underwriting-report",
  "Human Decision": "/why-cevrynt",
};

export function WorkflowDiagram({ stage, caption }) {
  const activeIndex = workflow.findIndex((step) => step.toLowerCase() === stage?.toLowerCase());

  return (
    <figure className="workflow-diagram" aria-label={`Cevrynt underwriting workflow${stage ? `, highlighting the ${stage} stage` : ""}`}>
      <div className="workflow-diagram-track">
        {workflow.map((step, index) => {
          const isActive = index === activeIndex;
          const href = workflowLinks[step];
          return (
            <Link
              href={href}
              className={`workflow-diagram-node${isActive ? " is-active" : ""}`}
              key={step}
              aria-current={isActive ? "step" : undefined}
            >
              <span className="workflow-diagram-dot">{index + 1}</span>
              <span className="workflow-diagram-label">{step}</span>
            </Link>
          );
        })}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
