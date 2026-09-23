import { Fragment } from "react";
import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/* Links inside one run of text. */
function renderLinks(text, keyPrefix) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  let index = 0;

  LINK.lastIndex = 0;
  while ((match = LINK.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const external = href.startsWith("http");
    nodes.push(
      external ? (
        <a href={href} key={`${keyPrefix}-l${index}`} rel="noreferrer" target="_blank">
          {label}
        </a>
      ) : (
        <Link href={href} key={`${keyPrefix}-l${index}`}>
          {label}
        </Link>
      ),
    );
    index += 1;
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/* Bold is read first, so a link wrapped in bold — **[label](/href)** — keeps
   both, instead of leaving the asterisks in the text. */
export function RichText({ text }) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={`b${i}`}>{renderLinks(part, `b${i}`)}</strong>
        ) : (
          <Fragment key={`t${i}`}>{renderLinks(part, `t${i}`)}</Fragment>
        ),
      )}
    </>
  );
}
