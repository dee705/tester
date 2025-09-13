import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award, Mic, Heart } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-300/20 via-white/40 to-green-200/30 backdrop-blur-sm"></div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Klarisse
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey from reality TV to musical stardom, inspiring millions
            with authentic artistry and powerful vocals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Artist Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/30 backdrop-blur-md">
              <img
                src="/lovable-uploads/featured.jpg"
                alt="Klarisse de Guzman"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
            {/* Floating accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/30 rounded-full blur-2xl animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-300/30 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                The Artist
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Born on September 6, 1991, Klarisse de Guzman also known as
                "NATION'S MOWM" and ex-celebrity housemate on Pinoy Big Brother
                Collab Edition after establishing herself as one of the
                Philippines' most beloved Soul Diva. Her powerful vocals and
                authentic songwriting have earned her a dedicated fanbase and
                critical acclaim.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Known for her versatility and emotional depth, Klarisse continues
                to evolve as an artist, with plans for a new album and solo
                concert in 2025. Her music resonates with audiences across
                generations, making her a true icon in Filipino pop culture.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />, title: "2014", desc: "Debut Album" },
                { icon: <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />, title: "Multi-Award", desc: "Winner" },
                { icon: <Mic className="h-8 w-8 text-green-700 mx-auto mb-2" />, title: "100+", desc: "Performances" },
                { icon: <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />, title: "1M+", desc: "Followers" },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="glass hover:shadow-green-300/40 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    {item.icon}
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 transition transform hover:scale-105 shadow-md hover:shadow-green-400/50"
                onClick={() =>
                  document
                    .getElementById("music")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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
