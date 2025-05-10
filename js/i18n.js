// Language Setup
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

// Translations
const translations = {
  en: {
    meta: {
      title: "PocketCompute - A multi-functional mini computer"
    },
    navbar: {
      features: "Features",
      keyFunctions: "Key Functions",
      about: "About",
      faq: "FAQ",
      language: "Language",
      languageSelector: "Select language",
      selectLanguage: "Select your language",
      switchTo: "Switch to",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    hero: {
      title: "introducing... <br><div style=\"font-family:\'Asap\', sans-serif;\">&nbsp PocketCompute</div>",
      subtitle: "the World's First <b>payment</b> ready <i><b>mini computer</b></i> for <b>Makers</b> and <b>Creators</b>",
      kickstarterButton: "Support on Kickstarter",
      learnMoreButton: "Learn More",
      deviceImageAlt: "PocketCompute",
      discount: "Pre-order now and save 30%"
    },
    features: {
      title: "Advanced Features",
      subtitle: "Discover what makes PocketCompute stand out from conventional smartphones and smart devices.",
      display: {
        title: "High-Resolution Display",
        description: "Vibrant 6.5-inch High Definition Plus display with 5 points capacitive touchscreen, for smooth scrolling and stunning visuals."
      },
      processor: {
        title: "Advanced Processor",
        description: "A powerful 2.3Ghz octa-core 64-bit MediaTek MT6765 processor for lightning-fast performance."
      },
      camera: {
        title: "Pro Camera System",
        description: "Triple-camera rear setup with 48MP sensor Camera, 5MP wide Camera, and 2MP Macro Camera for professional-grade photography. As well as a 24MP front facing Camera."
      },
      memory: {
        title: "Memory and Storage",
        description: "4GB of RAM paired with 128GB of onboard storage and a TF card slot to expand even further."
      },
      charging: {
        title: "Fast Charging",
        description: "Power up fast with USB-C and a massive 4650mAh battery."
      },
      connectivity: {
        title: "Connectivity &amp; Sensors",
        description: "Dual SIM, 4G, Wi-Fi 802.11 (ac)/b/g/n, Bluetooth 5.0 — Packed with smart sensors and GPS, Gravity, Ambient Light, Proximity, Accelerometer."
      }
    },
    functions: {
      title: "Key Functions",
      subtitle: "PocketCompute is more than just a great smartphone...",
      preorderButton: "Pre-order Now",
      general: {
        title: "Connectivity",
        description: "As well as being a smartphone with every feature you’d expect, PocketCompute also features computer ports to enable a multitude of hardware applications, including acting as a mini-computer or dedicated server.",
        features: {
          usb: "3 x USB 2.0 ports <br />+ 1 x internal USB 2.0",
          hdmi: "HDMI out (available with attachment)",
          audio: "3.5mm Audio jack for audio",
          ethernet: "RJ45 Ethernet port",
          usbc: "USB-c for Fast Charging"
        },
        ImageSubText: "PocketCompute with Screen, Keyboard and Mouse connected. (Utilising the HDMI out attachment)"
      },
      payment: {
        title: "Tap and Pay Processing",
        description: "Process contactless payments anywhere with advanced NFC capabilities, utilising Tap to Pay on Android. Or control access with NFC tokens.",
        features: {
          nfc: "Enhanced NFC capabilities",
          secure: "Secure payment processing",
          pos: "Perform POS functionality",
          readWrite: "Read and Write NFC tokens",
          accessControl: "RFID / NFC access control"
        },
        ImageSubText: "Use PocketCompute to receive Payments"
      },
      expansion: {
        title: "Universal Handheld Control hub",
        description: "As well as being able to connect to multiple hardware devices, PocketCompute also comes with an internal USB 2.0 port under the back cover. With extra room to connect custom PCB’s or micro-controllers, including mounting screw holes for an <i>Arduino Nano</i>, <i>ESP32</i> or a <i>Raspberry Pi Pico</i>, perfect for the makers who wish to extend PocketCompute’s functionality to any number of applications with no bounds.",
        features: {
          usb: "Internal USB expansion port",
          modules: "IoT applications",
          sdk: "Open-source printable 3D models of back and front removable Panels to allow for custom designs &amp; configurations",
          controlHub: "Smart control hub"
        },
        ImageSubText: "Remove the backcover with two screws and extend PocketCompute’s functionality with additional Microcontrollers or Electionics. Pictured here a red Arduino Nano clone ready to be connected to PocketCompute's internal USB and a Raspberry Pi Pico to the side."
      }
    },
    videoShowcase: {
      title: "See PocketCompute in Action",
      subtitle: "Watch how PocketCompute transforms the way you interact with technology.",
      playButton: "Play video",
      comingSoon: {
        title: "Video Coming Soon"
      }
    },
    instagram: {
      title: "Image Gallary",
      subtitle: "Follow us <a href='https://www.instagram.com/PocketCompute/'>@PocketCompute</a> for the latest updates and behind-the-scenes content.",
      followButton: "Follow Us on Instagram"
    },
    about: {
      title: "About PocketCompute",
      subtitle: "Learn more about our mission to help advance handheld technology and smart control hubs.",
      imageAlt: "PocketCompute Team",
      foundedText: "Founded in 2024, PocketCompute is redefining what a smartphone can be.",
      story: {
        title: "Our Story",
        content: "PocketCompute was born from a simple question: Why can't our smartphones do more? Our team of engineers and designers set out to create a device that breaks the limitations of conventional smartphones, offering unprecedented extendibility."
      },
      mission: {
        title: "Our Mission",
        content: "We're on a mission to empower users and the community with technology that adapts to their unique needs, rather than forcing them to adapt to technology. PocketCompute is designed to evolve with you, offering endless possibilities for custom expansion and computing solutions."
      },
      team: {
        title: "Our Team",
        content: "PocketCompute is made up of a small passionate team, that brings together makers and creators just like you, with expertise from consumer electronics, software development, and hardware engineering. United by a love <i class='fa-regular fa-heart'></i> and passion for innovation, we're committed to pushing the boundaries of what's possible in technology."
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about PocketCompute.",
      availability: {
        question: "When will PocketCompute be available?",
        answer: "PocketCompute will be available for pre-order through our Kickstarter campaign starting in Q2 2025. The first devices are expected to ship to Kickstarter backers in Q4 2025 to Q1 2026, with general availability planned for Q1 2026."
      },
      os: {
        question: "What operating system does PocketCompute run?",
        answer: "PocketCompute comes with Android 14 and is Google Mobile Services certified."
      },
      expansion: {
        question: "How does the microcontroller expansion work?",
        answer: "PocketCompute features a proprietary expansion port on the back of the device that connects to our expansion modules via USB. Each module can contain various microcontrollers and components that extend the functionality of your device. We provide a comprehensive SDK for developers to create their own modules and software integrations."
      },
      payment: {
        question: "What payment processors are supported for Tap and Pay?",
        answer: "PocketCompute's Tap and Pay feature uses Google's Android &quot;Tap to Pay&quot;, making PocketCompute compatible with all major payment processors including Stripe, Square, Adyen, and many more. This allows you to bring your own SoftPOS system from the Google Play store, so you're not locked into any payment provider. <br /><br />We will also provide our own purpose built and developer friendly SoftPOS App for PocketCompute (which will be announced in the near future), this will allow you to quickly and easily integrate your Apps and Hardware for payment-ready applications, allowing for many new and exciting projects, to enable the community even further."
      },
      opensource_casing: {
        question: "Are the outer casings designs open-source?",
        answer: "Both the small Front panel below the screen and the removable Back-cover panel designs will be available open-source allowing you to change and modify these to suit your needs, as well as a general outline of the whole device, will be made available on <a href='https://github.com/PocketCompute'>GitHub</a> once the Kickstarter campaign has ended. <br /><br />We foresee makers and hobbyist developing their own attachments for PocketCompute to empower many more projects and applications, and we look forward to seeing these as they come."
      },
      attachments: {
        question: "What attachments are available?",
        answer: "There will be two attachments available: <br />- HDMI out, connected via a USB port, enabling a Monitor, TV, or Projector to be connected.  <br />- A Power on Ethernet (POE) attachment, which connects to the RJ45 Ethernet port and the USB-c power in port, to enable worry free networking and power supply via an Ethernet connection."
      },
      deskmount: {
        question: "Is a stand or desk mount available?",
        answer: "Yes, a sideways Desk Mount will be available. A Wall-mountable frame will also be available if there's enough demand (please let us know). <br /><br />We will also open-source the general outline of PocketCompute allowing you to make any mounts, brackets, or attachments you desire. <br /><br />A community marketplace will also exist where you will be able to share any designs or sell any attachments you make for PocketCompute, allowing you to make money while also helping your fellow makers."
      },
      pantented: {
        question: "Is PocketCompute Patented?",
        answer: "Yes, PocketCompute’s design is patent pending."
      },
      community: {
        question: "Will there be a place where we can buy and sell attachments?",
        answer: "Yes, we will set up a community for makers, creators and everyone else to buy and sell community made attachments and creations for PocketCompute, allowing you to make, sell and share your creations with the world! - Sign up to our newsletter for announcements on this and much more."
      },
      specs: {
        question: "What are the specifications of PocketCompute?",
        answer: "PocketCompute features high-end specifications to ensure smooth performance for all use cases:",
        list: {
          display: "6.5-inch AMOLED display (2400 x 1080, 120Hz)",
          processor: "Octa-core processor with 5G connectivity",
          ram: "8GB/12GB RAM options",
          storage: "128GB/256GB/512GB storage options",
          battery: "4,500mAh battery with 65W fast charging",
          camera: "Triple camera system (48MP main + 12MP ultrawide + 8MP telephoto)",
          ports: "Proprietary expansion port + USB-C + micro-HDMI"
        }
      }
    },
    newsletter: {
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter for exclusive updates, early access opportunities, and special offers.",
      success: {
        title: "Subscription Successful",
        message: "Thank you for subscribing to our newsletter!"
      },
      error: {
        title: "Subscription Failed",
        message: "Failed to subscribe. Please try again later."
      },
      validation: {
        nameRequired: "Please enter your name",
        emailInvalid: "Please enter a valid email address"
      },
      form: {
        name: "Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "Enter your email",
        submit: "Subscribe Now",
        submitting: "Subscribing..."
      }
    },
    cta: {
      title: "Ready to Experience the Future?",
      subtitle: "Pre-order your <span class='asap-word'>PocketCompute</span> device today and be the first to experience the future of mini computing.",
      button: "Pre-order Now"
    },
    footer: {
      tagline: "Empowering the makers and creators of tomorrow.",
      copyright: "© 2025 PocketCompute. All rights reserved.",
      quickLinks: {
        title: "Quick Links",
        features: "Features",
        functions: "Key Functions",
        about: "About Us",
        faq: "FAQ",
        kickstarter: "Kickstarter"
      },
      contact: {
        title: "Contact"
      },
      language: {
        title: "Language",
        subtitle: "Select your preferred language"
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy"
      }
    },
    modals: {
      closeButton: "Close",
      privacyPolicy: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: March 27, 2025"
      },
      termsOfService: {
        title: "Terms of Service",
        lastUpdated: "Last updated: March 27, 2025"
      },
      cookiePolicy: {
        title: "Cookie Policy",
        lastUpdated: "Last updated: March 27, 2025"
      }
    }
  },
  de: {
    meta: {
      title: "PocketCompute - Das Smart Device der nächsten Generation"
    },
    navbar: {
      features: "Funktionen",
      keyFunctions: "Hauptfunktionen",
      about: "Über uns",
      faq: "FAQ",
      language: "Sprache",
      languageSelector: "Sprache auswählen",
      selectLanguage: "Wählen Sie Ihre Sprache",
      switchTo: "Wechseln zu",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen"
    },
    videoShowcase: {
      title: "PocketCompute in Aktion",
      subtitle: "Sehen Sie, wie PocketCompute die Art und Weise verändert, wie Sie mit Technologie interagieren.",
      playButton: "Video abspielen",
      comingSoon: {
        title: "Video kommt bald",
        message: "Wir arbeiten derzeit an einem aufregenden Produkt-Demonstrationsvideo, das alle erstaunlichen Funktionen von PocketCompute zeigen wird.",
        releaseInfo: "Das vollständige Produktvideo wird veröffentlicht in:",
        year: "Jahr",
        quarter: "Quartal",
        close: "Schließen"
      }
    },
    instagram: {
      title: "Von unserem Instagram",
      subtitle: "Folgen Sie uns @PocketComputeOfficial für die neuesten Updates und Blicke hinter die Kulissen.",
      followButton: "Folgen Sie uns auf Instagram",
      error: "Instagram-Feed konnte nicht geladen werden. Bitte versuchen Sie es später erneut."
    },
    about: {
      title: "Über PocketCompute",
      subtitle: "Erfahren Sie mehr über unsere Mission, die persönliche Technologie zu revolutionieren.",
      imageAlt: "PocketCompute Team",
      foundedText: "Gegründet im Jahr 2023, definiert PocketCompute neu, was ein Smartphone sein kann.",
      story: {
        title: "Unsere Geschichte",
        content: "PocketCompute entstand aus einer einfachen Frage: Warum können unsere Smartphones nicht mehr leisten? Unser Team aus Ingenieuren und Designern machte sich daran, ein Gerät zu entwickeln, das die Einschränkungen herkömmlicher Smartphones durchbricht und beispiellose Anpassungs- und Erweiterungsmöglichkeiten bietet."
      },
      mission: {
        title: "Unsere Mission",
        content: "Wir haben es uns zur Aufgabe gemacht, Benutzer mit Technologien zu stärken, die sich an ihre einzigartigen Bedürfnisse anpassen, anstatt sie zu zwingen, sich an die Technologie anzupassen. PocketCompute ist darauf ausgelegt, sich mit Ihnen weiterzuentwickeln und bietet endlose Möglichkeiten zur Anpassung und Erweiterung."
      },
      team: {
        title: "Unser Team",
        content: "Unser vielfältiges Team vereint Fachwissen aus der Unterhaltungselektronik, Softwareentwicklung und Hardware-Engineering. Vereint durch eine Leidenschaft für Innovation, setzen wir uns dafür ein, die Grenzen des Möglichen in der persönlichen Technologie zu erweitern."
      }
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Finden Sie Antworten auf häufig gestellte Fragen zu PocketCompute.",
      availability: {
        question: "Wann wird PocketCompute verfügbar sein?",
        answer: "PocketCompute wird ab Q3 2023 über unsere Kickstarter-Kampagne zur Vorbestellung verfügbar sein. Die ersten Geräte werden voraussichtlich im Q1 2024 an Unterstützer versandt, wobei die allgemeine Verfügbarkeit für Q2 2024 geplant ist."
      },
      os: {
        question: "Welches Betriebssystem verwendet PocketCompute?",
        answer: "PocketCompute läuft auf PocketOS, unserem maßgeschneiderten Betriebssystem, das auf dem Android Open Source Project (AOSP) basiert und Modifikationen zur Unterstützung unserer einzigartigen Hardware-Fähigkeiten enthält. Es ist vollständig kompatibel mit Android-Apps und bietet zusätzliche APIs für Hardware-Erweiterungsmodule."
      },
      expansion: {
        question: "Wie funktioniert die Mikrocontroller-Erweiterung?",
        answer: "PocketCompute verfügt über einen proprietären Erweiterungsanschluss auf der Rückseite des Geräts, der unsere Erweiterungsmodule über USB verbindet. Jedes Modul kann verschiedene Mikrocontroller und Komponenten enthalten, die die Funktionalität Ihres Geräts erweitern. Wir bieten ein umfassendes SDK für Entwickler, um ihre eigenen Module und Software-Integrationen zu erstellen."
      },
      payment: {
        question: "Welche Zahlungsabwickler werden für Tap and Pay unterstützt?",
        answer: "Die Tap-and-Pay-Funktion von PocketCompute unterstützt große Zahlungsabwickler wie Stripe, Square, PayPal und Adyen. Wir bieten eine Entwickler-API, die die Integration mit zusätzlichen Zahlungsdiensten ermöglicht. Unsere integrierte POS-Software unterstützt Standard-Kredit-/Debitkarten, NFC-Zahlungen und beliebte mobile Zahlungslösungen."
      },
      specs: {
        question: "Was sind die Spezifikationen von PocketCompute?",
        answer: "PocketCompute verfügt über High-End-Spezifikationen, um eine reibungslose Leistung für alle Anwendungsfälle zu gewährleisten:",
        list: {
          display: "6,5-Zoll-AMOLED-Display (2400 x 1080, 120 Hz)",
          processor: "Octa-Core-Prozessor mit 5G-Konnektivität",
          ram: "8 GB/12 GB RAM-Optionen",
          storage: "128 GB/256 GB/512 GB Speicheroptionen",
          battery: "4.500-mAh-Akku mit 65-W-Schnellladung",
          camera: "Dreifach-Kamerasystem (48MP Haupt + 12MP Ultraweitwinkel + 8MP Tele)",
          ports: "Proprietärer Erweiterungsanschluss + USB-C + Micro-HDMI"
        }
      }
    },
    hero: {
      title: "Die Zukunft der Smart Devices",
      subtitle: "Wir stellen PocketCompute vor, das revolutionäre Gerät, das Smartphone-Funktionalität mit individuell anpassbaren Hardware-Erweiterungen kombiniert.",
      kickstarterButton: "Auf Kickstarter unterstützen",
      learnMoreButton: "Mehr erfahren",
      deviceImageAlt: "PocketCompute Gerät",
      discount: "Jetzt vorbestellen und 30% sparen"
    },
    features: {
      title: "Fortschrittliche Funktionen",
      subtitle: "Entdecken Sie, was PocketCompute von herkömmlichen Smartphones und Smart Devices unterscheidet.",
      display: {
        title: "Hochauflösendes Display",
        description: "Lebendiges 6,5-Zoll-AMOLED-Display mit 120Hz Bildwiederholrate für flüssiges Scrollen und atemberaubende Bilder."
      },
      processor: {
        title: "Fortschrittlicher Prozessor",
        description: "Octa-Core-Prozessor der neuesten Generation mit speziellen KI-Fähigkeiten für blitzschnelle Leistung."
      },
      camera: {
        title: "Professionelles Kamerasystem",
        description: "Dreifach-Kamera-Setup mit 48MP-Hauptsensor, Ultraweitwinkel- und Teleobjektiv für professionelle Fotografie."
      },
      ports: {
        title: "Erweitertes Anschlusssystem",
        description: "Mehrere Anschlussoptionen wie USB-C, Micro-HDMI und unser proprietärer Erweiterungsanschluss für ultimative Vielseitigkeit."
      },
      charging: {
        title: "Schnelles Laden",
        description: "65W-Turboladetechnologie bringt Sie in nur 15 Minuten von 0 auf 60% mit ganztägiger Akkulaufzeit."
      },
      security: {
        title: "Verbesserte Sicherheit",
        description: "Fortschrittliche biometrische Sicherheit mit Fingerabdrucksensor unter dem Display und Gesichtserkennungstechnologie."
      }
    },
    functions: {
      title: "Hauptfunktionen",
      subtitle: "Entdecken Sie die drei revolutionären Funktionen, die PocketCompute zum vielseitigsten Gerät auf dem Markt machen.",
      preorderButton: "Jetzt vorbestellen",
      general: {
        title: "Allgemeine Telefonnutzung mit zusätzlichen Anschlüssen",
        description: "Verwenden Sie PocketCompute als Ihr alltägliches Smartphone, erweitert um zusätzliche Konnektivitätsoptionen, die Standard-Geräten fehlen.",
        features: {
          usb: "USB-C nach Industriestandard",
          hdmi: "Micro-HDMI-Ausgang",
          audio: "3,5-mm-Audiobuchse"
        }
      },
      payment: {
        title: "Tap-and-Pay-Verarbeitung",
        description: "Verarbeiten Sie kontaktlose Zahlungen überall mit fortschrittlichen NFC-Funktionen und sicherer Transaktionsverarbeitung.",
        features: {
          nfc: "Erweiterte NFC-Funktionen",
          secure: "Sichere Zahlungsabwicklung",
          pos: "Integrierte POS-Software"
        }
      },
      expansion: {
        title: "Mikrocontroller-Erweiterung",
        description: "Verbinden Sie zusätzliche Mikrocontroller und Elektronik über unseren proprietären Erweiterungsanschluss für unbegrenzte Anpassungsmöglichkeiten.",
        features: {
          usb: "USB-Erweiterungsanschluss",
          modules: "Unterstützung für Hardware-Module",
          sdk: "Open-Source-SDK"
        }
      }
    },
    newsletter: {
      title: "Bleiben Sie auf dem Laufenden",
      subtitle: "Abonnieren Sie unseren Newsletter für exklusive Updates, frühzeitige Zugriffsmöglichkeiten und Sonderangebote.",
      success: {
        title: "Abonnement erfolgreich",
        message: "Vielen Dank für Ihr Abonnement unseres Newsletters!"
      },
      error: {
        title: "Abonnement fehlgeschlagen",
        message: "Abonnement fehlgeschlagen. Bitte versuchen Sie es später erneut."
      },
      validation: {
        nameRequired: "Bitte geben Sie Ihren Namen ein",
        emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
      },
      form: {
        name: "Name",
        namePlaceholder: "Geben Sie Ihren Namen ein",
        email: "E-Mail",
        emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
        submit: "Jetzt abonnieren",
        submitting: "Wird abonniert..."
      }
    },
    cta: {
      title: "Bereit, die Zukunft zu erleben?",
      subtitle: "Bestellen Sie Ihr PocketCompute-Gerät heute vor und seien Sie der Erste, der die Zukunft der Mobilfunktechnologie erlebt.",
      button: "Jetzt vorbestellen"
    },
    footer: {
      tagline: "Neu definieren, was ein Smart Device sein kann.",
      copyright: "© 2025 PocketCompute. Alle Rechte vorbehalten.",
      quickLinks: {
        title: "Schnelllinks",
        features: "Funktionen",
        functions: "Hauptfunktionen",
        about: "Über uns",
        faq: "FAQ",
        kickstarter: "Kickstarter"
      },
      contact: {
        title: "Kontakt"
      },
      language: {
        title: "Sprache",
        subtitle: "Wählen Sie Ihre bevorzugte Sprache"
      },
      legal: {
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
        cookies: "Cookie-Richtlinie"
      }
    },
    modals: {
      closeButton: "Schließen",
      privacyPolicy: {
        title: "Datenschutzrichtlinie",
        lastUpdated: "Zuletzt aktualisiert: 27. März 2025"
      },
      termsOfService: {
        title: "Nutzungsbedingungen",
        lastUpdated: "Zuletzt aktualisiert: 27. März 2025"
      },
      cookiePolicy: {
        title: "Cookie-Richtlinie",
        lastUpdated: "Zuletzt aktualisiert: 27. März 2025"
      }
    }
  },
  fr: {
    meta: {
      title: "PocketCompute - L'appareil intelligent de nouvelle génération"
    },
    navbar: {
      features: "Fonctionnalités",
      keyFunctions: "Fonctions clés",
      about: "À propos",
      faq: "FAQ",
      language: "Langue",
      languageSelector: "Sélectionner la langue",
      selectLanguage: "Sélectionnez votre langue",
      switchTo: "Passer à",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu"
    },
    videoShowcase: {
      title: "Découvrez PocketCompute en action",
      subtitle: "Regardez comment PocketCompute transforme votre façon d'interagir avec la technologie.",
      playButton: "Lire la vidéo",
      comingSoon: {
        title: "Vidéo à venir",
        message: "Nous travaillons actuellement sur une vidéo de démonstration passionnante qui présentera toutes les fonctionnalités étonnantes de PocketCompute.",
        releaseInfo: "La vidéo complète du produit sera publiée dans :",
        year: "An",
        quarter: "Trimestre",
        close: "Fermer"
      }
    },
    instagram: {
      title: "De notre Instagram",
      subtitle: "Suivez-nous @PocketComputeOfficial pour les dernières mises à jour et le contenu des coulisses.",
      followButton: "Suivez-nous sur Instagram",
      error: "Impossible de charger le flux Instagram. Veuillez vérifier plus tard."
    },
    about: {
      title: "À propos de PocketCompute",
      subtitle: "En savoir plus sur notre mission de révolutionner la technologie personnelle.",
      imageAlt: "Équipe PocketCompute",
      foundedText: "Fondée en 2023, PocketCompute redéfinit ce que peut être un smartphone.",
      story: {
        title: "Notre histoire",
        content: "PocketCompute est né d'une simple question : pourquoi nos smartphones ne peuvent-ils pas faire plus ? Notre équipe d'ingénieurs et de designers s'est donné pour mission de créer un appareil qui brise les limites des smartphones conventionnels, offrant une personnalisation et une extensibilité sans précédent."
      },
      mission: {
        title: "Notre mission",
        content: "Notre mission est de donner aux utilisateurs une technologie qui s'adapte à leurs besoins uniques, plutôt que de les forcer à s'adapter à la technologie. PocketCompute est conçu pour évoluer avec vous, offrant des possibilités infinies de personnalisation et d'extension."
      },
      team: {
        title: "Notre équipe",
        content: "Notre équipe diversifiée réunit des expertises en électronique grand public, en développement logiciel et en ingénierie matérielle. Unis par une passion pour l'innovation, nous nous engageons à repousser les limites du possible dans la technologie personnelle."
      }
    },
    faq: {
      title: "Questions fréquemment posées",
      subtitle: "Trouvez des réponses aux questions courantes sur PocketCompute.",
      availability: {
        question: "Quand PocketCompute sera-t-il disponible ?",
        answer: "PocketCompute sera disponible en précommande via notre campagne Kickstarter à partir du T3 2023. Les premiers appareils devraient être expédiés aux soutiens au T1 2024, avec une disponibilité générale prévue pour le T2 2024."
      },
      os: {
        question: "Quel système d'exploitation utilise PocketCompute ?",
        answer: "PocketCompute fonctionne sous PocketOS, notre système d'exploitation personnalisé basé sur Android Open Source Project (AOSP) avec des modifications pour prendre en charge nos capacités matérielles uniques. Il est entièrement compatible avec les applications Android tout en offrant des API supplémentaires pour les modules d'extension matériels."
      },
      expansion: {
        question: "Comment fonctionne l'extension microcontrôleur ?",
        answer: "PocketCompute dispose d'un port d'extension propriétaire à l'arrière de l'appareil qui se connecte à nos modules d'extension via USB. Chaque module peut contenir divers microcontrôleurs et composants qui étendent les fonctionnalités de votre appareil. Nous fournissons un SDK complet pour les développeurs afin de créer leurs propres modules et intégrations logicielles."
      },
      payment: {
        question: "Quels processeurs de paiement sont pris en charge pour Tap and Pay ?",
        answer: "La fonction Tap and Pay de PocketCompute prend en charge les principaux processeurs de paiement, notamment Stripe, Square, PayPal et Adyen. Nous fournissons une API pour les développeurs qui permet l'intégration avec des services de paiement supplémentaires. Notre logiciel de point de vente intégré prend en charge les cartes de crédit/débit standard, les paiements NFC et les solutions de paiement mobile populaires."
      },
      specs: {
        question: "Quelles sont les spécifications de PocketCompute ?",
        answer: "PocketCompute dispose de spécifications haut de gamme pour assurer des performances fluides pour tous les cas d'utilisation :",
        list: {
          display: "Écran AMOLED de 6,5 pouces (2400 x 1080, 120 Hz)",
          processor: "Processeur octa-core avec connectivité 5G",
          ram: "Options 8 Go/12 Go de RAM",
          storage: "Options de stockage 128 Go/256 Go/512 Go",
          battery: "Batterie de 4 500 mAh avec charge rapide 65 W",
          camera: "Système à triple caméra (48MP principal + 12MP ultra grand angle + 8MP téléobjectif)",
          ports: "Port d'extension propriétaire + USB-C + micro-HDMI"
        }
      }
    },
    hero: {
      title: "L'avenir des appareils intelligents",
      subtitle: "Découvrez PocketCompute, l'appareil révolutionnaire qui combine les fonctionnalités d'un smartphone avec des extensions matérielles personnalisables.",
      kickstarterButton: "Soutenir sur Kickstarter",
      learnMoreButton: "En savoir plus",
      deviceImageAlt: "Appareil PocketCompute",
      discount: "Précommandez maintenant et économisez 30%"
    },
    features: {
      title: "Fonctionnalités avancées",
      subtitle: "Découvrez ce qui distingue PocketCompute des smartphones et appareils intelligents conventionnels.",
      display: {
        title: "Écran haute résolution",
        description: "Écran AMOLED vibrant de 6,5 pouces avec taux de rafraîchissement de 120 Hz pour un défilement fluide et des visuels époustouflants."
      },
      processor: {
        title: "Processeur avancé",
        description: "Processeur octa-core de dernière génération avec des capacités d'IA dédiées pour des performances ultra-rapides."
      },
      camera: {
        title: "Système de caméra professionnel",
        description: "Configuration à triple caméra avec capteur principal de 48MP, objectifs ultra grand-angle et téléobjectif pour une photographie de qualité professionnelle."
      },
      ports: {
        title: "Système de ports étendu",
        description: "Plusieurs options de connexion, notamment USB-C, micro-HDMI et notre port d'extension propriétaire pour une polyvalence ultime."
      },
      charging: {
        title: "Charge rapide",
        description: "La technologie de charge turbo 65W vous permet de passer de 0 à 60 % en seulement 15 minutes avec une autonomie de batterie toute la journée."
      },
      security: {
        title: "Sécurité améliorée",
        description: "Sécurité biométrique avancée avec capteur d'empreintes digitales sous l'écran et technologie de reconnaissance faciale."
      }
    },
    functions: {
      title: "Fonctions clés",
      subtitle: "Découvrez les trois fonctions révolutionnaires qui font de PocketCompute l'appareil le plus polyvalent du marché.",
      preorderButton: "Précommander maintenant",
      general: {
        title: "Utilisation générale du téléphone avec des ports supplémentaires",
        description: "Utilisez PocketCompute comme votre smartphone quotidien, amélioré avec des options de connectivité supplémentaires que les appareils standard n'ont pas.",
        features: {
          usb: "USB-C standard industriel",
          hdmi: "Sortie micro-HDMI",
          audio: "Prise audio 3,5 mm"
        }
      },
      payment: {
        title: "Traitement des paiements sans contact",
        description: "Traitez les paiements sans contact n'importe où avec des capacités NFC avancées et un traitement sécurisé des transactions.",
        features: {
          nfc: "Capacités NFC améliorées",
          secure: "Traitement sécurisé des paiements",
          pos: "Logiciel de point de vente intégré"
        }
      },
      expansion: {
        title: "Extension microcontrôleur",
        description: "Connectez des microcontrôleurs et des composants électroniques supplémentaires via notre port d'extension propriétaire pour une personnalisation illimitée.",
        features: {
          usb: "Port d'extension USB",
          modules: "Support des modules matériels",
          sdk: "SDK open-source"
        }
      }
    },
    newsletter: {
      title: "Restez informé",
      subtitle: "Abonnez-vous à notre newsletter pour des mises à jour exclusives, des opportunités d'accès anticipé et des offres spéciales.",
      success: {
        title: "Abonnement réussi",
        message: "Merci de vous être abonné à notre newsletter !"
      },
      error: {
        title: "Échec de l'abonnement",
        message: "Échec de l'abonnement. Veuillez réessayer plus tard."
      },
      validation: {
        nameRequired: "Veuillez entrer votre nom",
        emailInvalid: "Veuillez entrer une adresse e-mail valide"
      },
      form: {
        name: "Nom",
        namePlaceholder: "Entrez votre nom",
        email: "E-mail",
        emailPlaceholder: "Entrez votre e-mail",
        submit: "S'abonner maintenant",
        submitting: "Abonnement en cours..."
      }
    },
    cta: {
      title: "Prêt à vivre le futur ?",
      subtitle: "Précommandez votre appareil PocketCompute dès aujourd'hui et soyez le premier à vivre le futur de la technologie mobile.",
      button: "Précommander maintenant"
    },
    footer: {
      tagline: "Redéfinir ce qu'un appareil intelligent peut être.",
      copyright: "© 2025 PocketCompute. Tous droits réservés.",
      quickLinks: {
        title: "Liens rapides",
        features: "Fonctionnalités",
        functions: "Fonctions clés",
        about: "À propos de nous",
        faq: "FAQ",
        kickstarter: "Kickstarter"
      },
      contact: {
        title: "Contact"
      },
      language: {
        title: "Langue",
        subtitle: "Sélectionnez votre langue préférée"
      },
      legal: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookies: "Politique relative aux cookies"
      }
    },
    modals: {
      closeButton: "Fermer",
      privacyPolicy: {
        title: "Politique de confidentialité",
        lastUpdated: "Dernière mise à jour : 27 mars 2025"
      },
      termsOfService: {
        title: "Conditions d'utilisation",
        lastUpdated: "Dernière mise à jour : 27 mars 2025"
      },
      cookiePolicy: {
        title: "Politique relative aux cookies",
        lastUpdated: "Dernière mise à jour : 27 mars 2025"
      }
    }
  },
  es: {
    meta: {
      title: "PocketCompute - El dispositivo inteligente de próxima generación"
    },
    navbar: {
      features: "Características",
      keyFunctions: "Funciones clave",
      about: "Acerca de",
      faq: "Preguntas frecuentes",
      language: "Idioma",
      languageSelector: "Seleccionar idioma",
      selectLanguage: "Seleccione su idioma",
      switchTo: "Cambiar a",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú"
    },
    videoShowcase: {
      title: "Ve PocketCompute en acción",
      subtitle: "Mira cómo PocketCompute transforma la forma en que interactúas con la tecnología.",
      playButton: "Reproducir video",
      comingSoon: {
        title: "Video próximamente",
        message: "Actualmente estamos trabajando en un emocionante video de demostración del producto que mostrará todas las increíbles características de PocketCompute.",
        releaseInfo: "El video completo del producto será lanzado en:",
        year: "Año",
        quarter: "Trimestre",
        close: "Cerrar"
      }
    },
    instagram: {
      title: "De nuestro Instagram",
      subtitle: "Síguenos en @PocketComputeOfficial para obtener las últimas actualizaciones y contenido detrás de escena.",
      followButton: "Síguenos en Instagram",
      error: "No se pudo cargar el feed de Instagram. Por favor, vuelve a verificar más tarde."
    },
    about: {
      title: "Acerca de PocketCompute",
      subtitle: "Aprende más sobre nuestra misión de revolucionar la tecnología personal.",
      imageAlt: "Equipo PocketCompute",
      foundedText: "Fundada en 2023, PocketCompute está redefiniendo lo que puede ser un smartphone.",
      story: {
        title: "Nuestra historia",
        content: "PocketCompute nació de una simple pregunta: ¿Por qué nuestros smartphones no pueden hacer más? Nuestro equipo de ingenieros y diseñadores se propuso crear un dispositivo que rompa las limitaciones de los smartphones convencionales, ofreciendo personalización y expansibilidad sin precedentes."
      },
      mission: {
        title: "Nuestra misión",
        content: "Nuestra misión es empoderar a los usuarios con tecnología que se adapte a sus necesidades únicas, en lugar de forzarlos a adaptarse a la tecnología. PocketCompute está diseñado para evolucionar contigo, ofreciendo posibilidades infinitas de personalización y expansión."
      },
      team: {
        title: "Nuestro equipo",
        content: "Nuestro diverso equipo reúne experiencia en electrónica de consumo, desarrollo de software e ingeniería de hardware. Unidos por una pasión por la innovación, estamos comprometidos a expandir los límites de lo posible en tecnología personal."
      }
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Encuentra respuestas a preguntas comunes sobre PocketCompute.",
      availability: {
        question: "¿Cuándo estará disponible PocketCompute?",
        answer: "PocketCompute estará disponible para pre-ordenar a través de nuestra campaña de Kickstarter a partir del tercer trimestre de 2023. Se espera que los primeros dispositivos se envíen a los patrocinadores en el primer trimestre de 2024, con disponibilidad general planificada para el segundo trimestre de 2024."
      },
      os: {
        question: "¿Qué sistema operativo ejecuta PocketCompute?",
        answer: "PocketCompute funciona con PocketOS, nuestro sistema operativo personalizado basado en Android Open Source Project (AOSP) con modificaciones para soportar nuestras capacidades de hardware únicas. Es totalmente compatible con aplicaciones Android mientras ofrece APIs adicionales para módulos de expansión de hardware."
      },
      expansion: {
        question: "¿Cómo funciona la expansión del microcontrolador?",
        answer: "PocketCompute cuenta con un puerto de expansión propietario en la parte posterior del dispositivo que conecta a nuestros módulos de expansión a través de USB. Cada módulo puede contener varios microcontroladores y componentes que extienden la funcionalidad de tu dispositivo. Proporcionamos un SDK completo para que los desarrolladores creen sus propios módulos e integraciones de software."
      },
      payment: {
        question: "¿Qué procesadores de pago son compatibles con Tap and Pay?",
        answer: "La función Tap and Pay de PocketCompute es compatible con los principales procesadores de pago, incluyendo Stripe, Square, PayPal y Adyen. Proporcionamos una API para desarrolladores que permite la integración con servicios de pago adicionales. Nuestro software POS incorporado es compatible con tarjetas de crédito/débito estándar, pagos NFC y soluciones populares de pago móvil."
      },
      specs: {
        question: "¿Cuáles son las especificaciones de PocketCompute?",
        answer: "PocketCompute cuenta con especificaciones de alta gama para garantizar un rendimiento fluido para todos los casos de uso:",
        list: {
          display: "Pantalla AMOLED de 6.5 pulgadas (2400 x 1080, 120Hz)",
          processor: "Procesador octa-core con conectividad 5G",
          ram: "Opciones de 8GB/12GB de RAM",
          storage: "Opciones de almacenamiento de 128GB/256GB/512GB",
          battery: "Batería de 4,500mAh con carga rápida de 65W",
          camera: "Sistema de triple cámara (48MP principal + 12MP ultra gran angular + 8MP teleobjetivo)",
          ports: "Puerto de expansión propietario + USB-C + micro-HDMI"
        }
      }
    },
    hero: {
      title: "El futuro de los dispositivos inteligentes",
      subtitle: "Presentamos PocketCompute, el dispositivo revolucionario que combina la funcionalidad de un smartphone con expansión de hardware personalizable.",
      kickstarterButton: "Apoyar en Kickstarter",
      learnMoreButton: "Más información",
      deviceImageAlt: "Dispositivo PocketCompute",
      discount: "Reserva ahora y ahorra un 30%"
    },
    features: {
      title: "Características avanzadas",
      subtitle: "Descubre qué hace que PocketCompute destaque entre los smartphones y dispositivos inteligentes convencionales.",
      display: {
        title: "Pantalla de alta resolución",
        description: "Vibrante pantalla AMOLED de 6,5 pulgadas con tasa de refresco de 120Hz para un desplazamiento suave y visuales impresionantes."
      },
      processor: {
        title: "Procesador avanzado",
        description: "Procesador octa-core de última generación con capacidades de IA dedicadas para un rendimiento ultrarrápido."
      },
      camera: {
        title: "Sistema de cámara profesional",
        description: "Configuración de triple cámara con sensor principal de 48MP, lentes ultra gran angular y teleobjetivo para fotografía de nivel profesional."
      },
      ports: {
        title: "Sistema de puertos expandido",
        description: "Múltiples opciones de conexión incluyendo USB-C, micro-HDMI y nuestro puerto de expansión propietario para una versatilidad definitiva."
      },
      charging: {
        title: "Carga rápida",
        description: "La tecnología de carga turbo de 65W te lleva de 0 a 60% en solo 15 minutos con batería para todo el día."
      },
      security: {
        title: "Seguridad mejorada",
        description: "Seguridad biométrica avanzada con sensor de huellas dactilares bajo la pantalla y tecnología de reconocimiento facial."
      }
    },
    functions: {
      title: "Funciones clave",
      subtitle: "Descubre las tres funciones revolucionarias que hacen de PocketCompute el dispositivo más versátil del mercado.",
      preorderButton: "Reservar ahora",
      general: {
        title: "Uso general del teléfono con puertos adicionales",
        description: "Utiliza PocketCompute como tu smartphone diario, mejorado con opciones de conectividad adicionales que los dispositivos estándar no tienen.",
        features: {
          usb: "USB-C estándar de la industria",
          hdmi: "Salida micro-HDMI",
          audio: "Conector de audio de 3,5 mm"
        }
      },
      payment: {
        title: "Procesamiento de pagos sin contacto",
        description: "Procesa pagos sin contacto en cualquier lugar con capacidades NFC avanzadas y procesamiento seguro de transacciones.",
        features: {
          nfc: "Capacidades NFC mejoradas",
          secure: "Procesamiento seguro de pagos",
          pos: "Software de punto de venta incorporado"
        }
      },
      expansion: {
        title: "Expansión de microcontroladores",
        description: "Conecta microcontroladores adicionales y dispositivos electrónicos a través de nuestro puerto de expansión propietario para una personalización ilimitada.",
        features: {
          usb: "Puerto de expansión USB",
          modules: "Soporte para módulos de hardware",
          sdk: "SDK de código abierto"
        }
      }
    },
    newsletter: {
      title: "Mantente actualizado",
      subtitle: "Suscríbete a nuestro boletín para recibir actualizaciones exclusivas, oportunidades de acceso anticipado y ofertas especiales.",
      success: {
        title: "Suscripción exitosa",
        message: "¡Gracias por suscribirte a nuestro boletín!"
      },
      error: {
        title: "Error en la suscripción",
        message: "No se pudo completar la suscripción. Por favor, inténtalo de nuevo más tarde."
      },
      validation: {
        nameRequired: "Por favor, introduce tu nombre",
        emailInvalid: "Por favor, introduce una dirección de correo electrónico válida"
      },
      form: {
        name: "Nombre",
        namePlaceholder: "Introduce tu nombre",
        email: "Correo electrónico",
        emailPlaceholder: "Introduce tu correo electrónico",
        submit: "Suscribirse ahora",
        submitting: "Suscribiendo..."
      }
    },
    cta: {
      title: "¿Listo para experimentar el futuro?",
      subtitle: "Reserva tu dispositivo PocketCompute hoy y sé el primero en experimentar el futuro de la tecnología móvil.",
      button: "Reservar ahora"
    },
    footer: {
      tagline: "Redefiniendo lo que puede ser un dispositivo inteligente.",
      copyright: "© 2025 PocketCompute. Todos los derechos reservados.",
      quickLinks: {
        title: "Enlaces rápidos",
        features: "Características",
        functions: "Funciones clave",
        about: "Sobre nosotros",
        faq: "Preguntas frecuentes",
        kickstarter: "Kickstarter"
      },
      contact: {
        title: "Contacto"
      },
      language: {
        title: "Idioma",
        subtitle: "Selecciona tu idioma preferido"
      },
      legal: {
        privacy: "Política de privacidad",
        terms: "Términos de servicio",
        cookies: "Política de cookies"
      }
    },
    modals: {
      closeButton: "Cerrar",
      privacyPolicy: {
        title: "Política de privacidad",
        lastUpdated: "Última actualización: 27 de marzo de 2025"
      },
      termsOfService: {
        title: "Términos de servicio",
        lastUpdated: "Última actualización: 27 de marzo de 2025"
      },
      cookiePolicy: {
        title: "Política de cookies",
        lastUpdated: "Última actualización: 27 de marzo de 2025"
      }
    }
  },
  ja: {
    meta: {
      title: "PocketCompute - 次世代スマートデバイス"
    },
    navbar: {
      features: "機能",
      keyFunctions: "主要機能",
      about: "会社概要",
      faq: "よくある質問",
      language: "言語",
      languageSelector: "言語を選択",
      selectLanguage: "言語を選択してください",
      switchTo: "切り替える",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる"
    },
    videoShowcase: {
      title: "PocketComputeを実際に見る",
      subtitle: "PocketComputeがテクノロジーとの関わり方をどのように変革するかをご覧ください。",
      playButton: "動画を再生",
      comingSoon: {
        title: "動画は近日公開",
        message: "現在、PocketComputeのすべての素晴らしい機能を紹介する興味深い製品デモビデオを制作中です。",
        releaseInfo: "製品の完全な動画は以下の時期に公開されます：",
        year: "年",
        quarter: "四半期",
        close: "閉じる"
      }
    },
    instagram: {
      title: "私たちのInstagramから",
      subtitle: "最新情報や舞台裏のコンテンツについては、@PocketComputeOfficialをフォローしてください。",
      followButton: "Instagramでフォローする",
      error: "Instagramフィードを読み込めませんでした。後ほど再度ご確認ください。"
    },
    about: {
      title: "PocketComputeについて",
      subtitle: "個人向けテクノロジーに革命を起こすという私たちの使命についてもっと学びましょう。",
      imageAlt: "PocketComputeチーム",
      foundedText: "2023年に設立されたPocketComputeは、スマートフォンの可能性を再定義しています。",
      story: {
        title: "私たちの物語",
        content: "PocketComputeは、シンプルな疑問から始まりました：なぜスマートフォンはもっとできないのか？私たちのエンジニアとデザイナーのチームは、従来のスマートフォンの限界を打ち破り、前例のないカスタマイズと拡張性を提供するデバイスを作るために取り組みました。"
      },
      mission: {
        title: "私たちの使命",
        content: "私たちの使命は、ユーザーが技術に適応するのではなく、ユーザーの独自のニーズに適応する技術を提供することです。PocketComputeはあなたと共に進化するように設計されており、カスタマイズと拡張の無限の可能性を提供します。"
      },
      team: {
        title: "私たちのチーム",
        content: "私たちの多様なチームは、家電製品、ソフトウェア開発、ハードウェアエンジニアリングの専門知識を結集しています。イノベーションへの情熱に導かれ、私たちは個人向けテクノロジーの可能性の限界を押し広げることに取り組んでいます。"
      }
    },
    faq: {
      title: "よくある質問",
      subtitle: "PocketComputeに関する一般的な質問の回答を見つけてください。",
      availability: {
        question: "PocketComputeはいつ利用できるようになりますか？",
        answer: "PocketComputeは2023年第3四半期からKickstarterキャンペーンを通じて予約注文が可能になります。最初のデバイスは2024年第1四半期にバッカーに発送される予定で、一般提供は2024年第2四半期を予定しています。"
      },
      os: {
        question: "PocketComputeはどのオペレーティングシステムを実行していますか？",
        answer: "PocketComputeは、Android Open Source Project（AOSP）をベースに、独自のハードウェア機能をサポートするよう修正を加えた自社開発のオペレーティングシステムであるPocketOSで動作します。Androidアプリと完全に互換性があり、ハードウェア拡張モジュール用の追加APIも提供しています。"
      },
      expansion: {
        question: "マイクロコントローラーの拡張機能はどのように機能しますか？",
        answer: "PocketComputeには、デバイスの背面に独自の拡張ポートがあり、USBを介して拡張モジュールに接続します。各モジュールには、デバイスの機能を拡張するさまざまなマイクロコントローラーやコンポーネントを含めることができます。開発者が独自のモジュールやソフトウェア統合を作成するための包括的なSDKを提供しています。"
      },
      payment: {
        question: "Tap and Payではどの決済プロセッサがサポートされていますか？",
        answer: "PocketComputeのTap and Pay機能は、Stripe、Square、PayPal、Adyenなどの主要な決済プロセッサをサポートしています。追加の決済サービスとの統合を可能にする開発者APIを提供しています。組み込みのPOSソフトウェアは、標準的なクレジット/デビットカード、NFC決済、人気のあるモバイル決済ソリューションをサポートしています。"
      },
      specs: {
        question: "PocketComputeの仕様は何ですか？",
        answer: "PocketComputeは、あらゆるユースケースでスムーズなパフォーマンスを確保するためのハイエンド仕様を備えています：",
        list: {
          display: "6.5インチAMOLEDディスプレイ（2400 x 1080、120Hz）",
          processor: "5G接続対応のオクタコアプロセッサ",
          ram: "8GB/12GB RAMオプション",
          storage: "128GB/256GB/512GBストレージオプション",
          battery: "65W急速充電対応の4,500mAhバッテリー",
          camera: "トリプルカメラシステム（48MPメイン + 12MP超広角 + 8MP望遠）",
          ports: "独自拡張ポート + USB-C + マイクロHDMI"
        }
      }
    },
    hero: {
      title: "スマートデバイスの未来",
      subtitle: "スマートフォンの機能とカスタマイズ可能なハードウェア拡張を組み合わせた革新的なデバイス、PocketComputeをご紹介します。",
      kickstarterButton: "Kickstarterでサポート",
      learnMoreButton: "詳細を見る",
      deviceImageAlt: "PocketComputeデバイス",
      discount: "今予約注文すると30%オフ"
    },
    features: {
      title: "高度な機能",
      subtitle: "PocketComputeが従来のスマートフォンやスマートデバイスと一線を画す理由をご覧ください。",
      display: {
        title: "高解像度ディスプレイ",
        description: "鮮やかな6.5インチAMOLEDディスプレイ、120Hzリフレッシュレートでスムーズなスクロールと鮮明な映像を実現。"
      },
      processor: {
        title: "先進的なプロセッサ",
        description: "専用AI機能を備えた最新世代のオクタコアプロセッサーで超高速パフォーマンスを実現。"
      },
      camera: {
        title: "プロカメラシステム",
        description: "48MPメインセンサー、超広角、望遠レンズを備えたトリプルカメラセットアップでプロ級の写真撮影が可能。"
      },
      ports: {
        title: "拡張ポートシステム",
        description: "USB-C、マイクロHDMI、および独自の拡張ポートなど、複数の接続オプションで究極の多用途性を実現。"
      },
      charging: {
        title: "急速充電",
        description: "65Wターボ充電技術でわずか15分で0%から60%まで充電可能、終日バッテリー持続。"
      },
      security: {
        title: "強化されたセキュリティ",
        description: "ディスプレイ内蔵指紋センサーと顔認識技術による先進的な生体認証セキュリティ。"
      }
    },
    functions: {
      title: "主要機能",
      subtitle: "PocketComputeを市場で最も多用途なデバイスにする3つの革新的な機能をご覧ください。",
      preorderButton: "今すぐ予約注文",
      general: {
        title: "追加ポートを備えた一般的な電話使用",
        description: "標準デバイスにはない追加の接続オプションを備えた、日常のスマートフォンとしてPocketComputeをご利用ください。",
        features: {
          usb: "業界標準のUSB-C",
          hdmi: "マイクロHDMI出力",
          audio: "3.5mmオーディオジャック"
        }
      },
      payment: {
        title: "タップ＆ペイ処理",
        description: "高度なNFC機能と安全なトランザクション処理により、どこでも非接触決済を処理できます。",
        features: {
          nfc: "強化されたNFC機能",
          secure: "安全な決済処理",
          pos: "内蔵POSソフトウェア"
        }
      },
      expansion: {
        title: "マイクロコントローラー拡張",
        description: "当社独自の拡張ポートを通じて追加のマイクロコントローラーや電子機器を接続し、無限のカスタマイズを実現します。",
        features: {
          usb: "USB拡張ポート",
          modules: "ハードウェアモジュールサポート",
          sdk: "オープンソースSDK"
        }
      }
    },
    newsletter: {
      title: "最新情報を入手",
      subtitle: "ニュースレターに登録して、独占的な更新情報、早期アクセスの機会、特別オファーを受け取りましょう。",
      success: {
        title: "登録成功",
        message: "ニュースレターにご登録いただきありがとうございます！"
      },
      error: {
        title: "登録失敗",
        message: "登録に失敗しました。後でもう一度お試しください。"
      },
      validation: {
        nameRequired: "お名前を入力してください",
        emailInvalid: "有効なメールアドレスを入力してください"
      },
      form: {
        name: "名前",
        namePlaceholder: "お名前を入力",
        email: "メール",
        emailPlaceholder: "メールアドレスを入力",
        submit: "今すぐ登録",
        submitting: "登録中..."
      }
    },
    cta: {
      title: "未来を体験する準備はできていますか？",
      subtitle: "今日PocketComputeデバイスを予約注文して、モバイルテクノロジーの未来をいち早く体験しましょう。",
      button: "今すぐ予約注文"
    },
    footer: {
      tagline: "スマートデバイスの可能性を再定義します。",
      copyright: "© 2025 PocketCompute. All rights reserved.",
      quickLinks: {
        title: "クイックリンク",
        features: "機能",
        functions: "主要機能",
        about: "会社概要",
        faq: "よくある質問",
        kickstarter: "Kickstarter"
      },
      contact: {
        title: "お問い合わせ"
      },
      language: {
        title: "言語",
        subtitle: "希望の言語を選択してください"
      },
      legal: {
        privacy: "プライバシーポリシー",
        terms: "利用規約",
        cookies: "Cookie ポリシー"
      }
    },
    modals: {
      closeButton: "閉じる",
      privacyPolicy: {
        title: "プライバシーポリシー",
        lastUpdated: "最終更新日: 2025年3月27日"
      },
      termsOfService: {
        title: "利用規約",
        lastUpdated: "最終更新日: 2025年3月27日"
      },
      cookiePolicy: {
        title: "Cookie ポリシー",
        lastUpdated: "最終更新日: 2025年3月27日"
      }
    }
  }
};

// i18n setup
let currentLanguage = 'en';

// Initialize Handlebars
const initHandlebars = () => {
  // Register Handlebars helpers
  Handlebars.registerHelper('t', function(key) {
    return new Handlebars.SafeString(getTranslation(key));
  });
  
  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
  });
  
  Handlebars.registerHelper('each_with_index', function(list, options) {
    let ret = '';
    for (let i = 0, j = list.length; i < j; i++) {
      let item = list[i];
      item.index = i;
      ret = ret + options.fn(item);
    }
    return ret;
  });
};

// Get translation
const getTranslation = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value === undefined) return key;
    value = value[k];
  }
  
  return value || key;
};

// Set language
const setLanguage = (langCode) => {
  if (translations[langCode]) {
    currentLanguage = langCode;
    
    // Update document title
    document.title = getTranslation('meta.title');
    
    // Call the render function to update all templates
    renderTemplates();
    
    // Update the language selector
    const languageToggleText = document.querySelector('.language-toggle-text');
    const selectedLang = languages.find(lang => lang.code === currentLanguage);
    if (languageToggleText && selectedLang) {
      languageToggleText.textContent = selectedLang.name;
    }
    
    // Store language preference in localStorage
    localStorage.setItem('preferred_language', langCode);
    
    return true;
  }
  return false;
};

// Get browser language
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  
  // Convert to base language code (e.g., 'en-US' -> 'en')
  const baseLang = browserLang.split('-')[0];
  
  // Check if we support this language
  for (const lang of languages) {
    if (lang.code === baseLang) {
      return baseLang;
    }
  }
  
  // Default to English if no match
  return 'en';
};

// Initialize language
const initLanguage = () => {
  // Check if user has a stored preference
  const storedLang = localStorage.getItem('preferred_language');
  
  if (storedLang && translations[storedLang]) {
    setLanguage(storedLang);
  } else {
    // Get browser language
    const browserLang = getBrowserLanguage();
    setLanguage(browserLang);
  }
};

// Render templates
const renderTemplates = () => {
  // Get all elements with data-template attribute
  const templateElements = document.querySelectorAll('[data-template]');
  
  templateElements.forEach(element => {
    const templateId = element.getAttribute('data-template');
    const templateSource = document.getElementById(templateId).innerHTML;
    const template = Handlebars.compile(templateSource);
    element.innerHTML = template({});
  });
};

// Export functions for use in other files
window.i18n = {
  languages,
  currentLanguage,
  setLanguage,
  getTranslation,
  initHandlebars,
  initLanguage,
  renderTemplates
};