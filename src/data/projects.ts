export const projects = [
  {
    id: "phom",
    title: "Phom",
    subtitle: { id: "SaaS AI Skripsi Simulator", en: "SaaS AI Thesis Simulator" },
    description: { 
      id: "Platform SaaS simulator sidang skripsi berbasis AI untuk membantu mahasiswa tingkat akhir melatih mental, menguji validitas metodologi, dan memperkuat argumen akademis. Menggunakan arsitektur monorepo dengan pemrosesan asinkronus.", 
      en: "An AI-based thesis defense simulator SaaS platform to help final-year students train their mentality, test methodological validity, and strengthen academic arguments. Uses a monorepo architecture with asynchronous processing."
    },
    techStack: ["Next.js", "Hono", "FastAPI", "Groq (Llama-3)", "Supabase", "pgvector", "Prisma"],
    featured: true
  },
  {
    id: "mosqrisk",
    title: "MosqRisk",
    subtitle: { id: "Sistem Peringatan Dini Kesehatan Spasial", en: "Spatial Health Early Warning System" },
    description: { 
      id: "Platform pemantauan risiko kesehatan terkait nyamuk (seperti DBD dan penampakan jentik) di area Banda Aceh dan Aceh Besar. Menyediakan early warning alerts secara presisi.", 
      en: "A spatial health risk monitoring platform related to mosquitoes (like Dengue and larvae sightings) in Banda Aceh and Aceh Besar. Provides precise early warning alerts."
    },
    techStack: ["WebGIS", "Next.js", "Tailwind CSS"],
    featured: true
  },
  {
    id: "cnn-dermatitis",
    title: "CNN Dermatitis Classifier",
    subtitle: { id: "Deep Learning Lesion Classifier", en: "Deep Learning Lesion Classifier" },
    description: { 
      id: "Merancang pipeline end-to-end CNN menggunakan TensorFlow/PyTorch untuk klasifikasi tingkat keparahan lesi dermatitis atopik secara non-invasif pada gambar medis.", 
      en: "Designed an end-to-end CNN pipeline using TensorFlow/PyTorch for non-invasive classification of atopic dermatitis lesion severity on medical images."
    },
    techStack: ["Python", "TensorFlow", "PyTorch", "CNN", "OpenCV"],
    featured: true
  },
  {
    id: "vae-handwriting",
    title: "VAE Handwriting Generator",
    subtitle: { id: "Generative AI Model", en: "Generative AI Model" },
    description: { 
      id: "Mengimplementasikan model arsitektur Variational Autoencoder (VAE) untuk mensintesis sampel digit tulisan tangan baru yang realistis dari dataset MNIST.", 
      en: "Implemented a Variational Autoencoder (VAE) architecture model to synthesize realistic new handwritten digit samples from the MNIST dataset."
    },
    techStack: ["Python", "PyTorch", "Generative AI"],
    featured: false
  },
  {
    id: "rainfall-prediction",
    title: "Rainfall Prediction",
    subtitle: { id: "Predictive Analytics Model", en: "Predictive Analytics Model" },
    description: { 
      id: "Membangun model supervised learning (Random Forest, XGBoost, Regression) dengan Scikit-Learn untuk memprediksi probabilitas curah hujan.", 
      en: "Built supervised learning models (Random Forest, XGBoost, Regression) with Scikit-Learn to predict rainfall probability."
    },
    techStack: ["Scikit-Learn", "Random Forest", "XGBoost", "Pandas"],
    featured: false
  },
  {
    id: "collab-projects",
    title: "Collaborative Projects",
    subtitle: { id: "Web Design & Community", en: "Web Design & Community" },
    description: { 
      id: "Pengembangan asinkron antarmuka aplikasi Pola Busana dan manajemen komunitas Roblox 'Fish It' (pembuatan server, automated tools).", 
      en: "Asynchronous development of Pola Busana application interface and Roblox 'Fish It' community management (server creation, automated tools)."
    },
    techStack: ["Figma", "UI/UX", "Roblox Studio"],
    featured: false
  }
];
