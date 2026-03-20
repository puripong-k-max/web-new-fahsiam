// app/components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/data/productsdetail';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {product.badge && (
          <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${
            product.badge === 'ใหม่' ? 'bg-green-500 text-white' :
            product.badge === 'ฮิต' ? 'bg-red-500 text-white' :
            'bg-yellow-500 text-white'
          }`}>
            {product.badge}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-green-600">฿{product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">฿{product.oldPrice}</span>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">ประโยชน์หลัก:</p>
          <ul className="text-xs text-gray-700 space-y-1">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-1">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={`/products/${product.id}`}
          className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}
