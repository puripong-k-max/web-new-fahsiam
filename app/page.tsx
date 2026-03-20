import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import ErrorBoundary from "./components/ErrorBoundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://web-fahsiam.vercel.app";

export const metadata: Metadata = {
  title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
  description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร เหมาะสำหรับทุเรียน ยางพารา ข้าว มันสำปะหลัง และพืชไร่ทุกชนิด ลดต้นทุน เพิ่มผลผลิต",
  keywords: [
    "ปุ๋ยอินทรีย์",
    "ปุ๋ยอินทรีย์เคมี",
    "ฟ้าสยาม",
    "ปุ๋ยทุเรียน",
    "ปุ๋ยข้าว",
    "ปุ๋ยยางพารา",
    "ปุ๋ยมันสำปะหลัง",
    "ปุ๋ยอ้อย",
    "ปุ๋ยปาล์มน้ำมัน",
    "ปุ๋ยข้าวโพด",
    "SiamAgriTech",
    "เกษตรอินทรีย์",
  ],
  alternates: {
    canonical: BASE_URL,
    languages: {
      "th-TH": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: BASE_URL,
    siteName: "ฟ้าสยาม SiamAgriTech",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร ลดต้นทุน เพิ่มผลผลิตยั่งยืน",
    images: [
      {
        url: "/image/hero/Cover1.webp",
        width: 1200,
        height: 630,
        alt: "ปุ๋ยตราฟ้าสยาม | อินทรีย์–อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ฟ้าสยาม | ปุ๋ยอินทรีย์-อินทรีย์เคมี เพื่อผลผลิตยั่งยืน",
    description: "ปุ๋ยอินทรีย์และอินทรีย์เคมีคุณภาพสูง ผ่านการรับรองจากกรมวิชาการเกษตร ลดต้นทุน เพิ่มผลผลิตยั่งยืน",
    images: ["/image/hero/Cover1.webp"],
  },
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LandingPage() {
  return (
    <ErrorBoundary>
      <main>
        <Hero />
        
        {/* Quick Navigation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">บริการของเรา</h2>
              <p className="text-lg text-gray-600">สินค้าและบริการที่ตอบโจทย์เกษตรกรไทย</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ปฏิทินการดูแลพืช</h3>
                <p className="text-gray-600 mb-4">คำแนะนำการดูแลพืชรายเดือน</p>
                <a href="/calendar" className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  ดูปฏิทิน
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">สินค้าปุ๋ย</h3>
                <p className="text-gray-600 mb-4">ปุ๋ยคุณภาพสูงผ่านการรับรอง</p>
                <a href="/products" className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  ดูสินค้า
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">คู่มือพืช</h3>
                <p className="text-gray-600 mb-4">ข้อมูลการปลูกและดูแลพืช</p>
                <a href="/plants" className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  ดูพืชทั้งหมด
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">ต้องการคำปรึกษาหรือสั่งซื้อสินค้า?</h2>
            <p className="text-green-100 mb-8 text-lg">ทีมงานฟ้าสยามพร้อมให้คำแนะนำด้านสินค้าและการใช้งาน</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:082-529-8388"
                className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                📞 โทร: 082-529-8388
              </a>
              <a 
                href="/products"
                className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold"
              >
                🛒 ดูสินค้าทั้งหมด
              </a>
            </div>
          </div>
        </section>
        
        <SpeedInsights />
        <Analytics/>
      </main>
    </ErrorBoundary>
  );
}
