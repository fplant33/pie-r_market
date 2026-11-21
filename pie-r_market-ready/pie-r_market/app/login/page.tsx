"use client";
import {FormEvent,useState} from "react";
import Link from "next/link";
import {supabase} from "../../lib/supabase";
export default function Login(){const [email,setEmail]=useState("");const [message,setMessage]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 async function emailLogin(e:FormEvent){e.preventDefault();setBusy(true);setError("");setMessage("");const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:`${window.location.origin}/auth/callback`}});setBusy(false);if(error)setError(error.message);else setMessage("ส่งลิงก์เข้าสู่ระบบไปยังอีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย");}
 async function xLogin(){setBusy(true);setError("");const {error}=await supabase.auth.signInWithOAuth({provider:"twitter",options:{redirectTo:`${window.location.origin}/auth/callback`}});if(error){setBusy(false);setError(error.message);}}
 return <main className="login-shell"><div className="login-card"><Link href="/" className="back-link">← กลับหน้าร้าน</Link><p className="eyebrow">PIE-R MARKET</p><h1>เข้าสู่ระบบ</h1><p>เจ้าของร้านใช้บัญชีนี้เพื่อจัดการสินค้าและสต๊อก</p><button className="x-button" onClick={xLogin} disabled={busy}>𝕏 เข้าสู่ระบบด้วย X</button><div className="or-line"><span>หรือ</span></div><form onSubmit={emailLogin}><label>อีเมล<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><button className="primary-button full-button" disabled={busy}>{busy?"กำลังดำเนินการ...":"ส่งลิงก์เข้าสู่ระบบทางอีเมล"}</button></form>{message&&<p className="success-message">{message}</p>}{error&&<p className="error-message">{error}</p>}<p className="muted">เฉพาะอีเมลเจ้าของร้านที่กำหนดไว้เท่านั้นที่จะเข้าหน้าจัดการร้านได้</p></div></main>;
}
