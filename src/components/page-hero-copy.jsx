import { SignalMark } from "@/components/icons";

export function PageHeroCopy({ heading, lede }) {
  return (
    <>
      <SignalMark className="hero-signal" />
      <h1 className="page-hero-dark-heading">{heading}</h1>
      <p className="home-hero-lede">{lede}</p>
    </>
  );
}
