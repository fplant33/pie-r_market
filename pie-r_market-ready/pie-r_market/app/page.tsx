"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Minus, MessageCircle, Store } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Product } from "../lib/types";

type CartLine = { product: Product; quantity: number };
const money = (n: number) => new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(n);
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => { (async () => { const { data, error } = await supabase.from("products").select("*").eq("active", true).order("created_at", { ascending: false }); if (error) setNotice("ยังเชื่อมต่อฐานข้อมูลสินค้าไม่ได้ กรุณาตั้งค่าตามคู่มือในไฟล์ก่อน"); else setProducts(data || []); setLoading(false); })(); }, []);
  const visible = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  const total = cart.reduce((s, x) => s + x.product.price * x.quantity, 0);
  function change(product: Product, delta: number) { setCart(old => { const found = old.find(x => x.product.id === product.id); const next = (found?.quantity || 0) + delta; if (next <= 0) return old.filter(x => x.product.id !== product.id); if (next > product.stock) return old; return found ? old.map(x => x.product.id === product.id ? { ...x, quantity: next } : x) : [...old, { product, quantity: 1 }]; }); }
  function orderLine() { const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || ""; const detail = ["สวัสดีค่ะ สนใจสั่งสินค้าจาก pie-r_market", ...cart.map(x => `• ${x.product.name} x ${x.quantity} = ${money(x.product.price * x.quantity)}`), `รวม ${money(total)}`, "รบกวนแจ้งวิธีชำระเงินด้วยค่ะ"].join("\n"); if (!lineUrl) { setNotice("กรุณาใส่ลิงก์ LINE Official Account ใน NEXT_PUBLIC_LINE_URL ก่อนใช้งาน"); return; } window.open(`${lineUrl}${lineUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent(detail)}`, "_blank", "noopener,noreferrer"); }
  return <main className="page-shell"><header className="topbar"><Link href="/" className="brand"><span className="brand-mark"><Store size={20}/></span><span>pie-r_market<small>SHOP • SIMPLE • HAPPY</small></span></Link><div className="top-actions"><a className="admin-link" href="/admin">สำหรับเจ้าของร้าน</a><span className="cart-pill"><ShoppingBag size={17}/> {count}</span></div></header>
    <section className="hero"><div><p className="eyebrow">WELCOME TO PIE-R MARKET</p><h1>เลือกของที่ชอบ<br/><em>แล้วทักมาสั่งได้เลย</em></h1><p className="hero-copy">เลือกสินค้าใส่ตะกร้า แล้วส่งรายการสั่งซื้อให้ร้านทาง LINE ได้ง่าย ๆ</p><a className="primary-button" href="#products">เลือกชมสินค้า <ShoppingBag size={17}/></a></div><div className="hero-art"><div className="hero-circle"><ShoppingBag size={72} strokeWidth={1.2}/><span>your little<br/>happy shop</span></div></div></section>
    <section id="products" className="products-section"><div className="section-heading"><div><p className="eyebrow">OUR COLLECTION</p><h2>สินค้าทั้งหมด</h2></div><input className="search-input" placeholder="ค้นหาสินค้า..." value={search} onChange={e => setSearch(e.target.value)}/></div>
    {notice && <p className="notice">{notice}</p>}{loading ? <p className="empty-state">กำลังโหลดสินค้า...</p> : visible.length === 0 ? <p className="empty-state">ยังไม่มีสินค้าในร้าน หรือไม่พบสินค้าที่ค้นหา</p> : <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}><div className="product-image">{p.image_url ? <img src={p.image_url} alt={p.name}/> : <div className="image-placeholder"><ShoppingBag size={34}/><span>pie-r_market</span></div>}</div><div className="product-info"><h3>{p.name}</h3><p className="product-desc">{p.description || ""}</p><div className="product-bottom"><strong>{money(p.price)}</strong><span className={p.stock > 0 ? "stock" : "out-stock"}>{p.stock > 0 ? `เหลือ ${p.stock} ชิ้น` : "สินค้าหมด"}</span></div><button className="add-button" disabled={p.stock <= 0} onClick={() => change(p, 1)}><Plus size={16}/> เพิ่มลงตะกร้า</button></div></article>)}</div>}</section>
    {cart.length > 0 && <aside className="cart-bar"><div className="cart-summary"><strong><ShoppingBag size={18}/> ตะกร้าของคุณ ({count} ชิ้น)</strong><span>ยอดรวม <b>{money(total)}</b></span></div><div className="cart-lines">{cart.map(x => <div className="cart-line" key={x.product.id}><span>{x.product.name}</span><div><button aria-label="ลดจำนวน" onClick={() => change(x.product, -1)}><Minus size={14}/></button><b>{x.quantity}</b><button aria-label="เพิ่มจำนวน" onClick={() => change(x.product, 1)} disabled={x.quantity >= x.product.stock}><Plus size={14}/></button></div></div>)}</div><button className="line-button" onClick={orderLine}><MessageCircle size={18}/> ส่งรายการสั่งซื้อทาง LINE</button><p className="cart-hint">ยังไม่ตัดสต๊อกจนกว่าร้านจะยืนยันคำสั่งซื้อ</p></aside>}
    <footer className="footer">© {new Date().getFullYear()} pie-r_market · ขอบคุณที่แวะมานะคะ</footer>
  </main>;
}
