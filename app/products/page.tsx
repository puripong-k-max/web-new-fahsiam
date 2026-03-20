// app/products/page.tsx
import React from 'react';
import ProductCard from '@/app/components/ProductCard';
import { MOCK_PRODUCTS } from '@/app/data/productsdetail';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">สินค้าของเรา</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร 
            เหมาะสำหรับทุกพืชเศรษฐกิจ เพิ่มผลผลิตอย่างยั่งยืน
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              ทั้งหมด
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              ปุ๋ยอินทรีย์เคมี
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              ปุ๋ยอินทรีย์
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              น้ำหมักชีวภาพ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ต้องการคำแนะนำหรือสั่งซื้อสินค้า?</h2>
          <p className="text-gray-600 mb-6">
            ทีมงานฟ้าสยามพร้อมให้คำปรึกษาด้านสินค้าและการใช้งาน
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:082-529-8388"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📞 โทร: 082-529-8388
            </a>
            <a 
              href="#contact"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ✉️ ติดต่อเรา
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
