import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#050f1a] pb-24">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[radial-gradient(ellipse_at_center,_rgba(15,76,129,0.4),_#050f1a_70%)] px-8 py-20 text-center shadow-2xl"
        >
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white md:text-5xl">
            Siap merancang perjalananmu <br />
            <span className="text-cyan-300">ke Toba?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-lg text-slate-300">
            Cukup ceritakan preferensimu, biar AI yang menyusun sisanya.
          </p>

          <div className="mt-10 flex justify-center">
            <Button>
              <div className="flex items-center gap-2 text-lg">
                Mulai Rencanakan Perjalanan
                <ArrowRight size={20} />
              </div>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}