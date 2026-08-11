import Link from "next/link";

function renderBold(text, keyPrefix) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={`${keyPrefix}-b-${index}`}>{part}</strong> : part
  );
}

export function RichText({ text }) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let segmentIndex = 0;

  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = linkPattern.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(...renderBold(text.slice(lastIndex, match.index), `t${segmentIndex++}`));
    }
    const isExternal = href.startsWith("http");
    nodes.push(
      isExternal ? (
        <a key={`link-${segmentIndex++}`} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      ) : (
        <Link key={`link-${segmentIndex++}`} href={href}>
          {label}
        </Link>
      )
    );
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(...renderBold(text.slice(lastIndex), `t${segmentIndex++}`));
  }

  return <>{nodes}</>;
}
