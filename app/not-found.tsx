import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="index-page grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-xs tracking-[0.24em] text-[#c5a46d]">DIKSHA JEWELLERS</p>
        <h1 className="font-serif text-5xl">This page is not in the preview.</h1>
        <Link className="mt-6 inline-block border-b border-[#c5a46d] pb-1" href="/">
          Return to the four concepts
        </Link>
      </div>
    </main>
  );
}
