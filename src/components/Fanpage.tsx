import { Card, CardContent } from "@/components/ui/card";
// Updated imports for different icons
import { MailOpen, Map } from "lucide-react"; 

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Reach out through the official email below.
              </p>
            </div>

            {/* Email Card (Updated Icon: MailOpen) */}
            <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    {/* Changed from Mail to MailOpen */}
                    <MailOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">
                      klarissenaticsofficial@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card (Updated Icon: Map) */}
            <Card className="border-accent/20 hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    {/* Changed from MapPin to Map */}
                    <Map className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Location</h4>
                    <p className="text-muted-foreground">Manila, Philippines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column left empty */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
