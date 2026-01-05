import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Mail, MessageCircle, Leaf, Sparkles, Globe, Shield } from 'lucide-react';

const products = [
  {
    name: 'Savon Noir Marocain',
    description: 'Nettoyant corporel traditionnel riche en huile d\'olive qui purifie en profondeur et prépare la peau à l\'exfoliation. Indispensable pour le rituel Hammam.',
    benefits: ['Purification Ancestrale', 'Détoxification profonde', 'Peau incroyablement douce'],
  },
  {
    name: 'Gommage au Sucre',
    description: 'Mélange luxueux de sucre cristallisé et d\'huiles végétales nourrissantes. Élimine les cellules mortes en douceur et révèle un teint lumineux.',
    benefits: ['Éclat et Douceur', 'Hydratation intensive', 'Idéal peaux sensibles'],
  },
  {
    name: 'Huile d\'Argan Pure',
    description: '100% pure et pressée à froid, cet élixir anti-âge hydrate intensément le visage, le corps et les cheveux. Reconnue mondialement pour ses propriétés réparatrices.',
    benefits: ['L\'Or Liquide du Maroc', 'Anti-âge naturel', 'Hydratation exceptionnelle'],
  },
  {
    name: 'Argile Ghassoul Marocaine',
    description: 'Argile volcanique unique utilisée depuis des siècles pour nettoyer et revitaliser la peau et les cheveux. Absorbe les impuretés tout en respectant l\'équilibre naturel.',
    benefits: ['Rituel Détoxifiant', 'Minéralisant', 'Respecte l\'équilibre naturel'],
  },
  {
    name: 'Eau de Rose',
    description: 'Distillée à partir des roses de Damas, notre eau florale tonifie, apaise et rafraîchit la peau. Idéale comme lotion après-nettoyage ou pour fixer le maquillage.',
    benefits: ['Hydratation et Sérénité', 'Tonifiante', 'Apaisante'],
  },
  {
    name: 'Gant Kessa',
    description: 'L\'accessoire essentiel pour une exfoliation efficace avec le Savon Noir. Sa texture unique stimule la circulation sanguine pour une peau neuve.',
    benefits: ['L\'Outil du Hammam', 'Exfoliation efficace', 'Stimule la circulation'],
  },
  {
    name: 'Tabrima Marocaine aux Herbes',
    description: 'Poudre d\'herbes et d\'épices aromatiques utilisée comme masque corporel pour unifier le teint et adoucir la peau. Secret de beauté traditionnel.',
    benefits: ['Masque Corporel Sublimant', 'Unifie le teint', 'Peau satinée'],
  },
];

const reasons = [
  {
    icon: Leaf,
    title: 'Ingrédients Naturels Traçables',
    description: 'Pureté garantie, sourcés directement auprès de coopératives locales engagées dans une démarche éthique et durable.',
  },
  {
    icon: Sparkles,
    title: 'Héritage et Innovation',
    description: 'Nous honorons les formules ancestrales tout en appliquant des méthodes de production modernes et certifiées.',
  },
  {
    icon: Globe,
    title: 'Capacité d\'Exportation',
    description: 'Nous maîtrisons les normes d\'emballage, de documentation et de logistique pour une distribution fluide dans le CCG.',
  },
  {
    icon: Shield,
    title: 'Solutions Marque Blanche',
    description: 'Offres complètes de marque blanche pour créer votre propre ligne de cosmétiques premium basée sur nos formules éprouvées.',
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    country: '',
    partnershipType: '',
    message: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContact = trpc.contact.submit.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, partnershipType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.firstName || !formData.lastName || !formData.country || !formData.partnershipType || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContact.mutateAsync(formData);
      toast.success('Merci ! Votre demande a été envoyée avec succès. Nous vous recontacterons bientôt.');
      setFormData({
        companyName: '',
        firstName: '',
        lastName: '',
        country: '',
        partnershipType: '',
        message: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/212677092060?text=Bonjour%20Soraya%27z%20Cosmetics%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20vos%20produits"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-serif-display font-bold text-foreground">Soraya'z</div>
          <div className="flex gap-6 items-center">
            <a href="#products" className="text-sm hover:text-accent transition-colors">Produits</a>
            <a href="#why-us" className="text-sm hover:text-accent transition-colors">Pourquoi nous</a>
            <a href="#gcc-focus" className="text-sm hover:text-accent transition-colors">Marché CCG</a>
            <a href="#contact" className="text-sm hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif-display font-bold mb-6 text-foreground leading-tight">
              Le Secret Millénaire du Maroc, Réinventé pour l'Élégance du Golfe
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Soraya'z Cosmetics est votre partenaire privilégié pour l'importation de rituels de beauté marocains authentiques et premium, conçus pour les marchés les plus exigeants du CCG.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/212677092060?text=Bonjour%20Soraya%27z%20Cosmetics%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20vos%20produits"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous sur WhatsApp
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-muted px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                <Mail className="w-5 h-5" />
                Formulaire de Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl font-serif-display font-bold mb-8 text-foreground">À Propos de la Marque</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif-body font-semibold mb-4 text-foreground">L'Âme du Terroir Marocain</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Notre marque est née d'une passion pour la transmission des secrets de beauté ancestraux du Maroc. Chaque produit est une célébration du terroir marocain, puisant sa richesse dans des ingrédients naturels d'exception.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous perpétuons un artisanat rigoureux, garantissant une qualité et une pureté inégalées. Notre engagement est de transformer ces rituels séculaires en produits cosmétiques premium et export-ready, répondant aux standards internationaux les plus stricts.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-serif-body font-semibold text-foreground mb-2">Ingrédients d'Exception</h4>
                  <p className="text-sm text-muted-foreground">Huile d'Argan des coopératives du Sud, Ghassoul des montagnes de l'Atlas, roses de la Vallée du Dadès</p>
                </div>
                <div>
                  <h4 className="font-serif-body font-semibold text-foreground mb-2">Artisanat Rigoureux</h4>
                  <p className="text-sm text-muted-foreground">Formules ancestrales combinées avec méthodes de production modernes et certifiées</p>
                </div>
                <div>
                  <h4 className="font-serif-body font-semibold text-foreground mb-2">Qualité Premium</h4>
                  <p className="text-sm text-muted-foreground">Standards internationaux les plus stricts pour une exportation fiable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-4xl font-serif-display font-bold mb-4 text-foreground">Nos Produits</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Chacun de nos produits est formulé pour offrir une expérience sensorielle et des bienfaits concrets, s'inscrivant dans une démarche de luxe naturel.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-serif-body">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-accent uppercase">Bénéfices clés</p>
                    <ul className="space-y-1">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="text-4xl font-serif-display font-bold mb-4 text-foreground">Pourquoi Choisir Soraya'z Cosmetics ?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            L'exigence d'un partenariat de confiance basé sur la qualité, l'authenticité et l'excellence.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif-body font-semibold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GCC Focus Section */}
      <section id="gcc-focus" className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-4xl font-serif-display font-bold mb-4 text-foreground">Focus Marché CCG</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Notre engagement envers l'excellence du Golfe
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-serif-body">Adaptation Culturelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos emballages et notre communication sont conçus pour résonner avec l'esthétique et les valeurs de l'élégance du Golfe.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-serif-body">Qualité Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous ne faisons aucun compromis sur la qualité, assurant que chaque produit est digne des spas et concept stores les plus prestigieux.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl font-serif-body">Conformité Réglementaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous travaillons en étroite collaboration avec des experts pour garantir la conformité aux réglementations d'importation du CCG.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-serif-display font-bold mb-6">Développez Votre Offre Cosmétique avec Soraya'z</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Que vous soyez un distributeur, un concept store, un spa ou un partenaire de marque blanche, notre équipe est prête à vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/212677092060?text=Bonjour%20Soraya%27z%20Cosmetics%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20vos%20produits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent-foreground text-accent hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Contactez-nous sur WhatsApp
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 border-2 border-accent-foreground hover:bg-accent-foreground/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Formulaire de Contact
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif-display font-bold mb-4 text-foreground">Nous Contacter</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Remplissez le formulaire ci-dessous et notre équipe vous recontactera dans les meilleurs délais.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom de l'Entreprise *</label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Votre entreprise"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Prénom *</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom *</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Pays *</label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Votre pays"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Type de Partenariat *</label>
                  <Select value={formData.partnershipType} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distributor">Distributeur</SelectItem>
                      <SelectItem value="private-label">Marque Blanche</SelectItem>
                      <SelectItem value="concept-store">Concept Store</SelectItem>
                      <SelectItem value="spa-hammam">Spa & Hammam</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Téléphone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+212 6 XX XX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Parlez-nous de votre projet..."
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg transition-all duration-300"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma Demande'}
              </Button>
            </form>

            <div className="mt-12 pt-12 border-t border-border">
              <h3 className="text-2xl font-serif-body font-semibold text-foreground mb-6">Informations de Contact</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-accent mb-2">WHATSAPP (RECOMMANDÉ)</p>
                  <a href="https://wa.me/212677092060" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                    +212 677 092 060
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent mb-2">EMAIL COMMERCIAL</p>
                  <a href="mailto:sales@sorayazcosmetics.com" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                    sales@sorayazcosmetics.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container text-center">
          <p className="text-sm opacity-80">
            © 2025 Soraya'z Cosmetics. Tous droits réservés. Cosmétiques marocains naturels premium pour le marché CCG.
          </p>
        </div>
      </footer>
    </div>
  );
}
