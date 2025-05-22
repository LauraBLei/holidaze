/**
 *
 * @returns {JSX.element} The rendered foot component
 */

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-2 p-10 font-primary border-t-1 border-brand-grey mt-16 lg:mt-30">
      <img src="/copyright-icon.svg" alt="copyright icon" className="h-3 md:h-[14px] lg::h-4" />
      <p className="text-xs md:text-sm lg:text-base">HansiFED, LeiDev, HaugeDev</p>
    </footer>
  );
}
