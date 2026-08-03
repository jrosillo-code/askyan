import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, MapPin, Mail, MessageSquare } from "lucide-react";
import { SharedHeader } from "@/components/shared-header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { motion } from "framer-motion";
import { insertContactSchema, type InsertContact } from "@shared/schema";

function ContactForm() {
  const { toast } = useToast();
  const { trackContactSubmission } = useAnalytics();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: undefined,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      trackContactSubmission(variables.inquiryType);
      toast({
        title: "Message Sent",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  const inquiryTypes = [
    { value: "expedition", label: "Expedition Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "media", label: "Media & Press" },
    { value: "other", label: "Other" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-display text-sm tracking-wide text-foreground">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="bg-background border-border focus:border-primary"
                    data-testid="input-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-display text-sm tracking-wide text-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background border-border focus:border-primary"
                    data-testid="input-email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-display text-sm tracking-wide text-foreground">
                Type of Inquiry
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="bg-background border-border focus:border-primary"
                    data-testid="select-inquiry-type"
                  >
                    <SelectValue placeholder="Select your inquiry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inquiryTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-display text-sm tracking-wide text-foreground">
                Your Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your expedition dreams, partnership ideas, or any questions you have..."
                  className="bg-background border-border focus:border-primary min-h-[150px] resize-none"
                  data-testid="textarea-message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full font-display tracking-wide"
          disabled={mutation.isPending}
          data-testid="button-submit-contact"
        >
          {mutation.isPending ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Based In",
      description: "Almaty, Kazakhstan — Gateway to Central Asia",
    },
    {
      icon: Mail,
      title: "Email",
      description: "expeditions@askyan.com",
    },
    {
      icon: MessageSquare,
      title: "Response Time",
      description: "We respond within 24-48 hours",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Let's Start a Conversation
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed">
          Whether you're dreaming of an expedition, seeking partnership opportunities, 
          or have questions about our journeys, we'd love to hear from you. Every great 
          adventure begins with a single message.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 rounded-md bg-primary/10 text-primary">
              <detail.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {detail.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm">
                {detail.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SharedHeader variant="transparent" />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Reach out to discuss your next expedition, explore partnership opportunities, 
              or simply share your wanderlust with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ContactInfo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-card border border-border rounded-md p-6 md:p-8"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-display font-black text-lg tracking-wider text-foreground mb-2">
            ASKYAN EXPEDITIONS
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Curated access to the unseen world
          </p>
        </div>
      </footer>
    </div>
  );
}
