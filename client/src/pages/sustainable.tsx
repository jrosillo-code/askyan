import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Recycle, Zap, TreePine } from "lucide-react";
import { SharedHeader } from "@/components/shared-header";
import { MEDIA } from "@/lib/media";
const sustainableImage = MEDIA["stock_images/sustainable_eco-frie_cb0317fc.jpg"];

export default function SustainablePage() {
  const initiatives = [
    {
      icon: TreePine,
      title: "Carbon Offsetting",
      description: "We calculate and offset the carbon footprint of every expedition, investing in verified reforestation and renewable energy projects.",
    },
    {
      icon: Recycle,
      title: "Zero Waste Expeditions",
      description: "We minimize single-use plastics and waste on all journeys, partnering with accommodations that share our environmental values.",
    },
    {
      icon: Zap,
      title: "Renewable Energy",
      description: "We prioritize partners using renewable energy and sustainable practices, from solar-powered lodges to electric vehicles.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async"
            src={sustainableImage}
            alt="Sustainable Practices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <p className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-4">
            Our Commitment
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Sustainable Practices
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Minimizing our footprint while maximizing positive impact
          </p>
        </motion.div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none mb-16"
          >
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              The places we love deserve our protection. At Askyan Expeditions, sustainability isn't a 
              marketing term—it's an operational imperative that guides every decision we make.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              From the moment you book with us, we begin calculating the environmental impact of your 
              journey. We then work to minimize that impact through careful planning, and offset what 
              cannot be eliminated through verified carbon reduction programs.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Our commitment extends to our partners. Every lodge, guide service, and transport provider 
              we work with must meet our rigorous sustainability standards or commit to a clear improvement plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {initiatives.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-card border-border h-full" data-testid={`card-initiative-${index}`}>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link href="/">
              <Button variant="outline" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
