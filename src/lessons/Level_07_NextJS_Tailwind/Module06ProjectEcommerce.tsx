import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "../../context/ProgressContext";
import { cn } from "@/lib/utils";

export default function Module06ProjectEcommerce() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { notifyChallengePassed, isLessonUnlocked } = useProgress();
  const unlocked = isLessonUnlocked(moduleId ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const CORRECT = "Through the params prop: { params: { id: string } }";

  return (
    <article className="max-w-3xl mx-auto space-y-14 font-sans">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Capstone Project — E-Commerce Product Page</h1>
        <p className="mt-3 text-muted-foreground text-base">
          You now know routing, data fetching, API routes, Tailwind, and deployment. This capstone brings them together: a real Next.js e-commerce store with a product listing, dynamic product pages, a shopping cart, and a deployed URL.
        </p>
      </section>

      {/* Project overview */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">What You Will Build</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground">Feature</th>
                <th className="text-left px-4 py-3 font-medium text-foreground">Concepts demonstrated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Product listing page", "Server Component, ISR data fetching, Tailwind grid"],
                ["Product detail pages", "Dynamic routes [id], generateStaticParams"],
                ["Shopping cart", "Client Component, useContext, localStorage persistence"],
                ["Category filter", "URL search params, Server Component filtering"],
                ["API routes", "GET /api/products, POST /api/cart"],
                ["Responsive design", "Tailwind md: lg: breakpoints throughout"],
                ["Vercel deploy", "next build, environment variables, custom domain"],
              ].map(([feature, concepts]) => (
                <tr key={feature} className="hover:bg-stone-50/50">
                  <td className="px-4 py-3 font-medium text-foreground">{feature}</td>
                  <td className="px-4 py-3 text-muted-foreground">{concepts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* File structure */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Project File Structure</h2>
        <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
          <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">ecommerce-store/</div>
          <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`src/
├── app/
│   ├── layout.tsx              ← Root layout + CartProvider
│   ├── page.tsx                ← Home / hero
│   ├── globals.css
│   ├── products/
│   │   ├── page.tsx            ← Product listing (Server Component)
│   │   └── [id]/
│   │       ├── page.tsx        ← Product detail (Server Component)
│   │       └── loading.tsx     ← Skeleton while fetching
│   ├── cart/
│   │   └── page.tsx            ← Cart page (Client Component)
│   └── api/
│       ├── products/
│       │   └── route.ts        ← GET /api/products
│       └── cart/
│           └── route.ts        ← POST /api/cart
├── components/
│   ├── Header.tsx              ← Sticky nav with cart badge
│   ├── ProductCard.tsx         ← Reusable card (Client — uses cart context)
│   └── CartProvider.tsx        ← Context + localStorage sync
├── lib/
│   └── products.ts             ← Shared fetch helpers
└── data/
    └── products.json           ← Static product catalogue`}</pre>
        </div>
      </section>

      {/* Key files */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Key Files Explained</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Product detail page — dynamic route + data fetch</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/products/[id]/page.tsx</div>
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

async function getProduct(id: string) {
  const res = await fetch(\`https://fakestoreapi.com/products/\${id}\`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) notFound();
  return res.json();
}

export async function generateStaticParams() {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(r => r.json());
  return products.map((p: { id: number }) => ({ id: String(p.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain rounded-2xl bg-stone-50 p-6"
      />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {product.category}
        </p>
        <h1 className="text-2xl font-bold leading-snug">{product.title}</h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          {product.description}
        </p>
        <p className="text-3xl font-bold text-blue-600">\${product.price}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Cart Context — client-side state + localStorage</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">components/CartProvider.tsx</div>
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type CartItem = { id: number; name: string; price: number; quantity: number };
type CartCtx = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};`}</pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">API route — GET /api/products</h3>
          <div className="rounded-xl bg-stone-900 text-stone-100 font-mono text-sm overflow-hidden">
            <div className="px-4 py-2 bg-stone-800 text-stone-400 text-xs">app/api/products/route.ts</div>
            <pre className="px-5 py-4 leading-relaxed text-stone-200 overflow-x-auto">{`import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/../data/products.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const filtered = category
    ? productsData.products.filter(p => p.category === category)
    : productsData.products;

  return NextResponse.json(filtered);
}`}</pre>
          </div>
        </div>
      </section>

      {/* Deployment checklist */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Deployment Checklist</h2>
        <div className="space-y-2">
          {[
            "npm run build passes with zero errors",
            "All required env vars added to Vercel dashboard",
            "Images use next/image for automatic optimization",
            "Each page has a <title> via the metadata export",
            "Cart persists correctly after a page reload",
            "Mobile layout tested at 375px, 768px, 1280px",
            "Live Vercel URL accessible and error-free",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 border border-border text-sm text-muted-foreground">
              <span className="w-4 h-4 rounded border border-border shrink-0 bg-white" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge check */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          In a Next.js product page at <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">app/products/[id]/page.tsx</code>, how do you access the product ID?
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Through the params prop: { params: { id: string } }",
            "With useRouter().query.id from 'next/router'",
            "Using window.location.pathname.split('/').pop()",
            "Through the searchParams prop",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setSelected(opt);
                if (opt === CORRECT) notifyChallengePassed(moduleId ?? "");
              }}
              className={cn(
                "text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all",
                selected === opt
                  ? opt === CORRECT
                    ? "border-green-400 bg-green-50 text-green-800"
                    : "border-red-300 bg-red-50 text-red-800"
                  : "border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected && selected !== CORRECT && (
          <p className="text-sm text-red-600">Not quite — the App Router passes URL segments via a <code className="bg-stone-100 px-1 rounded text-xs font-mono">params</code> prop, not via the router hook.</p>
        )}
        {selected === CORRECT && (
          <p className="text-sm text-green-700">Correct! App Router pages receive a <code className="bg-stone-100 px-1 rounded text-xs font-mono">params</code> prop containing the dynamic segment values. <code className="bg-stone-100 px-1 rounded text-xs font-mono">useRouter</code> from <code className="bg-stone-100 px-1 rounded text-xs font-mono">next/router</code> is the old Pages Router API.</p>
        )}
      </section>

      {/* Track complete */}
      <section className="px-6 py-8 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
        <p className="text-sm font-semibold text-blue-900">Track 07 Complete</p>
        <p className="text-sm text-blue-800 leading-relaxed">
          You have finished the Next.js &amp; Tailwind track. You can now build, style, and deploy full-stack React applications. The next track covers backend development and databases.
        </p>
      </section>

      {/* Gate */}
      <section>
        {unlocked ? (
          <div className="flex items-start gap-4 px-6 py-5 rounded-2xl bg-green-50 border border-green-200">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-green-800">Challenge passed</p>
              <p className="text-sm text-green-700 mt-0.5">Click <strong>Complete &amp; Next</strong> below to continue.</p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 rounded-2xl bg-stone-50 border border-border">
            <p className="text-sm font-sans text-muted-foreground">Complete the challenge above to unlock the next lesson.</p>
          </div>
        )}
      </section>

    </article>
  );
}
