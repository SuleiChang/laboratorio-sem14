// components/image-gallery.tsx

"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { ButtonDeleteImage } from "@/components/button-delete-image";

interface ImageItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <Image
            src={image.imageUrl}
            alt={image.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold mb-2">{image.name}</h3>
              <div className="flex space-x-2">
                <Link href={`/images/update/${image.id}`}>
                  <Button variant="outline" size="sm">
                    <FaEdit className="mr-2" /> Editar
                  </Button>
                </Link>
                <ButtonDeleteImage id={image.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}