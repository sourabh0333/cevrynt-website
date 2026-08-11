import Image from "next/image";
import { RichText } from "@/components/rich-text";
import { WorkflowDiagram } from "@/components/workflow-diagram";

export function ArticleRenderer({ blocks }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "h2":
            return (
              <h2 id={block.id} key={key}>
                <RichText text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 id={block.id} key={key}>
                <RichText text={block.text} />
              </h3>
            );
          case "p":
            return (
              <p key={key}>
                <RichText text={block.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={key}>
                <RichText text={block.text} />
              </blockquote>
            );
          case "callout":
            return (
              <aside className="article-callout" key={key}>
                <p className="article-callout-title">{block.title}</p>
                <ul>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </aside>
            );
          case "workflow":
            return <WorkflowDiagram stage={block.stage} caption={block.caption} key={key} />;
          case "image":
            return (
              <figure className="article-figure" key={key}>
                <Image src={block.src} alt={block.alt} width={1280} height={800} sizes="(max-width: 768px) 100vw, 720px" />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
