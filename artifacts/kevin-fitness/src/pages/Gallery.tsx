import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, ZoomIn } from "lucide-react";

import gym1 from "@assets/image_1782887751159.png";
import gym2 from "@assets/image_1782887762372.png";
import gym3 from "@assets/image_1782887768921.png";
import gym4 from "@assets/image_1782887774610.png";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const localImages = [
    { id: "l1", image_url: gym1, category: "EQUIPMENT" },
    { id: "l2", image_url: gym2, category: "CLASSES" },
    { id: "l3", image_url: gym3, category: "CLASSES" },
    { id: "l4", image_url: gym4, category: "EQUIPMENT" },
    { id: "l5", image_url: "/gallery1.png", category: "EQUIPMENT" },
    { id: "l6", image_url: "/gallery2.png", category: "EQUIPMENT" },
  ];

  useEffect(() => {
    supabase.from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setImages(data && data.length > 0 ? [...localImages, ...data] : localImages);
    });
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const categories = ["ALL", "EQUIPMENT", "CLASSES", "TRANSFORMATIONS"];
  const filteredImages = filter === "ALL" ? images : images.filter(img => img.category === filter);

  return (
    <div className="section-pad min-h-[80vh] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-primary uppercase mb-4 block">
            Facility
          </span>
          <h1
            className="font-display mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Our <span className="text-primary italic">Facility</span>
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>

          {/* Filter buttons — scrollable on mobile */}
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-2 sm:gap-4 w-max mx-auto pb-1 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 sm:px-6 py-2.5 font-display tracking-widest uppercase transition-all text-sm whitespace-nowrap min-h-[44px] ${
                    filter === cat ? "bg-primary text-white" : "ghost-gold-btn"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 xs:columns-2 md:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <ZoomIn className="w-6 h-6 text-white" />
                  <span className="text-white font-display tracking-widest uppercase text-sm bg-primary px-3 py-1">
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono">
            No images in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center text-white hover:text-primary transition-colors bg-black/50"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightbox}
            alt="Enlarged"
            className="max-w-full max-h-[85vh] object-contain border border-border"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
