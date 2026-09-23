import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/rich-text";
import { WorkflowDiagram } from "@/components/workflow-diagram";

/* `boundary` marks where the guidance ends and the section about Cevrynt
   begins: { id, label } puts a labelled rule directly before that heading,
   and an optional `figure` ({ image, caption, link }) sits right under it.
   `numbered` gives every h2 its section number, counted in the article.
   `contents` is placed directly after the opening paragraph, the way a
   printed feature sets its contents under the standfirst. */
export function ArticleRenderer({ blocks, boundary = null, numbered = false, sectionMeta = null, contents = null }) {
  const sectionNumber = new Map(
    blocks.filter((b) => b.type === "h2").map((b, i) => [b, String(i + 1).padStart(2, "0")]),
  );

  /* A chapter opener: the number in its frame, the title, and — when
     `sectionMeta` gives one — that section's own reading time. */
  const heading = (block) => (
    <>
      {numbered ? (
        <span className="article-h2-n" aria-hidden="true">
          <span className="article-h2-d">{sectionNumber.get(block)}</span>
        </span>
      ) : null}
      <span className="article-h2-t">
        <RichText text={block.text} />
        {/* Kept out of the heading's accessible name, so the outline stays clean. */}
        {sectionMeta?.[block.id] ? (
          <span className="article-h2-m" aria-hidden="true">
            {sectionMeta[block.id]}
          </span>
        ) : null}
      </span>
    </>
  );

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "h2":
            if (boundary && block.id === boundary.id) {
              const fig = boundary.figure;
              return (
                <Fragment key={key}>
                  <p className="article-boundary">
                    <span className="article-boundary-k">{boundary.label}</span>
                  </p>
                  <h2 id={block.id}>{heading(block)}</h2>
                  {fig ? (
                    <figure className="article-product">
                      <Image
                        className="article-product-img"
                        src={fig.image.src}
                        alt={fig.image.alt}
                        width={fig.image.w}
                        height={fig.image.h}
                        sizes="(max-width: 980px) 92vw, 720px"
                        loading="lazy"
                      />
                      <figcaption className="article-product-cap">
                        <span className="article-product-k">{fig.caption}</span>
                        <Link className="article-product-a" href={fig.link.href}>
                          {fig.link.label} <span aria-hidden="true">→</span>
                        </Link>
                      </figcaption>
                    </figure>
                  ) : null}
                </Fragment>
              );
            }
            return (
              <h2 id={block.id} key={key}>
                {heading(block)}
              </h2>
            );
          case "h3":
            return (
              <h3 id={block.id} key={key}>
                <RichText text={block.text} />
              </h3>
            );
          case "p":
            return index === 0 && contents ? (
              <Fragment key={key}>
                <p>
                  <RichText text={block.text} />
                </p>
                {contents}
              </Fragment>
            ) : (
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
