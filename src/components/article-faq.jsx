import { RichText } from "@/components/rich-text";

export function ArticleFaq({ items, title = "Frequently asked questions" }) {
  if (!items?.length) return null;

  return (
    <section className="article-faq" aria-label={title}>
      <h2>{title}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p><RichText text={item.a} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}
