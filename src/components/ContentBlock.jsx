import { motion } from "framer-motion";
import { highlightCode } from "../utils/highlightCode";

export default function ContentBlock({ block }) {
  return (
    <motion.section
      className="my-7"
      // Fades and rises in as it scrolls into view; `once: true` means it
      // only plays the first time, not every time you scroll past it.
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h2 className="mb-2 text-base font-semibold text-ink">{block.h}</h2>
      <p className="mb-3 max-w-[72ch] text-[14.5px] leading-relaxed text-ink2">{block.p}</p>
      {block.tip && (
        <div className="mb-3.5 mt-1 flex max-w-[72ch] items-start gap-2.5 rounded-md border border-line border-l-[3px] border-l-accent bg-panel2 px-3.5 py-3 text-[13.5px] leading-relaxed text-ink2">
          <span className="flex-none text-[15px] leading-snug" aria-hidden="true">💡</span>
          <span>
            <b className="text-ink">In plain English:</b> {block.tip}
          </span>
        </div>
      )}
      {block.code && (
        <pre className="mb-1.5 overflow-x-auto rounded-md border border-lineSoft bg-bg px-4 py-3.5 font-mono text-[13px] leading-relaxed">
          <code className="whitespace-pre">{highlightCode(block.code)}</code>
        </pre>
      )}
    </motion.section>
  );
}
