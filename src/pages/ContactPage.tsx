import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Boutique',
      titleAr: 'زورونا',
      content: ['123 Luxury Avenue', 'Downtown Dubai, UAE'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      titleAr: 'اتصل بنا',
      content: ['+971 50 123 4567', '+971 4 123 4567'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      titleAr: 'راسلنا',
      content: ['info@alsayedperfumes.com', 'support@alsayedperfumes.com'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      titleAr: 'ساعات العمل',
      content: ['Mon - Sat: 10AM - 10PM', 'Sunday: 2PM - 9PM'],
    },
  ];

  const subjects = [
    'General Inquiry',
    'Product Information',
    'Order Support',
    'Wholesale Inquiry',
    'Press & Media',
    'Other',
  ];

  return (
    <main className="min-h-screen pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-4">
            Contact Us
          </h1>
          <p className="font-arabic text-xl text-gold">تواصل معنا</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-card border border-border p-6 text-center hover:border-gold/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 border border-gold/30 mb-4">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="font-arabic text-sm text-gold mb-1">{info.titleAr}</p>
                <h3 className="font-display text-lg mb-3">{info.title}</h3>
                {info.content.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs tracking-ultra-wide text-gold uppercase mb-4 block">
                Send a Message
              </span>
              <h2 className="text-4xl font-display font-semibold mb-4">
                We'd Love to Hear From You
              </h2>
              <p className="font-arabic text-lg text-gold">نسعد بتواصلكم معنا</p>
              <div className="luxury-divider mt-6" />
            </div>

            {isSubmitted ? (
              <div className="bg-card border border-border p-12 text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-4">Message Sent</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: '',
                    });
                  }}
                  className="btn-outline-gold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border p-8 lg:p-12"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971"
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-muted-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center bg-primary/90">
          <div className="text-center text-primary-foreground">
            <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
            <p className="font-display text-xl mb-2">Visit Our Flagship Boutique</p>
            <p className="text-primary-foreground/70">
              123 Luxury Avenue, Downtown Dubai, UAE
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
