import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Heart, GraduationCap } from "lucide-react";
import { SharedHeader } from "@/components/shared-header";
import { MEDIA } from "@/lib/media";
const communityImage = MEDIA["stock_images/local_community_cult_d6accc8e.jpg"];

export default function CommunityPage() {
  const initiatives = [
    {
      icon: Users,
      title: "Local Employment",
      description: "We prioritize hiring local guides, translators, and service providers, ensuring tourism dollars stay within communities.",
    },
    {
      icon: Heart,
      title: "Cultural Preservation",
      description: "We support traditional artisans, musicians, and storytellers, helping preserve cultural heritage for future generations.",
    },
    {
      icon: GraduationCap,
      title: "Education Programs",
      description: "A portion of expedition fees funds educational initiatives in the communities we visit, from schools to skills training.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="solid" />
      
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={communityImage}
            alt="Community Support"
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
            Community Support
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Empowering local communities through meaningful travel partnerships
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
              True travel is about connection. At Askyan Expeditions, we believe the most transformative 
              journeys are those that create genuine bonds between travelers and the communities they visit.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              We've built relationships with local communities over decades, not transactions. Our Cultural 
              Scribes are often members of these communities themselves, ensuring authentic experiences that 
              benefit both travelers and hosts.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Through our Community Support initiative, we've directly contributed over $2 million to local 
              economies and funded 47 community projects across 23 countries.
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
