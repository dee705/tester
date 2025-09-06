import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Mic, Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Klarisse</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey from reality TV to musical stardom, inspiring millions with authentic artistry and powerful vocals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Artist Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-luxury bg-gradient-primary">
              <img 
                src="/lovable-uploads/49966ea4-3532-4c0f-8c4e-87c5cbac7377.png"
                alt="Klarisse de Guzman"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">The Artist</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Born on September 6, 1991, Klarisse de Guzman also known as "NATION'S MOWM" and ex-celebrity housemate on 
                Pinoy Big Brother Collab Edition after establishing herself as one of the Philippines' most beloved 
                Soul Diva. Her powerful vocals and authentic songwriting have earned her a dedicated 
                fanbase and critical acclaim.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Known for her versatility and emotional depth, Klarisse continues to evolve as an artist, 
                with plans for a new album and solo concert in 2025. Her music resonates with audiences 
                across generations, making her a true icon in Filipino pop culture.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">2014</div>
                  <div className="text-sm text-muted-foreground">Debut Album</div>
                </CardContent>
              </Card>
              
              <Card className="border-secondary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">Multi-Award</div>
                  <div className="text-sm text-muted-foreground">Winner</div>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mic className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">100+</div>
                  <div className="text-sm text-muted-foreground">Performances</div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">1M+</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                variant="elegant" 
                size="lg"
                onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Her Music
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
