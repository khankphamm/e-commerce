import React from 'react';
import { Users, MapPin, Mail, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('our-team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Story</h1>
          <p className="text-muted-foreground max-w-xl mx-auto animate-slide-up">
            Exclusive is a premier destination for curated fashion, tech, and home goods, offering a seamless shopping experience since 2023.
          </p>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-slide-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-0.5 bg-accent"></div>
                <span className="text-accent font-medium">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">We're Passionate About Quality Products</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2023, Exclusive began with a simple vision: to create a marketplace where quality, design, and customer experience come first. What started as a small online store has grown into a comprehensive shopping destination loved by customers worldwide.
              </p>
              <p className="text-muted-foreground mb-8">
                We partner with the best brands and artisans to bring you carefully selected products that combine style, functionality, and sustainability. Our team works tirelessly to ensure every interaction with Exclusive exceeds your expectations.
              </p>
              <Button size="lg" onClick={scrollToTeam}>
                Learn More
              </Button>
            </div>
            <div className="order-1 md:order-2 relative animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Our team working" 
                className="rounded-lg shadow-lg w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary text-white p-6 rounded-lg shadow-lg hidden md:block">
                <h3 className="text-3xl font-bold mb-2">5+</h3>
                <p className="font-medium">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
              <p className="text-muted-foreground">Satisfied Customers</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-4xl font-bold text-primary mb-2">5k+</h3>
              <p className="text-muted-foreground">Products Available</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h3 className="text-4xl font-bold text-primary mb-2">150+</h3>
              <p className="text-muted-foreground">Global Brands</p>
            </div>
            <div className="p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="our-team" className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-0.5 bg-accent"></div>
              <span className="text-accent font-medium">Our Team</span>
              <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-muted-foreground">
              The talented people behind the scenes of our organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              {
                name: "Do Huu Quy",
                role: "",
                image: ""
              },
              {
                name: "Nguyen Tuan Duong",
                role: "",
                image: ""
              },
              {
                name: "Pham Huu Khanh",
                role: "",
                image: "https://res.cloudinary.com/dfhpxjibw/image/upload/v1741866590/4292a322574c8ee7e2e7da880741666f_rokbaw.jpg"
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href=" https://x.com/home?lang=vi" target='_blank' className="text-accent hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com/" target='_blank' className="text-accent hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://www.facebook.com/" target='_blank' className="text-accent hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Last two images centered */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              {
                name: "Nguyen The Duc",
                role: "",
                image: ""
              },
              {
                name: "Nguyen Uyen Nhi",
                role: "",
                image: ""
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-scale w-[300px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-accent hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Our Location</h3>
              <p className="text-muted-foreground">
                123 Hoang Mai, Hanoi
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p className="text-muted-foreground">
                +84 987 654 321
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">
              support@novashop.com

              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Working Hours</h3>
              <p className="text-muted-foreground">
                Mon - Fri: 8AM - 9PM<br />
                Sat - Sun: 10AM - 6PM
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="bg-primary text-white rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-accent opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Start Shopping?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied customers who love our products and exceptional service.
              </p>
              <Link to="/shop">
                <Button size="lg" variant="secondary">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
