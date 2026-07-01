import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X } from "lucide-react";

import gym1 from "@assets/image_1782887751159.png";
import gym2 from "@assets/image_1782887762372.png";
import gym3 from "@assets/image_1782887768921.png";
import gym4 from "@assets/image_1782887774610.png";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const localImages = [
    { id: 'l1', image_url: gym1, category: 'EQUIPMENT' },
    { id: 'l2', image_url: gym2, category: 'CLASSES' },
    { id: 'l3', image_url: gym3, category: 'CLASSES' },
    { id: 'l4', image_url: gym4, category: 'EQUIPMENT' },
    { id: 'l5', image_url: '/gallery1.png', category: 'EQUIPMENT' },
    { id: 'l6', image_url: '/gallery2.png', category: 'EQUIPMENT' },
  ];

  useEffect(() => {
    supabase.from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) {
        setImages([...localImages, ...data]);
      } else {
        setImages(localImages);
      }
    });
  }, []);

  const categories = ["ALL", "EQUIPMENT", "CLASSES", "TRANSFORMATIONS"];

  const filteredImages = filter === "ALL" 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="py-24 min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Our <span className="text-primary">Facility</span></h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-display tracking-widest uppercase transition-all ${
                  filter === cat 
                    ? 'bg-primary text-background' 
                    : 'ghost-gold-btn'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="break-inside-avoid cursor-pointer overflow-hidden border border-border group relative"
              onClick={() => setLightbox(img.image_url)}
            >
              <img 
                src={img.image_url} 
                alt="Gallery item" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-background font-display tracking-widest uppercase bg-primary px-4 py-2">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightbox} 
            alt="Enlarged" 
            className="max-w-full max-h-[90vh] object-contain border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
