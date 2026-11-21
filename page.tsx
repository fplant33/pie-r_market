 "use client";
import {FormEvent,useState} from "react";
import Link from "next/link";
import {supabase} from "../../lib/supabase";
export default function Login(){
 const [email,setEmail]=useState(""); const [message,setMessage]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 async function emailLogin(e:FormEvent){e.preventDefault();setBusy(true);setError("");setMessage("");const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin}});setBusy(false);if(error)setError(error.message);else setMessage("ส่งลิงก์เข้าสู่ระบบไปยังอีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย");}
 async function xLogin(){setBusy(true);setError("");const {error}=await supabase.auth.signInWithOAuth({provider:"twitter",options:{redirectTo:window.location.origin}});if(error){setBusy(false);setError(error.message);}}
 return <main style={{maxWidth:430,margin:"70px auto",padding:28,background:"white",fontFamily:"Arial",border:"1px solid #eee"}}>
 <Link href="/">← กลับหน้าร้าน</Link><h1>pie-r_market</h1><h2>เข้าสู่ระบบ / สมัครสมาชิก</h2><p>เลือกเข้าสู่ระบบด้วย X หรืออีเมล</p>
 <button onClick={xLogin} disabled={busy} style={{width:"100%",padding:13,marginBottom:18}}>𝕏 เข้าสู่ระบบด้วย X</button>
 <form onSubmit={emailLogin}><label>อีเมล</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{display:"block",width:"95%",padding:12,margin:"8px 0 14px"}}/><button disabled={busy} style={{width:"100%",padding:13}}>ส่งลิงก์เข้าสู่ระบบทางอีเมล</button></form>
 {message&&<p style={{color:"green"}}>{message}</p>}{error&&<p style={{color:"crimson"}}>{error}</p>}
 <small>ผู้ใช้ทั่วไปสามารถซื้อสินค้าได้ ส่วนการจัดการสินค้าและออเดอร์สงวนไว้สำหรับเจ้าของร้าน</small></main>
}
