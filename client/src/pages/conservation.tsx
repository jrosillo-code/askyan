import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Leaf, Shield, Globe } from "lucide-react";
import { SharedHeader } from "@/components/shared-header";
import { MEDIA } from "@/lib/media";
const conservationImage = MEDIA["stock_images/conservation_wildlif_d0bedb1b.jpg"];

export default function ConservationPage() {
  const initiatives = [
    {
      icon: Shield,
      title: "Wildlife Protection",
      description: "We partner with local conservation groups to protect endangered species and their habitats in every region we visit.",
    },
    {
      icon: Leaf,
      title: "Habitat Restoration",
      description: "A portion of every expedition fee goes directly to habitat restoration projects in the destinations we explore.",
    },
    {
      icon: Globe,
      title: "Research Support",
      description: "We collaborate with scientific research teams, providing them access and funding to study fragile ecosystems.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async"
            src={conservationImage}
            alt="Conservation"
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
            Conservation First
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Protecting the wild places that make extraordinary travel possible
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
              At Askyan Expeditions, conservation is not an afterthought—it's the foundation of everything we do. 
              We believe that the privilege of accessing the world's most remarkable places comes with a profound 
              responsibility to protect them.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Every journey we design considers its environmental impact from the very first planning stage. 
              We work exclusively with local partners who share our commitment to preservation, ensuring that 
              our presence supports rather than depletes the ecosystems we explore.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Through our Conservation First initiative, we've contributed to the protection of over 50,000 
              acres of critical habitat and supported anti-poaching efforts across three continents.
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
